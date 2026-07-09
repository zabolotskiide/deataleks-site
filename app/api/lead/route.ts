import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { NotificationService, type LeadPayload } from "@/lib/notifications/NotificationService";
import { calculateDetaleksClientPrice } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { searchAllSuppliers } from "@/lib/suppliers";

export const runtime = "nodejs";

const allowedExtensions = new Set(["jpg", "jpeg", "png", "webp", "pdf", "doc", "docx", "xls", "xlsx"]);
const maxFileSize = 20 * 1024 * 1024;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const rateLimitStore = new Map<string, number[]>();
const databaseRetryDelays = [400, 1200, 2400];

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9а-яА-ЯёЁ._-]/g, "_").slice(0, 120);
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (rateLimitStore.get(ip) || []).filter((time) => now - time < rateLimitWindowMs);

  if (recent.length >= rateLimitMax) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

function hasValidPhone(phone: string) {
  return phone.replace(/\D/g, "").length >= 10;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withDatabaseRetry<T>(operation: () => Promise<T>) {
  let lastError: unknown;

  for (let attempt = 0; attempt <= databaseRetryDelays.length; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const delay = databaseRetryDelays[attempt];
      if (typeof delay !== "number") break;
      await wait(delay);
    }
  }

  throw lastError;
}

async function readUpload(file: FormDataEntryValue | null) {
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > maxFileSize) throw new Error("Файл больше 20 MB");

  const originalName = safeFileName(file.name);
  const extension = originalName.split(".").pop()?.toLowerCase() || "";
  if (!allowedExtensions.has(extension)) throw new Error("Неподдерживаемый формат файла");

  return {
    fileName: originalName,
    fileMime: file.type || "application/octet-stream",
    fileSize: file.size,
    fileData: Buffer.from(await file.arrayBuffer()),
  };
}

async function saveSupplierQuotes(leadId: string, vin: string | undefined, requestText: string) {
  const supplierSearch = await searchAllSuppliers({
    vin,
    article: vin,
    partName: requestText,
  });

  const quotes = supplierSearch.results
    .filter((result) => typeof result.purchasePrice === "number" && result.purchasePrice > 0)
    .map((result) => {
      const calculated = calculateDetaleksClientPrice(result.purchasePrice || 0);

      return {
        supplier: result.supplier,
        article: result.article,
        brand: result.brand,
        name: result.name,
        purchasePrice: result.purchasePrice,
        markup: calculated.markup,
        clientPrice: calculated.clientPrice,
        deliveryTerm: result.deliveryTerm,
        quantity: result.quantity,
        warehouse: result.warehouse,
        raw: result.raw ? JSON.stringify(result.raw).slice(0, 4000) : undefined,
      };
    });

  if (!quotes.length) {
    return { quoteCount: 0, supplierErrors: supplierSearch.errors };
  }

  await withDatabaseRetry(() => prisma.supplierQuote.createMany({
    data: quotes.map((quote) => ({ ...quote, leadId })),
  }));

  const bestQuote = quotes.reduce(
    (best, current) => (current.clientPrice || Infinity) < (best.clientPrice || Infinity) ? current : best,
    quotes[0],
  );

  await withDatabaseRetry(() => prisma.lead.update({
    where: { id: leadId },
    data: { finalPrice: bestQuote.clientPrice, profit: bestQuote.markup },
  }));

  return { quoteCount: quotes.length, supplierErrors: supplierSearch.errors };
}

export async function POST(request: Request) {
  const requestId = randomUUID();

  try {
    const formData = await request.formData();

    if (clean(formData.get("website"))) {
      return NextResponse.json({ ok: true });
    }

    if (isRateLimited(clientIp(request))) {
      return NextResponse.json(
        { ok: false, message: "Слишком много заявок. Попробуйте позже." },
        { status: 429 },
      );
    }

    const requestText = clean(formData.get("requestText"));
    const payload: LeadPayload = {
      source: clean(formData.get("source")) || "Сайт",
      name: clean(formData.get("name")),
      phone: clean(formData.get("phone")),
      vin: clean(formData.get("vin")),
      partName: requestText,
      date: new Date().toLocaleString("ru-RU"),
    };

    if (!payload.phone || !hasValidPhone(payload.phone)) {
      return NextResponse.json(
        { ok: false, message: "Укажите корректный телефон." },
        { status: 400 },
      );
    }

    if (!payload.vin && !requestText) {
      return NextResponse.json(
        { ok: false, message: "Укажите VIN/frame/артикул или что нужно подобрать." },
        { status: 400 },
      );
    }

    let upload: Awaited<ReturnType<typeof readUpload>>;
    try {
      upload = await readUpload(formData.get("file"));
    } catch (error) {
      return NextResponse.json(
        { ok: false, message: error instanceof Error ? error.message : "Ошибка загрузки файла." },
        { status: 400 },
      );
    }

    let lead: { id: string } | null = null;
    let quoteCount = 0;

    try {
      lead = await withDatabaseRetry(() => prisma.lead.create({
        data: {
          name: payload.name,
          phone: payload.phone,
          vin: payload.vin,
          partName: requestText,
          comment: requestText,
          source: payload.source,
          status: "new",
          fileName: upload?.fileName,
          fileMime: upload?.fileMime,
          fileSize: upload?.fileSize,
          fileData: upload?.fileData,
        },
        select: { id: true },
      }));
    } catch (error) {
      console.error(`[lead:${requestId}] Failed to save lead`, error);
    }

    if (lead) {
      try {
        const supplierResult = await saveSupplierQuotes(lead.id, payload.vin, requestText);
        quoteCount = supplierResult.quoteCount;

        if (supplierResult.supplierErrors.length) {
          console.warn(`[lead:${lead.id}] Supplier search completed with errors`, supplierResult.supplierErrors);
        }
      } catch (error) {
        console.error(`[lead:${lead.id}] Failed to save supplier quotes`, error);
      }
    }

    payload.file = upload?.fileName;
    payload.fileName = upload?.fileName;
    payload.fileMime = upload?.fileMime;
    payload.fileData = upload?.fileData;

    const email = await NotificationService.sendLeadEmail(payload);

    return NextResponse.json({
      ok: true,
      message: "Спасибо! Заявка принята. Мы скоро свяжемся.",
      leadId: lead?.id || requestId,
      storage: lead ? "saved" : "unavailable",
      email: email.status,
      supplierQuotes: quoteCount,
    });
  } catch (error) {
    console.error(`[lead:${requestId}] Failed to process lead`, error);
    return NextResponse.json(
      { ok: false, message: "Не удалось отправить заявку. Повторите попытку позже.", requestId },
      { status: 500 },
    );
  }
}
