import { useForm } from "react-hook-form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormRow } from "@/components/forms/FormRow";
import { FormSection } from "@/components/forms/FormSection";
import { FormActions } from "@/components/forms/FormActions";
import { useFooterSettings } from "../hooks/useFooterSettings";

interface FooterSettingsFormData {
  left_text: string;
  center_text: string;
  right_text: string;
}

export const FooterSettingsForm = () => {
  const { data: settings, isLoading, updateSettings } = useFooterSettings();
  const { register, handleSubmit } = useForm<FooterSettingsFormData>({
    values: settings || {
      left_text: "",
      center_text: "",
      right_text: "",
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const onSubmit = async (data: FooterSettingsFormData) => {
    await updateSettings(data);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Configurações do Rodapé</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSection>
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="left_text">Texto à Esquerda</Label>
                <Input id="left_text" {...register("left_text")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="center_text">Texto Central</Label>
                <Input id="center_text" {...register("center_text")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="right_text">Texto à Direita</Label>
                <Input id="right_text" {...register("right_text")} />
              </div>
            </FormRow>
          </FormSection>
          <FormActions submitLabel="Salvar" />
        </form>
      </CardContent>
    </>
  );
};