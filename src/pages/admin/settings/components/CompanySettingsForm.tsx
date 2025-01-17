import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CompanySettingsFormData {
  company_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone: string;
  email: string;
  website: string;
}

export const CompanySettingsForm = () => {
  const { register, handleSubmit, reset } = useForm<CompanySettingsFormData>();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["company-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_settings")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching company settings:", error);
        throw error;
      }

      return data;
    },
  });

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  const onSubmit = async (data: CompanySettingsFormData) => {
    try {
      const { error } = await supabase
        .from("company_settings")
        .update(data)
        .eq("id", settings?.id);

      if (error) throw error;

      toast.success("Configurações da empresa atualizadas com sucesso!");
    } catch (error) {
      console.error("Error updating company settings:", error);
      toast.error("Erro ao atualizar as configurações da empresa");
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Dados Cadastrais da InvoiceHub</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company_name">Nome da Empresa</Label>
            <Input
              id="company_name"
              {...register("company_name")}
              placeholder="InvoiceHub Corp"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address_line1">Endereço</Label>
            <Input
              id="address_line1"
              {...register("address_line1")}
              placeholder="2999 Windswept Dr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address_line2">Complemento</Label>
            <Input
              id="address_line2"
              {...register("address_line2")}
              placeholder="Unit 103"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                {...register("city")}
                placeholder="Lantana"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                {...register("state")}
                placeholder="FL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zip_code">CEP</Label>
              <Input
                id="zip_code"
                {...register("zip_code")}
                placeholder="33462"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              {...register("country")}
              placeholder="USA"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="+1 (567) 302-0212"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="invoicehub@alisson.ai"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              {...register("website")}
              placeholder="https://invoicehub.alisson.ai"
            />
          </div>

          <Button type="submit" className="w-full">
            Salvar Alterações
          </Button>
        </form>
      </CardContent>
    </>
  );
};