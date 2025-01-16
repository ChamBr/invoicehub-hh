import { useState } from "react";
import { useCompanyProfile } from "./components/company/useCompanyProfile";
import { CompanyForm } from "./components/company/CompanyForm";
import { FormSection } from "@/components/forms/FormSection";

const CompanyDetails = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { companyProfile, isLoading, updateCompanyProfile } = useCompanyProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <FormSection
        title="Informações da Empresa"
        description="Preencha as informações da sua empresa para personalizar suas faturas."
        className="bg-white rounded-lg shadow-sm"
      >
        <CompanyForm
          companyProfile={companyProfile}
          onLogoChange={setLogoFile}
          onSubmit={(formData) => updateCompanyProfile.mutate(formData)}
          isLoading={updateCompanyProfile.isPending}
        />
      </FormSection>
    </div>
  );
};

export default CompanyDetails;