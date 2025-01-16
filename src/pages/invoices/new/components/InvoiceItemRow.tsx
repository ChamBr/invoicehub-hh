import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { InvoiceItem } from "../types";

interface InvoiceItemRowProps {
  item: InvoiceItem;
  index: number;
  isCustomItem: boolean;
  products: any[];
  onUpdate: (index: number, item: InvoiceItem) => void;
  onRemove: (index: number) => void;
}

export const InvoiceItemRow = ({
  item,
  index,
  isCustomItem,
  products,
  onUpdate,
  onRemove,
}: InvoiceItemRowProps) => {
  const handleProductSelect = (productId: string) => {
    const product = products?.find((p) => p.id === productId);
    if (product) {
      onUpdate(index, {
        ...item,
        productId,
        description: product.name,
        price: product.price,
        total: product.price * item.quantity,
      });
    }
  };

  return (
    <div className="flex gap-4 items-start">
      <div className="flex-1 space-y-4">
        {isCustomItem ? (
          <Input
            placeholder="Descrição do item"
            value={item.description}
            onChange={(e) =>
              onUpdate(index, {
                ...item,
                description: e.target.value,
              })
            }
          />
        ) : (
          <Select
            value={item.productId || undefined}
            onValueChange={handleProductSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um produto" />
            </SelectTrigger>
            <SelectContent>
              {products?.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex gap-4">
          <div className="w-32">
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                onUpdate(index, {
                  ...item,
                  quantity: parseInt(e.target.value),
                  total: parseInt(e.target.value) * item.price,
                })
              }
            />
          </div>
          <div className="w-32">
            <Input
              type="number"
              min="0"
              step="0.01"
              value={item.price}
              onChange={(e) =>
                onUpdate(index, {
                  ...item,
                  price: parseFloat(e.target.value),
                  total: item.quantity * parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={item.hasTax}
              onCheckedChange={(checked) =>
                onUpdate(index, { ...item, hasTax: checked })
              }
              id={`tax-${index}`}
            />
            <Label htmlFor={`tax-${index}`}>Imposto</Label>
          </div>
        </div>
      </div>

      <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};