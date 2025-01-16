import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductHeader } from "./components/ProductHeader";
import { DeleteProductAlert } from "./components/DeleteProductAlert";
import { useProducts } from "./hooks/useProducts";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ProductsIndex = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const { products } = useProducts();

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productToDelete.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir produto",
        description: error.message,
      });
    } else {
      toast({
        title: "Produto excluído com sucesso",
      });
    }

    setProductToDelete(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ProductHeader />
        <DialogContent className="sm:max-w-[500px]">
          <ProductForm
            product={selectedProduct}
            onSuccess={handleSuccess}
            onCancel={() => {
              setIsDialogOpen(false);
              setSelectedProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-lg shadow">
        <ProductList
          products={products}
          isLoading={false}
          onEdit={handleEdit}
          onDelete={setProductToDelete}
        />
      </div>

      <DeleteProductAlert
        isOpen={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProductsIndex;
