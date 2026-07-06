import { adapter as forumAuto } from "./forum-auto";
import { adapter as partkom } from "./partkom";
import { adapter as rossko } from "./rossko";
import { adapter as truckMotors } from "./truckmotors";
import type { SupplierSearchRequest, SupplierSearchResult } from "./types";

const adapters = [rossko, partkom, forumAuto, truckMotors];
const supplierTimeoutMs = 6500;

function withTimeout<T>(promise: Promise<T>, supplier: string) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${supplier} request timed out after ${supplierTimeoutMs}ms`)), supplierTimeoutMs);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

export async function searchAllSuppliers(request: SupplierSearchRequest) {
  const settled = await Promise.allSettled(adapters.map((adapter) => withTimeout(adapter.search(request), adapter.name)));
  const results: SupplierSearchResult[] = [];
  const errors: Array<{ supplier: string; error: string }> = [];

  settled.forEach((result, index) => {
    const supplier = adapters[index].name;
    if (result.status === "fulfilled") {
      results.push(...result.value);
      return;
    }

    errors.push({ supplier, error: result.reason instanceof Error ? result.reason.message : "Supplier request failed" });
  });

  return { results, errors };
}

export type { SupplierSearchRequest, SupplierSearchResult } from "./types";