import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { CustomerDetails } from "@/components/customers/CustomerDetails";
import { CustomerHeader } from "@/components/customers/CustomerHeader";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { DeleteCustomerDialog } from "@/components/customers/DeleteCustomerDialog";
import { CustomerFormValues } from "@/components/customers/types";

const CustomersIndex = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerFormValues | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<CustomerFormValues | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: customers, error } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (customerId: string) => {
    try {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", customerId);

      if (error) throw error;

      toast({
        title: "Cliente excluído com sucesso",
        description: "O cliente foi removido do sistema",
      });

      queryClient.invalidateQueries({ queryKey: ["customers"] });
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir cliente",
        description: "Ocorreu um erro ao tentar excluir o cliente",
      });
    } finally {
      setCustomerToDelete(null);
    }
  };

  const handleDeleteClick = (customer: CustomerFormValues, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomerToDelete(customer);
  };

  const handleRowClick = (customer: CustomerFormValues) => {
    setSelectedCustomer(customer);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setSelectedCustomer(null);
    setIsEditing(false);
    queryClient.invalidateQueries({ queryKey: ["customers"] });
  };

  if (error) {
    toast({
      variant: "destructive",
      title: "Erro ao carregar clientes",
      description: error.message,
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <CustomerHeader />
        <CustomerTable
          customers={customers || []}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
        />
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCustomer
                ? isEditing
                  ? "Editar Cliente"
                  : "Detalhes do Cliente"
                : "Novo Cliente"}
            </DialogTitle>
          </DialogHeader>
          {selectedCustomer && !isEditing ? (
            <CustomerDetails
              customer={selectedCustomer}
              onEdit={() => setIsEditing(true)}
            />
          ) : (
            <CustomerForm
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setIsDialogOpen(false);
                setSelectedCustomer(null);
                setIsEditing(false);
              }}
              initialData={selectedCustomer}
            />
          )}
        </DialogContent>
      </Dialog>

      <DeleteCustomerDialog
        customer={customerToDelete}
        onOpenChange={(open) => !open && setCustomerToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default CustomersIndex;