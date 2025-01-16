import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useProductForm } from "./useProductForm";
import type { ProductFormProps } from "./types";

const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const { formData, setFormData, isLoading, handleSubmit } = useProductForm(
    product,
    onSuccess
  );

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