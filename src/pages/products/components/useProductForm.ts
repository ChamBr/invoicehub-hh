import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Product, ProductFormData } from "./types";

export const useProductForm = (
  product: Product | null | undefined,
  onSuccess: () => void
) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    type: product?.type || "product",
    price: product?.price?.toString() || "",
    sku: product?.sku || "",
    stock: product?.stock?.toString() || "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("products").insert([
        {
          name: formData.name,
          description: formData.description,
          type: formData.type,
          price: parseFloat(formData.price),
          sku: formData.sku,
          stock: formData.type === "product" ? parseInt(formData.stock) : 0,
          status: "active",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Produto/Serviço criado",
        description: "O produto/serviço foi criado com sucesso.",
      });
      
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar produto/serviço",
        description: "Ocorreu um erro ao criar o produto/serviço.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    isLoading,
    handleSubmit,
  };
};