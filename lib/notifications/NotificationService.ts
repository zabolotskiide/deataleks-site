import nodemailer from "nodemailer";
import { requisites } from "../site";

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
};

export type EmailNotificationResult = {
  channel: "email";
  status: "sent" | "skipped" | "failed";
};

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
    "Реквизиты владельца проекта:",
    requisites.ipName,
    `ИНН: ${requisites.inn}`,
    `ОГРНИП: ${requisites.ogrnip}`,
  ].join("\n");
}

function smtpSecure() {
  const value = process.env.SMTP_SECURE;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return Number(process.env.SMTP_PORT || 465) === 465;
}

async function sendEmail(payload: LeadPayload): Promise<EmailNotificationResult> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_EMAIL;
  const from = process.env.SMTP_FROM || user;
  const port = Number(process.env.SMTP_PORT || 465);

  if (!host || !user || !pass || !to || !from) {
    console.warn("[lead-email] SMTP is not configured. Lead email skipped.");
    return { channel: "email", status: "skipped" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: smtpSecure(),
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
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
  async sendLeadEmail(payload: LeadPayload): Promise<EmailNotificationResult> {
    try {
      return await sendEmail(payload);
    } catch (error) {
      console.error("[lead-email] Failed to send lead email", error);
      return { channel: "email", status: "failed" };
    }
  },
};
