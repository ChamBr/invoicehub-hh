import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { InvoiceNumberingForm } from "@/components/invoice-settings/InvoiceNumberingForm";
import { InvoiceCurrencyForm } from "@/components/invoice-settings/InvoiceCurrencyForm";
import { InvoiceTermsForm } from "@/components/invoice-settings/InvoiceTermsForm";
import { InvoiceTemplateList } from "@/components/invoice-settings/InvoiceTemplateList";
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InvoiceSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: companyProfile, isLoading } = useQuery({
    queryKey: ["company-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error(t('common.errors.auth'));

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
      if (!user) throw new Error(t('common.errors.auth'));

      const invoiceData = {
        invoice_prefix: String(formData.get('invoice_prefix')),
        invoice_next_number: Number(formData.get('invoice_next_number')),
        invoice_footer: String(formData.get('invoice_footer')),
        invoice_terms: String(formData.get('invoice_terms')),
        invoice_due_days: Number(formData.get('invoice_due_days')),
        invoice_currency: String(formData.get('invoice_currency')),
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
        title: t('invoice_settings.success'),
        description: t('invoice_settings.success'),
      });
    },
    onError: (error) => {
      toast({
        title: t('invoice_settings.error'),
        description: t('common.errors.unexpected'),
        variant: "destructive",
      });
      console.error("Error updating invoice settings:", error);
    },
  });

  if (isLoading) {
    return <div className="p-8">{t('common.loading')}</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">{t('invoice_settings.tabs.general')}</TabsTrigger>
          <TabsTrigger value="templates">{t('invoice_settings.tabs.templates')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            updateInvoiceSettings.mutate(formData);
          }} className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-2xl font-bold">{t('invoice_settings.title')}</h2>

            <InvoiceNumberingForm
              defaultPrefix={companyProfile?.invoice_prefix}
              defaultNextNumber={companyProfile?.invoice_next_number}
            />

            <InvoiceCurrencyForm
              defaultCurrency={companyProfile?.invoice_currency}
              defaultDueDays={companyProfile?.invoice_due_days}
            />

            <InvoiceTermsForm
              defaultTerms={companyProfile?.invoice_terms}
              defaultFooter={companyProfile?.invoice_footer}
            />

            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={updateInvoiceSettings.isPending}
            >
              {updateInvoiceSettings.isPending 
                ? t('invoice_settings.saving')
                : t('invoice_settings.save')}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="templates">
          <div className="bg-white rounded-lg shadow p-6">
            <InvoiceTemplateList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoiceSettings;