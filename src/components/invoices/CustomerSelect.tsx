import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CustomerSelectProps {
  value: string | null;
  onSelect: (customerId: string) => void;
  onNewCustomer: () => void;
}

const CustomerSelect = ({ value, onSelect, onNewCustomer }: CustomerSelectProps) => {
  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("status", "active")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>Cliente</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={onNewCustomer}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>
      <Select value={value || undefined} onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um cliente" />
        </SelectTrigger>
        <SelectContent>
          {customers?.map((customer) => (
            <SelectItem key={customer.id} value={customer.id}>
              {customer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomerSelect;