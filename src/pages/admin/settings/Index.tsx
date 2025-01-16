import { Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailSettingsForm } from "./components/EmailSettingsForm";
import { GeneralSettingsForm } from "./components/GeneralSettingsForm";
import { FooterSettingsForm } from "./components/FooterSettingsForm";
import { useEmailSettings } from "./hooks/useEmailSettings";

const AdminSettings = () => {
  const { data: emailSettings, isLoading } = useEmailSettings();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings className="h-6 w-6" />
        Configurações do Sistema
      </h1>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Configurações de Email</TabsTrigger>
          <TabsTrigger value="general">Configurações Gerais</TabsTrigger>
          <TabsTrigger value="footer">Configurações do Rodapé</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <EmailSettingsForm emailSettings={emailSettings!} />
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <GeneralSettingsForm />
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <Card>
            <FooterSettingsForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;