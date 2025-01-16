import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NewProductDialog } from "./NewProductDialog";
import { InvoiceItem } from "./types";
import { InvoiceItemsHeader } from "./InvoiceItemsHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductSelect } from "./InvoiceItems/ProductSelect";
import { CustomItemInputs } from "./InvoiceItems/CustomItemInputs";
import { ItemsList } from "./InvoiceItems/ItemsList";

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onAdd: (item: InvoiceItem) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, item: InvoiceItem) => void;
  readOnly?: boolean;
}

const InvoiceItems = ({ items, onAdd, onRemove, onUpdate, readOnly = false }: InvoiceItemsProps) => {
  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [isCustomItem, setIsCustomItem] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [customItem, setCustomItem] = useState({
    description: "",
    price: 0,
  });

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
    if (isCustomItem) {
      onAdd({
        id: crypto.randomUUID(),
        productId: null,
        description: customItem.description,
        quantity: 1,
        price: customItem.price,
        hasTax: false,
        total: customItem.price,
      });
      setCustomItem({ description: "", price: 0 });
    } else if (selectedProduct && products) {
      const product = products.find(p => p.id === selectedProduct);
      if (product) {
        onAdd({
          id: crypto.randomUUID(),
          productId: product.id,
          description: product.name,
          quantity: 1,
          price: Number(product.price),
          hasTax: false,
          total: Number(product.price),
        });
        setSelectedProduct(null);
      }
    }
  };

  if (readOnly) {
    return <ItemsList items={items} onUpdate={onUpdate} onRemove={onRemove} readOnly />;
  }

  return (
    <div className="space-y-4">
      <InvoiceItemsHeader
        isCustomItem={isCustomItem}
        onCustomItemChange={setIsCustomItem}
      />

      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          {isCustomItem ? (
            <CustomItemInputs
              description={customItem.description}
              price={customItem.price}
              onDescriptionChange={(value) => setCustomItem(prev => ({ ...prev, description: value }))}
              onPriceChange={(value) => setCustomItem(prev => ({ ...prev, price: value }))}
            />
          ) : (
            <div className="flex-1">
              <ProductSelect
                value={selectedProduct}
                onChange={setSelectedProduct}
                products={products || []}
              />
            </div>
          )}
          <Button 
            onClick={handleAddItem}
            disabled={isCustomItem ? !customItem.description || customItem.price <= 0 : !selectedProduct}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </div>

        <ItemsList items={items} onUpdate={onUpdate} onRemove={onRemove} />
      </div>

      <NewProductDialog
        open={isNewProductDialogOpen}
        onOpenChange={setIsNewProductDialogOpen}
      />
    </div>
  );
};

export default InvoiceItems;