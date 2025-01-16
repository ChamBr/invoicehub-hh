import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export const ProductHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Package className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Produtos e Serviços</h1>
      </div>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto/Serviço
        </Button>
      </DialogTrigger>
    </div>
  );
};