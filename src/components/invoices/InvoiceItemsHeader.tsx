import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface InvoiceItemsHeaderProps {
  isCustomItem: boolean;
  onCustomItemChange: (value: boolean) => void;
  onAddItem: () => void;
}

export const InvoiceItemsHeader = ({
  isCustomItem,
  onCustomItemChange,
  onAddItem,
}: InvoiceItemsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Itens da Fatura</h3>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={isCustomItem}
            onCheckedChange={onCustomItemChange}
            id="custom-item"
          />
          <Label htmlFor="custom-item">Item personalizado</Label>
        </div>
        <Button onClick={onAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Item
        </Button>
      </div>
    </div>
  );
};