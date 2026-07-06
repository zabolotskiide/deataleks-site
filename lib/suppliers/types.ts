export type SupplierName = "ROSSKO" | "PartKom" | "Forum Auto" | "TruckMotors";

export type SupplierSearchRequest = {
  vin?: string;
  article?: string;
  car?: string;
  partName?: string;
};

export type SupplierSearchResult = {
  supplier: SupplierName;
  article?: string;
  brand?: string;
  name?: string;
  purchasePrice?: number;
  deliveryTerm?: string;
  quantity?: string;
  warehouse?: string;
  raw?: unknown;
};

export type SupplierAdapter = {
  name: SupplierName;
  search: (request: SupplierSearchRequest) => Promise<SupplierSearchResult[]>;
};