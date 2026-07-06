import type { SupplierAdapter, SupplierName } from "./types";

export function createDocumentationStub(name: SupplierName): SupplierAdapter {
  return {
    name,
    async search() {
      // TODO: подключить реальный метод поставщика после предоставления официальной документации:
      // endpoint, схема авторизации, формат запроса и формат ответа. Сейчас нельзя выдумывать API, цены и остатки.
      return [];
    },
  };
}