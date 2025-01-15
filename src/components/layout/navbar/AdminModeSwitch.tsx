import { useTranslation } from 'react-i18next';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AdminModeSwitch = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
        return null;
      }

      return data;
    },
  });

  const handleAdminToggle = async (checked: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: t('common.errors.auth'),
        });
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ role: checked ? "admin" : "user" })
        .eq("id", user.id);

      if (error) {
        console.error("Erro ao atualizar perfil:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: t('common.errors.update'),
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: t('common.admin.mode'),
        description: checked ? t('common.admin.enabled') : t('common.admin.disabled'),
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: t('common.errors.unexpected'),
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={profile?.role === "admin"}
        onCheckedChange={handleAdminToggle}
        disabled={isLoading}
        aria-label={t('common.admin.mode')}
      />
      <span className="text-xs text-gray-500">
        {t('common.admin.mode')}
      </span>
    </div>
  );
};

export default AdminModeSwitch;