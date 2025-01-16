import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceSettingsForm } from "./components/InvoiceSettingsForm";
import { InvoiceTemplatesTab } from "./components/InvoiceTemplatesTab";

const InvoiceSettings = () => {
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
          <InvoiceSettingsForm companyProfile={companyProfile} />
        </TabsContent>

        <TabsContent value="templates">
          <InvoiceTemplatesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoiceSettings;