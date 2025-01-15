import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProfileIndex = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Perfil</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 mr-4">
              {profile?.avatar_url && (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profile?.full_name}</h2>
              <p className="text-gray-600">{profile?.company}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Informações</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">Cargo: </span>
                  {profile?.role}
                </p>
                <p>
                  <span className="text-gray-600">Empresa: </span>
                  {profile?.company}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Preferências</h3>
              <div className="space-y-2">
                {profile?.preferences &&
                  Object.entries(profile.preferences).map(([key, value]) => (
                    <p key={key}>
                      <span className="text-gray-600">{key}: </span>
                      {String(value)}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIndex;