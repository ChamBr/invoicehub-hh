import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NewProductDialog } from "./NewProductDialog";
import { InvoiceItem } from "./types";
import { InvoiceItemsHeader } from "./InvoiceItemsHeader";
import { InvoiceItemRow } from "./InvoiceItemRow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onAdd: (item: InvoiceItem) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, item: InvoiceItem) => void;
}

const InvoiceItems = ({ items, onAdd, onRemove, onUpdate }: InvoiceItemsProps) => {
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

  return (
    <div className="space-y-4">
      <InvoiceItemsHeader
        isCustomItem={isCustomItem}
        onCustomItemChange={setIsCustomItem}
      />

      <div className="space-y-4">
        {/* Seleção de Item */}
        <div className="flex gap-4 items-end">
          {isCustomItem ? (
            <>
              <div className="flex-1">
                <Input
                  placeholder="Descrição do item"
                  value={customItem.description}
                  onChange={(e) => setCustomItem(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  placeholder="Preço"
                  value={customItem.price}
                  onChange={(e) => setCustomItem(prev => ({ ...prev, price: Number(e.target.value) }))}
                />
              </div>
            </>
          ) : (
            <div className="flex-1">
              <Select
                value={selectedProduct || ""}
                onValueChange={setSelectedProduct}
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

        {/* Lista de Itens */}
        <div className="space-y-2">
          {items.map((item, index) => (
            <InvoiceItemRow
              key={index}
              item={item}
              index={index}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>

      <NewProductDialog
        open={isNewProductDialogOpen}
        onOpenChange={setIsNewProductDialogOpen}
      />
    </div>
  );
};

export default InvoiceItems;