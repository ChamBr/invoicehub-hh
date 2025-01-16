import { Button } from "@/components/ui/button";
import { Users, UserPlus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

export function CustomerHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Clientes</h1>
      </div>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </DialogTrigger>
    </div>
  );
}