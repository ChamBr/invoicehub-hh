import { useState } from "react";
import { useCompanyProfile } from "./components/company/useCompanyProfile";
import { CompanyForm } from "./components/company/CompanyForm";

const CompanyDetails = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { companyProfile, isLoading, updateCompanyProfile } = useCompanyProfile();

  if (isLoading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <CompanyForm
        companyProfile={companyProfile}
        onLogoChange={setLogoFile}
        onSubmit={(formData) => updateCompanyProfile.mutate(formData)}
        isLoading={updateCompanyProfile.isPending}
      />
    </div>
  );
};

export default CompanyDetails;