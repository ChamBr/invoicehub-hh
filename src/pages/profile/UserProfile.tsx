import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileForm } from "./components/ProfileForm";
import type { ProfileFormData } from "./schema";
import { Card, CardContent } from "@/components/ui/card";

const UserProfile = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return { ...data, user };
    },
  });

  const handleSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      const birthDate = data.birth_month && data.birth_year 
        ? new Date(parseInt(data.birth_year), parseInt(data.birth_month)).toISOString()
        : null;

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.full_name,
          phone: data.phone,
          birth_date: birthDate,
          gender: data.gender,
          country: data.country,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao atualizar suas informações.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .update({ avatar_url: url })
      .eq("id", user.id);
  };

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <ProfileHeader
              avatarUrl={profile?.avatar_url}
              fullName={profile?.full_name}
              onAvatarUpdate={handleAvatarUpdate}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <ProfileForm
              initialData={{
                full_name: profile?.full_name || "",
                phone: profile?.phone || "",
                birth_month: profile?.birth_date ? new Date(profile.birth_date).getMonth().toString() : "",
                birth_year: profile?.birth_date ? new Date(profile.birth_date).getFullYear().toString() : "",
                gender: profile?.gender as "masculino" | "feminino" | undefined,
                country: profile?.country || "BR",
              }}
              userEmail={profile?.user?.email}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;