import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductTypeField } from "./form/ProductTypeField";
import { ProductBasicFields } from "./form/ProductBasicFields";
import { ProductPricingFields } from "./form/ProductPricingFields";
import { ProductStockField } from "./form/ProductStockField";
import { ProductFormActions } from "./form/ProductFormActions";

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  type: z.string(),
  price: z.number().min(0, "Preço deve ser maior ou igual a zero"),
  sku: z.string().optional(),
  stock: z.number().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProductForm = ({ onSuccess, onCancel }: ProductFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "product",
      price: 0,
      sku: "",
      stock: 0,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const { error } = await supabase.from("products").insert({
        name: data.name,
        description: data.description,
        type: data.type,
        price: data.price,
        sku: data.sku || null,
        stock: data.stock || 0,
        status: "active"
      });
      
      if (error) throw error;

      toast({
        title: t('common.success'),
        description: t('products.messages.created'),
      });
      
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: t('common.errors.unexpected'),
        description: t('products.messages.error.create'),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProductTypeField form={form} />
        <ProductBasicFields form={form} />
        <ProductPricingFields form={form} />
        <ProductStockField form={form} show={form.watch("type") === "product"} />
        <ProductFormActions onCancel={onCancel} isLoading={form.formState.isSubmitting} />
      </form>
    </Form>
  );
};