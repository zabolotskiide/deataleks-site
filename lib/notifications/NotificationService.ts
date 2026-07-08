import nodemailer from "nodemailer";
import { requisites, siteContacts } from "../site";

export type LeadQuotePayload = {
  supplier: string;
  article?: string | null;
  brand?: string | null;
  name?: string | null;
  purchasePrice?: number | null;
  markup?: number | null;
  clientPrice?: number | null;
  deliveryTerm?: string | null;
  quantity?: string | null;
  warehouse?: string | null;
};

export type LeadPayload = {
  name?: string;
  phone?: string;
  vin?: string;
  partName?: string;
  file?: string;
  fileName?: string;
  fileMime?: string;
  fileData?: Uint8Array;
  source?: string;
  date?: string;
  quotes?: LeadQuotePayload[];
  supplierErrors?: Array<{ supplier: string; error: string }>;
};

type NotificationResult = {
  channel: "telegram" | "max" | "email";
  status: "sent" | "skipped" | "failed";
};

function money(value?: number | null) {
  if (typeof value !== "number") return "-";
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);
}

function formatQuotes(quotes?: LeadQuotePayload[]) {
  if (!quotes?.length) {
    return "Предварительная проценка:\nНет результатов. TODO: подключить реальные методы API поставщиков после предоставления документации.";
  }

  return [
    "Предварительная проценка:",
    ...quotes.map((quote) => [
      `Поставщик: ${quote.supplier}`,
      `Артикул: ${quote.article || "-"}`,
      `Бренд: ${quote.brand || "-"}`,
      `Название: ${quote.name || "-"}`,
      `Закупочная цена: ${money(quote.purchasePrice)}`,
      `Наценка: ${money(quote.markup)}`,
      `Цена клиента: ${money(quote.clientPrice)}`,
      `Срок: ${quote.deliveryTerm || "-"}`,
      `Количество: ${quote.quantity || "-"}`,
      `Склад: ${quote.warehouse || "-"}`,
    ].join("\n")),
  ].join("\n\n");
}

function formatSupplierErrors(errors?: Array<{ supplier: string; error: string }>) {
  if (!errors?.length) return "";
  return ["", "Ошибки поставщиков:", ...errors.map((item) => `${item.supplier}: ${item.error}`)].join("\n");
}

function formatLead(payload: LeadPayload) {
  return [
    "Новая заявка ДЕТАЛЕКС",
    "",
    `Имя: ${payload.name || "-"}`,
    `Телефон: ${payload.phone || "-"}`,
    `VIN / Frame / Артикул: ${payload.vin || "-"}`,
    `Что нужно подобрать: ${payload.partName || "-"}`,
    `Файл: ${payload.file || "-"}`,
    `Источник: ${payload.source || "-"}`,
    `Дата: ${payload.date || new Date().toLocaleString("ru-RU")}`,
    "",
    formatQuotes(payload.quotes),
    formatSupplierErrors(payload.supplierErrors),
    "",
    "Реквизиты владельца проекта:",
    requisites.ipName,
    `ИНН: ${requisites.inn}`,
    `ОГРНИП: ${requisites.ogrnip}`,
  ].join("\n");
}

async function sendTelegram(payload: LeadPayload): Promise<NotificationResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { channel: "telegram", status: "skipped" };

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: formatLead(payload) }),
  });
  return { channel: "telegram", status: response.ok ? "sent" : "failed" };
}

async function sendMax(payload: LeadPayload): Promise<NotificationResult> {
  const token = process.env.MAX_BOT_TOKEN;
  const chatId = process.env.MAX_CHAT_ID;
  const apiUrl = process.env.MAX_API_URL;
  if (!token || !chatId || !apiUrl) return { channel: "max", status: "skipped" };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: formatLead(payload) }),
  });
  return { channel: "max", status: response.ok ? "sent" : "failed" };
}

async function sendEmail(payload: LeadPayload): Promise<NotificationResult> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const emailTo = process.env.EMAIL_TO || siteContacts.email;
  const port = Number(process.env.SMTP_PORT || 465);
  if (!host || !user || !pass || !emailTo) return { channel: "email", status: "skipped" };

  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  await transporter.sendMail({
    from: `ДЕТАЛЕКС <${user}>`,
    to: emailTo,
    subject: "Новая заявка ДЕТАЛЕКС",
    text: formatLead(payload),
    attachments: payload.fileData && payload.fileName
      ? [{
          filename: payload.fileName,
          content: Buffer.from(payload.fileData),
          contentType: payload.fileMime,
        }]
      : undefined,
  });
  return { channel: "email", status: "sent" };
}

export const NotificationService = {
  async sendLead(payload: LeadPayload) {
    const channels = [
      { channel: "telegram" as const, task: sendTelegram(payload) },
      { channel: "max" as const, task: sendMax(payload) },
      { channel: "email" as const, task: sendEmail(payload) },
    ];
    const results = await Promise.allSettled(channels.map((item) => item.task));
    return results.map((result, index): NotificationResult => result.status === "fulfilled" ? result.value : { channel: channels[index].channel, status: "failed" });
  },
};
