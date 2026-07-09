import { XMLParser } from "fast-xml-parser";
import type { SupplierAdapter, SupplierSearchRequest, SupplierSearchResult } from "./types";

const endpoint = "https://api.rossko.ru/service/v2.1/GetSearch";

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
  parseTagValue: false,
  trimValues: true,
});

function configured() {
  return Boolean(process.env.ROSSKO_KEY1 && process.env.ROSSKO_KEY2 && process.env.ROSSKO_DELIVERY_ID);
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function soapEnvelope(searchText: string) {
  const addressId = process.env.ROSSKO_ADDRESS_ID;

  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="http://api.rossko.ru/">
  <soapenv:Header/>
  <soapenv:Body>
    <api:GetSearch>
      <api:KEY1>${escapeXml(process.env.ROSSKO_KEY1 || "")}</api:KEY1>
      <api:KEY2>${escapeXml(process.env.ROSSKO_KEY2 || "")}</api:KEY2>
      <api:text>${escapeXml(searchText)}</api:text>
      <api:delivery_id>${escapeXml(process.env.ROSSKO_DELIVERY_ID || "")}</api:delivery_id>
      ${addressId ? `<api:address_id>${escapeXml(addressId)}</api:address_id>` : ""}
    </api:GetSearch>
  </soapenv:Body>
</soapenv:Envelope>`;
}

function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (Array.isArray(value)) return value;
  return value == null ? [] : [value];
}

function firstString(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }

  return undefined;
}

function firstNumber(source: Record<string, unknown>, keys: string[]) {
  const value = firstString(source, keys);
  if (!value) return undefined;
  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function findObjectsByKey(value: unknown, keyName: string): Record<string, unknown>[] {
  if (!value || typeof value !== "object") return [];

  const current = value as Record<string, unknown>;
  const found: Record<string, unknown>[] = [];

  for (const [key, nested] of Object.entries(current)) {
    if (key.toLowerCase() === keyName.toLowerCase()) {
      found.push(...asArray(nested).filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object" && !Array.isArray(item))));
      continue;
    }

    found.push(...findObjectsByKey(nested, keyName));
  }

  return found;
}

function extractStockOffers(part: Record<string, unknown>, base: Omit<SupplierSearchResult, "purchasePrice" | "deliveryTerm" | "quantity" | "warehouse">) {
  const stockObjects = [
    ...findObjectsByKey(part, "stock"),
    ...findObjectsByKey(part, "stocks"),
  ];

  if (!stockObjects.length) {
    const purchasePrice = firstNumber(part, ["price", "cost", "price_order", "price_client", "price_base"]);
    return purchasePrice ? [{ ...base, purchasePrice, raw: part }] : [];
  }

  return stockObjects
    .map((stock) => {
      const purchasePrice = firstNumber(stock, ["price", "cost", "price_order", "price_client", "price_base"]);
      if (!purchasePrice) return null;

      const offer: SupplierSearchResult = {
        ...base,
        purchasePrice,
        deliveryTerm: firstString(stock, ["delivery", "delivery_time", "deliveryTerm", "days"]),
        quantity: firstString(stock, ["count", "quantity", "qty", "amount"]),
        warehouse: firstString(stock, ["warehouse", "stock", "city", "store"]),
        raw: { part, stock },
      };

      return offer;
    })
    .filter((item): item is SupplierSearchResult => item !== null);
}

function normalizeResponse(xml: string): SupplierSearchResult[] {
  const parsed = parser.parse(xml);
  const parts = findObjectsByKey(parsed, "part");

  return parts.flatMap((part) => {
    const base = {
      supplier: "ROSSKO" as const,
      article: firstString(part, ["partnumber", "article", "number", "code", "guid"]),
      brand: firstString(part, ["brand", "brand_name", "producer"]),
      name: firstString(part, ["name", "description", "caption"]),
    };

    return extractStockOffers(part, base);
  });
}

export const adapter: SupplierAdapter = {
  name: "ROSSKO",
  async search(request: SupplierSearchRequest) {
    if (!configured()) return [];

    const searchText = request.article || request.vin || request.partName;
    if (!searchText) return [];

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: "GetSearch",
      },
      body: soapEnvelope(searchText),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`ROSSKO request failed with status ${response.status}`);
    }

    return normalizeResponse(text);
  },
};
