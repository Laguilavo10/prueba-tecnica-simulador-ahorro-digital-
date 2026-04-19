export type ProductType = "digital" | "tradicional" | "programado";

export interface SavingsProduct {
  id: string;
  name: string;
  type: ProductType;
  annualRate: number;
  minAmount: number;
  currency: "COP";
  description: string;
}

export interface ProductFilters {
  name?: string;
  type?: string;
}
