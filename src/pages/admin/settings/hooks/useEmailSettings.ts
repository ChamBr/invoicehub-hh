import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface EmailSettings {
  id: string;
  sender_name: string;
  sender_email: string;
}

export const useEmailSettings = () => {
  return useQuery({
    queryKey: ['emailSettings'],
    queryFn: async () => {
      const { data: existingSettings, error: fetchError } = await supabase
        .from('email_settings')
        .select('*')
        .maybeSingle();

      if (fetchError) {
        console.error('Erro ao carregar configurações:', fetchError);
        throw fetchError;
      }

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
};