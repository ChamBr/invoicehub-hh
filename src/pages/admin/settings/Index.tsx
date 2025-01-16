import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const AdminSettings = () => {
  const { toast } = useToast();
  const [emailSettings, setEmailSettings] = useState({
    senderName: "Faturamento",
    senderEmail: "faturas@alisson.ai"
  });

  const handleSaveEmailSettings = async () => {
    try {
      // Aqui implementaremos a lógica para salvar as configurações
      toast({
        title: "Configurações salvas",
        description: "As configurações de email foram atualizadas com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive"
      });
    }
  };

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
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configurações de Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senderName">Nome do Remetente</Label>
                <Input
                  id="senderName"
                  value={emailSettings.senderName}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, senderName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderEmail">Email do Remetente</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  value={emailSettings.senderEmail}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, senderEmail: e.target.value }))}
                />
              </div>
              <Button onClick={handleSaveEmailSettings}>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              Configurações gerais do sistema
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;