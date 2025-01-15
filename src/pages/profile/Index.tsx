import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const ProfileIndex = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
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

  const { data: companyProfile, isLoading: isLoadingCompany } = useQuery({
    queryKey: ["company-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
  });

  const updateCompanyProfile = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      let logoUrl = companyProfile?.logo_url;

      // Upload logo if provided
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const filePath = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from('company-logos')
          .upload(filePath, logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('company-logos')
          .getPublicUrl(filePath);

        logoUrl = publicUrl;
      }

      const companyData = {
        user_id: user.id,
        company_name: formData.get('company_name'),
        address_line1: formData.get('address_line1'),
        address_line2: formData.get('address_line2'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip_code: formData.get('zip_code'),
        country: formData.get('country'),
        phone: formData.get('phone'),
        mobile: formData.get('mobile'),
        display_phone: formData.get('display_phone') === 'true',
        tax_id: formData.get('tax_id'),
        display_tax_id: formData.get('display_tax_id') === 'true',
        email: formData.get('email'),
        website: formData.get('website'),
        logo_url: logoUrl,
        display_logo: formData.get('display_logo') === 'true',
      };

      const { error } = await supabase
        .from('company_profiles')
        .upsert(companyData);

      if (error) throw error;
      return companyData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-profile"] });
      toast({
        title: "Perfil atualizado",
        description: "Os dados da empresa foram atualizados com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar os dados da empresa.",
        variant: "destructive",
      });
      console.error("Erro ao atualizar perfil:", error);
    },
  });

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateCompanyProfile.mutate(formData);
  };

  if (isLoadingProfile || isLoadingCompany) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Perfil do Usuário */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Perfil do Usuário</h2>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200">
              {profile?.avatar_url && (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{profile?.full_name}</h3>
              <p className="text-gray-600">{profile?.company}</p>
            </div>
          </div>
        </div>

        {/* Perfil da Empresa */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-2xl font-bold">Dados da Empresa</h2>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label htmlFor="logo">Logo da Empresa</Label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {(logoPreview || companyProfile?.logo_url) && (
                  <img
                    src={logoPreview || companyProfile?.logo_url}
                    alt="Logo Preview"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                <div className="flex items-center gap-2">
                  <Switch
                    id="display_logo"
                    name="display_logo"
                    defaultChecked={companyProfile?.display_logo}
                  />
                  <Label htmlFor="display_logo">Exibir logo na invoice</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Nome da Empresa</Label>
              <Input
                id="company_name"
                name="company_name"
                defaultValue={companyProfile?.company_name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax_id">Tax ID</Label>
              <div className="space-y-2">
                <Input
                  id="tax_id"
                  name="tax_id"
                  defaultValue={companyProfile?.tax_id}
                />
                <div className="flex items-center gap-2">
                  <Switch
                    id="display_tax_id"
                    name="display_tax_id"
                    defaultChecked={companyProfile?.display_tax_id}
                  />
                  <Label htmlFor="display_tax_id">Exibir Tax ID na invoice</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Endereço</h3>
            <div className="space-y-2">
              <Label htmlFor="address_line1">Endereço Linha 1</Label>
              <Input
                id="address_line1"
                name="address_line1"
                defaultValue={companyProfile?.address_line1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address_line2">Endereço Linha 2</Label>
              <Input
                id="address_line2"
                name="address_line2"
                defaultValue={companyProfile?.address_line2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={companyProfile?.city}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  name="state"
                  defaultValue={companyProfile?.state}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip_code">CEP</Label>
                <Input
                  id="zip_code"
                  name="zip_code"
                  defaultValue={companyProfile?.zip_code}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Input
                id="country"
                name="country"
                defaultValue={companyProfile?.country || "USA"}
              />
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={companyProfile?.phone}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Celular</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  defaultValue={companyProfile?.mobile}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="display_phone"
                name="display_phone"
                defaultChecked={companyProfile?.display_phone}
              />
              <Label htmlFor="display_phone">
                Exibir telefone/celular na invoice
              </Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={companyProfile?.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  defaultValue={companyProfile?.website}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={updateCompanyProfile.isPending}
          >
            {updateCompanyProfile.isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileIndex;