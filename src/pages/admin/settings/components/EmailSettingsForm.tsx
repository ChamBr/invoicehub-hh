import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmailSettings {
  id: string;
  sender_name: string;
  sender_email: string;
}

interface EmailSettingsFormProps {
  emailSettings: EmailSettings;
}

export const EmailSettingsForm = ({ emailSettings }: EmailSettingsFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      senderName: emailSettings.sender_name,
      senderEmail: emailSettings.sender_email
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: { senderName: string; senderEmail: string }) => {
      console.log('Tentando salvar:', values);
      
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

  return (
    <>
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
    </>
  );
};