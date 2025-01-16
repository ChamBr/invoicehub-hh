import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { LogoUpload } from "@/components/company/LogoUpload";
import { CompanyBasicInfo } from "@/components/company/CompanyBasicInfo";
import { CompanyAddress } from "@/components/company/CompanyAddress";
import { CompanyContact } from "@/components/company/CompanyContact";

const CompanyDetails = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<File | null>(null);

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
        company_name: formData.get('company_name')?.toString() || '',
        address_line1: formData.get('address_line1')?.toString() || '',
        address_line2: formData.get('address_line2')?.toString() || '',
        city: formData.get('city')?.toString() || '',
        state: formData.get('state')?.toString() || '',
        zip_code: formData.get('zip_code')?.toString() || '',
        country: formData.get('country')?.toString() || '',
        phone: formData.get('phone')?.toString() || '',
        mobile: formData.get('mobile')?.toString() || '',
        display_phone: formData.get('display_phone') === 'true',
        tax_id: formData.get('tax_id')?.toString() || '',
        display_tax_id: formData.get('display_tax_id') === 'true',
        email: formData.get('email')?.toString() || '',
        website: formData.get('website')?.toString() || '',
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

  const handleAddressSelect = (address: any) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('address_line1', address.line1 || '');
      formData.set('address_line2', address.line2 || '');
      formData.set('city', address.city || '');
      formData.set('state', address.state || '');
      formData.set('zip_code', address.postalCode || '');
      formData.set('country', address.country || '');
      updateCompanyProfile.mutate(formData);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        updateCompanyProfile.mutate(formData);
      }} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Informações da Empresa</h2>

          <LogoUpload
            logoUrl={companyProfile?.logo_url}
            onLogoChange={setLogoFile}
            displayLogo={companyProfile?.display_logo}
            onDisplayLogoChange={(checked) => {
              const form = document.querySelector('form');
              if (form) {
                const formData = new FormData(form);
                formData.set('display_logo', checked.toString());
                updateCompanyProfile.mutate(formData);
              }
            }}
          />

          <CompanyBasicInfo
            companyName={companyProfile?.company_name}
            taxId={companyProfile?.tax_id}
            displayTaxId={companyProfile?.display_tax_id}
            country={companyProfile?.country}
            onCountryChange={(value) => {
              const form = document.querySelector('form');
              if (form) {
                const formData = new FormData(form);
                formData.set('country', value);
                updateCompanyProfile.mutate(formData);
              }
            }}
            onDisplayTaxIdChange={(checked) => {
              const form = document.querySelector('form');
              if (form) {
                const formData = new FormData(form);
                formData.set('display_tax_id', checked.toString());
                updateCompanyProfile.mutate(formData);
              }
            }}
          />

          <CompanyAddress
            addressLine2={companyProfile?.address_line2}
            city={companyProfile?.city}
            state={companyProfile?.state}
            zipCode={companyProfile?.zip_code}
            onAddressSelect={handleAddressSelect}
          />

          <CompanyContact
            phone={companyProfile?.phone}
            mobile={companyProfile?.mobile}
            email={companyProfile?.email}
            website={companyProfile?.website}
            displayPhone={companyProfile?.display_phone}
            onDisplayPhoneChange={(checked) => {
              const form = document.querySelector('form');
              if (form) {
                const formData = new FormData(form);
                formData.set('display_phone', checked.toString());
                updateCompanyProfile.mutate(formData);
              }
            }}
          />

          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={updateCompanyProfile.isPending}
          >
            {updateCompanyProfile.isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;