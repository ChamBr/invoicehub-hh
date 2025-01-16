import { useCallback } from "react";
import { LogoUpload } from "@/components/company/LogoUpload";
import { CompanyBasicInfo } from "@/components/company/CompanyBasicInfo";
import { CompanyAddress } from "@/components/company/CompanyAddress";
import { CompanyContact } from "@/components/company/CompanyContact";
import { FormSection } from "@/components/forms/FormSection";
import { FormActions } from "@/components/forms/FormActions";
import { uploadAvatar } from "@/integrations/supabase/storage";

interface CompanyFormProps {
  companyProfile: any;
  onLogoChange: (file: File | null) => void;
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
}

export const CompanyForm = ({
  companyProfile,
  onLogoChange,
  onSubmit,
  isLoading
}: CompanyFormProps) => {
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
    
    // Garantir que todos os campos boolean sejam incluídos
    formData.set('display_tax_id', formData.get('display_tax_id') === 'true' ? 'true' : 'false');
    formData.set('display_phone', formData.get('display_phone') === 'true' ? 'true' : 'false');
    formData.set('display_logo', formData.get('display_logo') === 'true' ? 'true' : 'false');
    
    // Definir país padrão se não estiver presente
    if (!formData.get('country')) {
      formData.set('country', companyProfile?.country || 'BR');
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <LogoUpload
            logoUrl={companyProfile?.logo_url}
            onLogoChange={onLogoChange}
            displayLogo={companyProfile?.display_logo}
            onDisplayLogoChange={(checked) => {
              const form = document.querySelector('form');
              if (form) {
                const formData = new FormData(form);
                formData.set('display_logo', checked.toString());
              }
            }}
          />

          <FormSection>
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
                }
              }}
              onDisplayTaxIdChange={(checked) => {
                const form = document.querySelector('form');
                if (form) {
                  const formData = new FormData(form);
                  formData.set('display_tax_id', checked.toString());
                }
              }}
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
            />
          </FormSection>

          <FormSection>
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
                }
              }}
            />
          </FormSection>
        </div>
      </div>

      <FormActions
        isSubmitting={isLoading}
        submitLabel="Salvar Alterações"
        className="flex justify-end pt-6 border-t"
      />
    </form>
  );
};