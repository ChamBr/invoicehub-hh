export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  has_tax: boolean | null;
  product_id: string | null;
}