import { useCallback } from "react";
import { LogoUpload } from "@/components/company/LogoUpload";
import { CompanyBasicInfo } from "@/components/company/CompanyBasicInfo";
import { CompanyAddress } from "@/components/company/CompanyAddress";
import { CompanyContact } from "@/components/company/CompanyContact";
import { Button } from "@/components/ui/button";

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
      formData.set('zip_code', address.postalCode || '');
      formData.set('country', address.country || '');
      onSubmit(formData);
    }
  }, [onSubmit]);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit(formData);
    }} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Informações da Empresa</h2>

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
              onSubmit(formData);
            }
          }}
          onDisplayTaxIdChange={(checked) => {
            const form = document.querySelector('form');
            if (form) {
              const formData = new FormData(form);
              formData.set('display_tax_id', checked.toString());
              onSubmit(formData);
            }
          }}
        />

        <CompanyAddress
          addressLine2={companyProfile?.address_line2}
          city={companyProfile?.city}
          state={companyProfile?.state}
          zipCode={companyProfile?.zip_code}
          country={companyProfile?.country}
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
              onSubmit(formData);
            }
          }}
        />

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  );
};