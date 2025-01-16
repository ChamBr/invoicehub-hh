import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  onUpdate,
  onRemove,
}: InvoiceItemRowProps) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (item.quantity === 0) {
      timer = setTimeout(() => {
        onRemove(index);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [item.quantity, index, onRemove]);

  return (
    <div className="flex gap-4 items-start">
      <div className="flex-1 space-y-4">
        <div className="text-sm font-medium">
          {item.description}
          <div className="text-muted-foreground text-xs">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.price)}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-32">
            <Input
              type="number"
              min="0"
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
  );
};