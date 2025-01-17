import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useActiveTemplate = () => {
  return useQuery({
    queryKey: ["active-template"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data: profile } = await supabase
        .from("company_profiles")
        .select(`
          active_template_id,
          invoice_templates (
            id,
            name,
            description
          )
        `)
        .eq("user_id", user.id)
        .maybeSingle();

      if (!profile?.active_template_id) return null;

      return {
        id: profile.active_template_id,
        ...profile.invoice_templates
      };
    },
  });
};