import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { NewProductDialog } from "./NewProductDialog";
import { InvoiceItem } from "../types";

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onAdd: (item: InvoiceItem) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, item: InvoiceItem) => void;
}

const InvoiceItems = ({ items, onAdd, onRemove, onUpdate }: InvoiceItemsProps) => {
  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [isCustomItem, setIsCustomItem] = useState(false);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const handleAddItem = () => {
    onAdd({
      productId: null,
      description: "",
      quantity: 1,
      price: 0,
      hasTax: false,
      total: 0,
    });
  };

  const handleProductSelect = (index: number, productId: string) => {
    const product = products?.find((p) => p.id === productId);
    if (product) {
      onUpdate(index, {
        ...items[index],
        productId,
        description: product.name,
        price: product.price,
        total: product.price * items[index].quantity,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Itens da Fatura</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={isCustomItem}
              onCheckedChange={setIsCustomItem}
              id="custom-item"
            />
            <Label htmlFor="custom-item">Item personalizado</Label>
          </div>
          <Button onClick={handleAddItem}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
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
                  onValueChange={(value) => handleProductSelect(index, value)}
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
                        total:
                          item.quantity * parseFloat(e.target.value),
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

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <NewProductDialog
        open={isNewProductDialogOpen}
        onOpenChange={setIsNewProductDialogOpen}
      />
    </div>
  );
};

export default InvoiceItems;