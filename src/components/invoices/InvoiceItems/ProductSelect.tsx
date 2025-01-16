import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductSelectProps {
  value: string | null;
  onChange: (value: string) => void;
  products: Array<{ id: string; name: string; price: number; }>;
}

export const ProductSelect = ({ value, onChange, products }: ProductSelectProps) => {
  return (
    <Select
      value={value || ""}
      onValueChange={onChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione um produto" />
      </SelectTrigger>
      <SelectContent>
        {products?.map((product) => (
          <SelectItem key={product.id} value={product.id}>
            {product.name} - {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};