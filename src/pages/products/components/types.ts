export interface Product {
  id?: string;
  name: string;
  description: string;
  type: string;
  price: string | number;
  sku: string;
  stock: string | number;
}

export interface ProductFormData {
  name: string;
  description: string;
  type: string;
  price: string;
  sku: string;
  stock: string;
}

export interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}