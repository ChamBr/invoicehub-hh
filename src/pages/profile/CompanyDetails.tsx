import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { CountrySelect } from "@/components/ui/country-select";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";

const CompanyDetails = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

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

      if (error) throw error;
      return data;
    },
  });

  const updateCompanyProfile = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      let logoUrl = companyProfile?.logo_url;

      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const filePath = `${user.id}-${Date.now()}.${fileExt}`;

        if (companyProfile?.logo_url) {
          const oldPath = companyProfile.logo_url.split('/').pop();
          if (oldPath) {
            await supabase.storage
              .from('company-logos')
              .remove([oldPath]);
          }
        }

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
        company_name: formData.get('company_name')?.toString(),
        address_line1: formData.get('address_line1')?.toString(),
        address_line2: formData.get('address_line2')?.toString(),
        city: formData.get('city')?.toString(),
        state: formData.get('state')?.toString(),
        zip_code: formData.get('zip_code')?.toString(),
        country: formData.get('country')?.toString(),
        phone: formData.get('phone')?.toString(),
        mobile: formData.get('mobile')?.toString(),
        display_phone: formData.get('display_phone') === 'true',
        tax_id: formData.get('tax_id')?.toString(),
        display_tax_id: formData.get('display_tax_id') === 'true',
        email: formData.get('email')?.toString(),
        website: formData.get('website')?.toString(),
        logo_url: logoUrl,
        display_logo: formData.get('display_logo') === 'true',
      };

      const { error } = await supabase
        .from('company_profiles')
        .upsert(companyData, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      return companyData;
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

  const handleAddressSelect = (address: any) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('address_line1', address.line1);
      formData.set('address_line2', address.line2 || '');
      formData.set('city', address.city);
      formData.set('state', address.state);
      formData.set('zip_code', address.postalCode);
      formData.set('country', address.country);
      updateCompanyProfile.mutate(formData);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        updateCompanyProfile.mutate(formData);
      }} className="bg-white rounded-lg shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold">Informações da Empresa</h2>

        <div className="space-y-4">
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
                  <Label htmlFor="display_logo">Exibir logo na fatura</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <CountrySelect
              value={companyProfile?.country || 'BR'}
              onValueChange={(value) => {
                const form = document.querySelector('form');
                if (form) {
                  const formData = new FormData(form);
                  formData.set('country', value);
                  updateCompanyProfile.mutate(formData);
                }
              }}
            />
          </div>
        </div>

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
            <Label htmlFor="tax_id">CNPJ/CPF</Label>
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
                <Label htmlFor="display_tax_id">Exibir CNPJ/CPF na fatura</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Endereço</h3>
          <AddressAutocomplete onAddressSelect={handleAddressSelect} />
          <div className="space-y-2">
            <Label htmlFor="address_line2">Complemento (Opcional)</Label>
            <Input
              id="address_line2"
              name="address_line2"
              defaultValue={companyProfile?.address_line2}
              placeholder="Apartamento, sala, etc."
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
        </div>

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
              Exibir telefone/celular na fatura
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
  );
};

export default CompanyDetails;