import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const InvoiceSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: companyProfile, isLoading } = useQuery({
    queryKey: ["company-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const updateInvoiceSettings = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const invoiceData = {
        invoice_prefix: formData.get('invoice_prefix'),
        invoice_next_number: Number(formData.get('invoice_next_number')),
        invoice_footer: formData.get('invoice_footer'),
        invoice_terms: formData.get('invoice_terms'),
        invoice_due_days: Number(formData.get('invoice_due_days')),
        invoice_currency: formData.get('invoice_currency'),
      };

      const { error } = await supabase
        .from('company_profiles')
        .update(invoiceData)
        .eq('user_id', user.id);

      if (error) throw error;
      return invoiceData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-profile"] });
      toast({
        title: "Configurações atualizadas",
        description: "As configurações de fatura foram atualizadas com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar as configurações de fatura.",
        variant: "destructive",
      });
      console.error("Error updating invoice settings:", error);
    },
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        updateInvoiceSettings.mutate(formData);
      }} className="bg-white rounded-lg shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold">Configurações de Fatura</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoice_prefix">Prefixo da Fatura</Label>
            <Input
              id="invoice_prefix"
              name="invoice_prefix"
              defaultValue={companyProfile?.invoice_prefix}
              placeholder="Ex: INV"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoice_next_number">Próximo Número</Label>
            <Input
              id="invoice_next_number"
              name="invoice_next_number"
              type="number"
              defaultValue={companyProfile?.invoice_next_number}
              min="1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice_currency">Moeda</Label>
          <Input
            id="invoice_currency"
            name="invoice_currency"
            defaultValue={companyProfile?.invoice_currency || 'USD'}
            placeholder="USD"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice_due_days">Prazo de Pagamento (dias)</Label>
          <Input
            id="invoice_due_days"
            name="invoice_due_days"
            type="number"
            defaultValue={companyProfile?.invoice_due_days}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice_terms">Termos e Condições</Label>
          <Textarea
            id="invoice_terms"
            name="invoice_terms"
            defaultValue={companyProfile?.invoice_terms}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice_footer">Rodapé da Fatura</Label>
          <Textarea
            id="invoice_footer"
            name="invoice_footer"
            defaultValue={companyProfile?.invoice_footer}
            rows={3}
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={updateInvoiceSettings.isPending}
        >
          {updateInvoiceSettings.isPending ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </form>
    </div>
  );
};

export default InvoiceSettings;