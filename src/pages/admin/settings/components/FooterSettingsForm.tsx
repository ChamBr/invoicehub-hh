import { useForm } from "react-hook-form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { FormRow } from "@/components/forms/FormRow";
import { FormSection } from "@/components/forms/FormSection";
import { FormActions } from "@/components/forms/FormActions";
import { useFooterSettings } from "../hooks/useFooterSettings";
import Footer from "@/components/layout/Footer";

interface FooterSettingsFormData {
  left_text: string;
  center_text: string;
  right_text: string;
  font_size: string;
  text_color: string;
  text_alpha: number;
  container_height: string;
  show_refresh_button: boolean;
  refresh_button_size: string;
  refresh_button_color: string;
}

export const FooterSettingsForm = () => {
  const { data: settings, isLoading, updateSettings } = useFooterSettings();
  const { register, handleSubmit, watch, setValue } = useForm<FooterSettingsFormData>({
    values: settings || {
      left_text: "",
      center_text: "",
      right_text: "",
      font_size: "12px",
      text_color: "#8E9196",
      text_alpha: 0.7,
      container_height: "40px",
      show_refresh_button: true,
      refresh_button_size: "sm",
      refresh_button_color: "#8E9196",
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const onSubmit = async (data: FooterSettingsFormData) => {
    await updateSettings(data);
  };

  const formValues = watch();

  // Função auxiliar para converter px em número
  const pxToNumber = (px: string) => parseInt(px.replace('px', ''));
  
  // Função auxiliar para converter número em px
  const numberToPx = (num: number) => `${num}px`;

  return (
    <>
      <CardHeader>
        <CardTitle>Configurações do Rodapé</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSection title="Textos">
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

          <FormSection title="Estilo">
            <FormRow>
              <div className="space-y-4 w-full">
                <div className="space-y-2">
                  <Label>Tamanho da Fonte (px)</Label>
                  <Slider
                    min={8}
                    max={24}
                    step={1}
                    value={[pxToNumber(formValues.font_size)]}
                    onValueChange={(value) => setValue("font_size", numberToPx(value[0]))}
                  />
                  <div className="text-sm text-muted-foreground text-right">
                    {pxToNumber(formValues.font_size)}px
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="text_color">Cor do Texto</Label>
                <Input 
                  id="text_color" 
                  type="color" 
                  {...register("text_color")} 
                  className="h-10 p-1"
                />
              </div>
              <div className="space-y-4 w-full">
                <div className="space-y-2">
                  <Label>Transparência</Label>
                  <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    value={[formValues.text_alpha]}
                    onValueChange={(value) => setValue("text_alpha", value[0])}
                  />
                  <div className="text-sm text-muted-foreground text-right">
                    {formValues.text_alpha.toFixed(1)}
                  </div>
                </div>
              </div>
              <div className="space-y-4 w-full">
                <div className="space-y-2">
                  <Label>Altura do Container (px)</Label>
                  <Slider
                    min={20}
                    max={100}
                    step={1}
                    value={[pxToNumber(formValues.container_height)]}
                    onValueChange={(value) => setValue("container_height", numberToPx(value[0]))}
                  />
                  <div className="text-sm text-muted-foreground text-right">
                    {pxToNumber(formValues.container_height)}px
                  </div>
                </div>
              </div>
            </FormRow>
          </FormSection>

          <FormSection title="Botão de Atualizar">
            <FormRow>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show_refresh_button" 
                  checked={formValues.show_refresh_button}
                  onCheckedChange={(checked) => setValue("show_refresh_button", checked)}
                />
                <Label htmlFor="show_refresh_button">Mostrar Botão de Atualizar</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="refresh_button_size">Tamanho do Botão</Label>
                <Input 
                  id="refresh_button_size" 
                  {...register("refresh_button_size")} 
                  disabled={!watch("show_refresh_button")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="refresh_button_color">Cor do Botão</Label>
                <Input 
                  id="refresh_button_color" 
                  type="color" 
                  {...register("refresh_button_color")} 
                  className="h-10 p-1"
                  disabled={!watch("show_refresh_button")}
                />
              </div>
            </FormRow>
          </FormSection>

          <div className="mt-6 border rounded-lg p-4 bg-gray-50">
            <h4 className="text-sm font-medium mb-2">Preview do Rodapé</h4>
            <div className="border rounded-lg overflow-hidden">
              <Footer />
            </div>
          </div>

          <FormActions submitLabel="Salvar" />
        </form>
      </CardContent>
    </>
  );
};