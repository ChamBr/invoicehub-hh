import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface FooterSettings {
  id: string;
  left_text: string;
  center_text: string;
  right_text: string;
  font_size: string;
  text_color: string;
  text_alpha: number;
  container_height: string;
  show_refresh_button: boolean;
  refresh_button_size: string;
  refresh_button_color: string;
}

export const useFooterSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["footer-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("footer_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data as FooterSettings;
    },
  });

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (settings: Partial<FooterSettings>) => {
      const { error } = await supabase
        .from("footer_settings")
        .update(settings)
        .eq("id", data?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer-settings"] });
      toast({
        title: "Sucesso",
        description: "Configurações do rodapé atualizadas com sucesso",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao atualizar as configurações do rodapé",
      });
    },
  });

  return {
    data,
    isLoading,
    updateSettings,
  };
};