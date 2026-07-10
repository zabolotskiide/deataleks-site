import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { calculateDetaleksClientPrice } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const maxJsonSize = 1024 * 1024;

type PartkomOfferInput = {
  article?: unknown;
  brand?: unknown;
  name?: unknown;
  purchasePrice?: unknown;
  price?: unknown;
  deliveryTerm?: unknown;
  quantity?: unknown;
  warehouse?: unknown;
};

type PartkomWebhookInput = {
  leadId?: unknown;
  name?: unknown;
  phone?: unknown;
  vin?: unknown;
  article?: unknown;
  requestText?: unknown;
  comment?: unknown;
  offers?: unknown;
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET() {
  return json({
    ok: true,
    supplier: "PartKom",
    endpoint: "/api/supplier/partkom",
    method: "POST",
    authorization: "Bearer token required",
    configured: Boolean(process.env.PARTKOM_WEBHOOK_TOKEN?.trim()),
  });
}

function clean(value: unknown, limit = 1000) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function toPositiveNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value !== "string") return null;

  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization") || "";
  if (authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }

  return request.headers.get("x-partkom-token")?.trim() || "";
}

function hasValidToken(request: Request) {
  const expected = process.env.PARTKOM_WEBHOOK_TOKEN?.trim();
  const received = getBearerToken(request);

  if (!expected || !received) return false;

  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);

  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}

function parseOffers(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((offer): PartkomOfferInput => (typeof offer === "object" && offer !== null ? offer : {}))
    .map((offer) => {
      const purchasePrice = toPositiveNumber(offer.purchasePrice) ?? toPositiveNumber(offer.price);
      if (!purchasePrice) return null;

      const calculated = calculateDetaleksClientPrice(purchasePrice);

      return {
        supplier: "PartKom",
        article: clean(offer.article, 120) || undefined,
        brand: clean(offer.brand, 120) || undefined,
        name: clean(offer.name, 500) || undefined,
        purchasePrice,
        markup: calculated.markup,
        clientPrice: calculated.clientPrice,
        deliveryTerm: clean(offer.deliveryTerm, 120) || undefined,
        quantity: clean(offer.quantity, 120) || undefined,
        warehouse: clean(offer.warehouse, 200) || undefined,
        raw: JSON.stringify(offer).slice(0, 4000),
      };
    })
    .filter((offer): offer is NonNullable<typeof offer> => Boolean(offer));
}

async function resolveLead(payload: PartkomWebhookInput) {
  const leadId = clean(payload.leadId, 80);
  const rawPayload = JSON.stringify(payload).slice(0, 4000);

  if (leadId) {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { id: true },
    });

    if (!lead) {
      return null;
    }

    await prisma.leadNote.create({
      data: {
        leadId: lead.id,
        text: `PartKom webhook payload: ${rawPayload}`,
      },
    });

    return lead;
  }

  return prisma.lead.create({
    data: {
      source: "PartKom webhook",
      name: clean(payload.name, 200) || undefined,
      phone: clean(payload.phone, 80) || undefined,
      vin: clean(payload.vin, 200) || clean(payload.article, 200) || undefined,
      partName: clean(payload.requestText, 1000) || clean(payload.comment, 1000) || undefined,
      comment: `PartKom webhook payload: ${rawPayload}`,
      status: "new",
    },
    select: { id: true },
  });
}

export async function POST(request: Request) {
  try {
    if (!process.env.PARTKOM_WEBHOOK_TOKEN?.trim()) {
      console.error("[partkom-webhook] PARTKOM_WEBHOOK_TOKEN is not configured");
      return json({ ok: false, message: "Webhook is not configured" }, 503);
    }

    if (!hasValidToken(request)) {
      return json({ ok: false, message: "Unauthorized" }, 401);
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > maxJsonSize) {
      return json({ ok: false, message: "Payload is too large" }, 413);
    }

    const payload = await request.json() as PartkomWebhookInput;
    const lead = await resolveLead(payload);

    if (!lead) {
      return json({ ok: false, message: "Lead not found" }, 404);
    }

    const offers = parseOffers(payload.offers);

    if (offers.length) {
      await prisma.supplierQuote.createMany({
        data: offers.map((offer) => ({ ...offer, leadId: lead.id })),
      });

      const bestOffer = offers.reduce(
        (best, current) => (current.clientPrice < best.clientPrice ? current : best),
        offers[0],
      );

      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          finalPrice: bestOffer.clientPrice,
          profit: bestOffer.markup,
        },
      });
    }

    return json({
      ok: true,
      leadId: lead.id,
      savedOffers: offers.length,
    });
  } catch (error) {
    console.error("[partkom-webhook] Failed to process webhook", error);
    return json({ ok: false, message: "Failed to process webhook" }, 500);
  }
}
