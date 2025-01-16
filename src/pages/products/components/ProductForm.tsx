import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id?: string;
  name: string;
  description: string;
  type: string;
  price: string | number;
  sku: string;
  stock: string | number;
}

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      setFormData({
        name: "",
        description: "",
        type: "product",
        price: "",
        sku: "",
        stock: "0",
      });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <RadioGroup
          value={formData.type}
          onValueChange={(value) =>
            setFormData({ ...formData, type: value })
          }
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="product" id="product" />
            <Label htmlFor="product">Produto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="service" id="service" />
            <Label htmlFor="service">Serviço</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Preço</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sku">SKU</Label>
        <Input
          id="sku"
          value={formData.sku}
          onChange={(e) =>
            setFormData({ ...formData, sku: e.target.value })
          }
        />
      </div>

      {formData.type === "product" && (
        <div className="space-y-2">
          <Label htmlFor="stock">Estoque</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;