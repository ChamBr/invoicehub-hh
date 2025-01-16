import { useState } from "react";
import { Package, Plus } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

const ProductsIndex = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Produtos e Serviços</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Produto/Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Novo Produto/Serviço</DialogTitle>
            </DialogHeader>
            <ProductForm
              onSuccess={handleSuccess}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <ProductList products={products} isLoading={false} />
      </div>
    </div>
  );
};

export default ProductsIndex;