import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useCompanyProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: companyProfile, isLoading } = useQuery({
    queryKey: ["company-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar perfil da empresa:", error);
        throw error;
      }

      // Garantir que os valores booleanos sejam convertidos corretamente
      if (data) {
        data.display_logo = Boolean(data.display_logo);
        data.display_tax_id = Boolean(data.display_tax_id);
        data.display_phone = Boolean(data.display_phone);
      }

      console.log("Perfil da empresa carregado:", data);
      return data;
    },
  });

  const updateCompanyProfile = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const companyData = {
        user_id: user.id,
        company_name: formData.get('company_name')?.toString() || '',
        address_line1: formData.get('address_line1')?.toString() || '',
        address_line2: formData.get('address_line2')?.toString() || '',
        city: formData.get('city')?.toString() || '',
        state: formData.get('state')?.toString() || '',
        zip_code: formData.get('zip_code')?.toString() || '',
        country: formData.get('country')?.toString() || 'BR',
        phone: formData.get('phone')?.toString() || '',
        mobile: formData.get('mobile')?.toString() || '',
        display_phone: formData.get('display_phone') === 'true',
        tax_id: formData.get('tax_id')?.toString() || '',
        display_tax_id: formData.get('display_tax_id') === 'true',
        email: formData.get('email')?.toString() || '',
        website: formData.get('website')?.toString() || '',
        logo_url: formData.get('logo_url')?.toString() || companyProfile?.logo_url,
        display_logo: formData.get('display_logo') === 'true',
      };

      console.log("Dados a serem salvos:", companyData);

      const { data, error } = await supabase
        .from('company_profiles')
        .upsert(companyData, {
          onConflict: 'user_id'
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error("Erro ao atualizar perfil:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-profile"] });
      toast({
        title: "Perfil atualizado",
        description: "As informações da empresa foram atualizadas com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar as informações da empresa.",
        variant: "destructive",
      });
    },
  });

  return {
    companyProfile,
    isLoading,
    updateCompanyProfile,
  };
};