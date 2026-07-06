import type { SupplierAdapter, SupplierName } from "./types";

export function createDocumentationStub(name: SupplierName): SupplierAdapter {
  return {
    name,
    async search() {
      // TODO: подключить реальный метод поставщика после предоставления официальной документации,
      // endpoint, схемы авторизации и формата ответа. Сейчас нельзя выдумывать API/цены/остатки.
      return [];
    },
  };
}