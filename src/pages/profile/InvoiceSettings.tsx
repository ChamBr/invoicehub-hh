import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettingsForm } from "@/components/invoice-settings/GeneralSettingsForm";
import { InvoiceTemplateList } from "@/components/invoice-settings/InvoiceTemplateList";

const InvoiceSettings = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Configurações Gerais</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettingsForm />
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