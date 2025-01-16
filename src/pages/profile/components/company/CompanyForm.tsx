import { useCallback } from "react";
import { LogoUpload } from "@/components/company/LogoUpload";
import { CompanyBasicInfo } from "@/components/company/CompanyBasicInfo";
import { CompanyAddress } from "@/components/company/CompanyAddress";
import { CompanyContact } from "@/components/company/CompanyContact";
import { FormSection } from "@/components/forms/FormSection";
import { FormActions } from "@/components/forms/FormActions";

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
      onSubmit(formData);
    }
  }, [onSubmit, companyProfile?.country]);

  const handleCountryChange = useCallback((value: string) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('country', value);
      onSubmit(formData);
    }
  }, [onSubmit]);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      // Garantir que o país atual seja incluído no formData
      if (!formData.get('country')) {
        formData.set('country', companyProfile?.country || 'BR');
      }
      onSubmit(formData);
    }} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <FormSection>
            <LogoUpload
              logoUrl={companyProfile?.logo_url}
              onLogoChange={onLogoChange}
              displayLogo={companyProfile?.display_logo}
              onDisplayLogoChange={(checked) => {
                const form = document.querySelector('form');
                if (form) {
                  const formData = new FormData(form);
                  formData.set('display_logo', checked.toString());
                  onSubmit(formData);
                }
              }}
            />
          </FormSection>

          <FormSection
            title="Informações Básicas"
            description="Dados principais da empresa"
          >
            <CompanyBasicInfo
              companyName={companyProfile?.company_name}
              taxId={companyProfile?.tax_id}
              displayTaxId={companyProfile?.display_tax_id}
              country={companyProfile?.country}
              onCountryChange={handleCountryChange}
              onDisplayTaxIdChange={(checked) => {
                const form = document.querySelector('form');
                if (form) {
                  const formData = new FormData(form);
                  formData.set('display_tax_id', checked.toString());
                  onSubmit(formData);
                }
              }}
            />
          </FormSection>
        </div>

        <div className="space-y-8">
          <FormSection
            title="Endereço"
            description="Localização da empresa"
          >
            <CompanyAddress
              addressLine2={companyProfile?.address_line2}
              city={companyProfile?.city}
              state={companyProfile?.state}
              zipCode={companyProfile?.zip_code}
              country={companyProfile?.country}
              onAddressSelect={handleAddressSelect}
            />
          </FormSection>

          <FormSection
            title="Contato"
            description="Informações de contato"
          >
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
                  onSubmit(formData);
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