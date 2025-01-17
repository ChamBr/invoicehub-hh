export interface Product {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  type: string;
  price: number;
  status: string | null;
  sku: string | null;
  stock: number | null;
}