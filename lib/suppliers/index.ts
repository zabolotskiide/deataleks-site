import { adapter as forumAuto } from "./forum-auto";
import { adapter as partkom } from "./partkom";
import { adapter as rossko } from "./rossko";
import { adapter as truckMotors } from "./truckmotors";
import type { SupplierSearchRequest, SupplierSearchResult } from "./types";

const adapters = [rossko, partkom, forumAuto, truckMotors];

export async function searchAllSuppliers(request: SupplierSearchRequest) {
  const settled = await Promise.allSettled(adapters.map((adapter) => adapter.search(request)));
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