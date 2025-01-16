import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NewProductDialog } from "./NewProductDialog";
import { InvoiceItem } from "../types";
import { InvoiceItemsHeader } from "./InvoiceItemsHeader";
import { InvoiceItemRow } from "./InvoiceItemRow";

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

  return (
    <div className="space-y-4">
      <InvoiceItemsHeader
        isCustomItem={isCustomItem}
        onCustomItemChange={setIsCustomItem}
        onAddItem={handleAddItem}
      />

      <div className="space-y-4">
        {items.map((item, index) => (
          <InvoiceItemRow
            key={index}
            item={item}
            index={index}
            isCustomItem={isCustomItem}
            products={products || []}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
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