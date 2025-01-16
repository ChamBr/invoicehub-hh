import { useState } from "react";
import { useCompanyProfile } from "./components/company/useCompanyProfile";
import { CompanyForm } from "./components/company/CompanyForm";
import { FormSection } from "@/components/forms/FormSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

const CompanyDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
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
    <div className="container max-w-4xl mx-auto py-8">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <FormSection
            title="Informações da Empresa"
            description="Preencha as informações da sua empresa para personalizar suas faturas."
          >
            <div className="sr-only">Seção de informações da empresa</div>
          </FormSection>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <PencilIcon className="w-4 h-4" />
              Editar Cadastro
            </Button>
          )}
        </div>

        <CompanyForm
          companyProfile={companyProfile}
          onLogoChange={setLogoFile}
          onSubmit={(formData) => {
            updateCompanyProfile.mutate(formData);
            setIsEditing(false);
          }}
          isLoading={updateCompanyProfile.isPending}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
        />
      </Card>
    </div>
  );
};

export default CompanyDetails;