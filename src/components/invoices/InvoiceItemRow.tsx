import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { InvoiceItem } from "./types";

interface InvoiceItemRowProps {
  item: InvoiceItem;
  index: number;
  onUpdate: (index: number, item: InvoiceItem) => void;
  onRemove: (index: number) => void;
  readOnly?: boolean;
}

export const InvoiceItemRow = ({
  item,
  index,
  onUpdate,
  onRemove,
  readOnly = false,
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
    <div className="flex items-center gap-4 p-2 bg-white rounded-lg border">
      <div className="flex-1 flex items-center gap-4">
        <div className="flex-1">
          <span className="font-medium">{item.description}</span>
          <span className="text-sm text-muted-foreground ml-2">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.price)}
          </span>
        </div>

        <div className="w-24">
          {readOnly ? (
            <span className="text-sm">{item.quantity}</span>
          ) : (
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
          )}
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={item.hasTax}
            onCheckedChange={(checked) =>
              onUpdate(index, { ...item, hasTax: checked })
            }
            id={`tax-${index}`}
            disabled={readOnly}
          />
          <Label htmlFor={`tax-${index}`}>Imposto</Label>
        </div>

        {!readOnly && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </div>
    </div>
  );
};