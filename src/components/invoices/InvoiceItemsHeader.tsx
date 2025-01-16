import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface InvoiceItemsHeaderProps {
  isCustomItem: boolean;
  onCustomItemChange: (value: boolean) => void;
}

export const InvoiceItemsHeader = ({
  isCustomItem,
  onCustomItemChange,
}: InvoiceItemsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Itens da Fatura</h3>
      <div className="flex items-center gap-2">
        <Switch
          checked={isCustomItem}
          onCheckedChange={onCustomItemChange}
          id="custom-item"
        />
        <Label htmlFor="custom-item">Item personalizado</Label>
      </div>
    </div>
  );
};