import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface EmailSettings {
  id: string;
  sender_name: string;
  sender_email: string;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: emailSettings, isLoading } = useQuery({
    queryKey: ['emailSettings'],
    queryFn: async () => {
      // Primeiro, tenta buscar as configurações existentes
      const { data: existingSettings, error: fetchError } = await supabase
        .from('email_settings')
        .select('*')
        .maybeSingle();

      if (fetchError) {
        console.error('Erro ao carregar configurações:', fetchError);
        throw fetchError;
      }

      // Se não existir configurações, cria um registro padrão
      if (!existingSettings) {
        const { data: newSettings, error: createError } = await supabase
          .from('email_settings')
          .insert([{
            sender_name: 'Faturamento',
            sender_email: 'faturas@alisson.ai'
          }])
          .select()
          .single();

        if (createError) {
          console.error('Erro ao criar configurações padrão:', createError);
          throw createError;
        }

        console.log('Configurações padrão criadas:', newSettings);
        return newSettings as EmailSettings;
      }

      console.log('Configurações carregadas:', existingSettings);
      return existingSettings as EmailSettings;
    }
  });

  const form = useForm({
    defaultValues: {
      senderName: "",
      senderEmail: ""
    }
  });

  useEffect(() => {
    if (emailSettings) {
      console.log('Atualizando formulário com:', emailSettings);
      form.reset({
        senderName: emailSettings.sender_name,
        senderEmail: emailSettings.sender_email
      });
    }
  }, [emailSettings, form]);

  const mutation = useMutation({
    mutationFn: async (values: { senderName: string; senderEmail: string }) => {
      console.log('Tentando salvar:', values);
      
      if (!emailSettings?.id) {
        throw new Error('ID das configurações não encontrado');
      }

      const { error } = await supabase
        .from('email_settings')
        .update({
          sender_name: values.senderName,
          sender_email: values.senderEmail
        })
        .eq('id', emailSettings.id);

      if (error) {
        console.error('Erro ao salvar:', error);
        throw error;
      }

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailSettings'] });
      toast({
        title: "Configurações salvas",
        description: "As configurações de email foram atualizadas com sucesso."
      });
    },
    onError: (error) => {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (values: { senderName: string; senderEmail: string }) => {
    console.log('Submetendo formulário:', values);
    mutation.mutate(values);
  };

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
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configurações de Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="senderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Remetente</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="senderEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email do Remetente</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Salvando..." : "Salvar Configurações"}
                  </Button>
                </form>
              </Form>
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
