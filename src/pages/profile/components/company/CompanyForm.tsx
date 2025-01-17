import { useCallback } from "react";
import { LogoUpload } from "@/components/company/LogoUpload";
import { CompanyBasicInfo } from "@/components/company/CompanyBasicInfo";
import { CompanyAddress } from "@/components/company/CompanyAddress";
import { CompanyContact } from "@/components/company/CompanyContact";
import { FormSection } from "@/components/forms/FormSection";
import { FormActions } from "@/components/forms/FormActions";
import { uploadCompanyLogo } from "@/integrations/supabase/storage";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface CompanyFormProps {
  companyProfile: any;
  onLogoChange: (file: File | null) => void;
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
  isEditing?: boolean;
  onCancel?: () => void;
}

export const CompanyForm = ({
  companyProfile,
  onLogoChange,
  onSubmit,
  isLoading,
  isEditing = true,
  onCancel
}: CompanyFormProps) => {
  const { toast } = useToast();
  const [displayLogo, setDisplayLogo] = useState(companyProfile?.display_logo || false);
  const [displayTaxId, setDisplayTaxId] = useState(companyProfile?.display_tax_id || false);
  const [displayPhone, setDisplayPhone] = useState(companyProfile?.display_phone || false);
  
  const handleAddressSelect = useCallback((address: any) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('address_line1', address.line1 || '');
      formData.set('address_line2', address.line2 || '');
      formData.set('city', address.city || '');
      formData.set('state', address.state || '');
      formData.set('zip_code', address.zip_code || '');
      formData.set('country', address.country || companyProfile?.country || 'BR');
    }
  }, [companyProfile?.country]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      // Upload logo if present
      const logoFile = formData.get('logo') as File;
      if (logoFile && logoFile instanceof File && logoFile.size > 0) {
        const logoUrl = await uploadCompanyLogo(logoFile);
        if (logoUrl) {
          formData.set('logo_url', logoUrl);
          console.log('Logo URL salvo:', logoUrl);
        }
      } else if (companyProfile?.logo_url) {
        formData.set('logo_url', companyProfile.logo_url);
      }
      
      // Garantir que todos os campos boolean sejam incluídos com seus valores corretos
      formData.set('display_tax_id', displayTaxId.toString());
      formData.set('display_phone', displayPhone.toString());
      formData.set('display_logo', displayLogo.toString());
      
      // Definir país padrão se não estiver presente
      if (!formData.get('country')) {
        formData.set('country', companyProfile?.country || 'BR');
      }

      console.log("Dados a serem salvos:", Object.fromEntries(formData));
      onSubmit(formData);
    } catch (error) {
      console.error('Erro ao fazer upload do logo:', error);
      toast({
        title: "Erro ao fazer upload do logo",
        description: "Ocorreu um erro ao fazer upload do logo da empresa. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <LogoUpload
            logoUrl={companyProfile?.logo_url}
            onLogoChange={onLogoChange}
            displayLogo={displayLogo}
            onDisplayLogoChange={(checked) => {
              setDisplayLogo(checked);
              console.log("Display logo alterado para:", checked);
            }}
            disabled={!isEditing}
          />

          <FormSection>
            <CompanyBasicInfo
              companyName={companyProfile?.company_name}
              taxId={companyProfile?.tax_id}
              displayTaxId={displayTaxId}
              country={companyProfile?.country}
              onCountryChange={(value) => {
                const form = document.querySelector('form');
                if (form) {
                  const formData = new FormData(form);
                  formData.set('country', value);
                }
              }}
              onDisplayTaxIdChange={(checked) => {
                setDisplayTaxId(checked);
                console.log("Display tax ID alterado para:", checked);
              }}
              disabled={!isEditing}
            />
          </FormSection>
        </div>

        <div className="space-y-8">
          <FormSection>
            <CompanyAddress
              addressLine1={companyProfile?.address_line1}
              addressLine2={companyProfile?.address_line2}
              city={companyProfile?.city}
              state={companyProfile?.state}
              zipCode={companyProfile?.zip_code}
              country={companyProfile?.country}
              onAddressSelect={handleAddressSelect}
              disabled={!isEditing}
            />
          </FormSection>

          <FormSection>
            <CompanyContact
              phone={companyProfile?.phone}
              mobile={companyProfile?.mobile}
              email={companyProfile?.email}
              website={companyProfile?.website}
              displayPhone={displayPhone}
              onDisplayPhoneChange={(checked) => {
                setDisplayPhone(checked);
                console.log("Display phone alterado para:", checked);
              }}
              disabled={!isEditing}
            />
          </FormSection>
        </div>
      </div>

      {isEditing && (
        <FormActions
          isSubmitting={isLoading}
          submitLabel="Salvar Alterações"
          onCancel={onCancel}
          className="flex justify-end pt-6 border-t"
        />
      )}
    </form>
  );
};