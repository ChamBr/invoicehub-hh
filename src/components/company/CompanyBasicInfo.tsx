import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CountrySelect } from "@/components/ui/country-select";
import { addressFormats } from "./types";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CompanyBasicInfoProps {
  companyName?: string;
  taxId?: string;
  displayTaxId?: boolean;
  country?: string;
  onCountryChange: (value: string) => void;
  onDisplayTaxIdChange: (checked: boolean) => void;
}

export const CompanyBasicInfo: React.FC<CompanyBasicInfoProps> = ({
  companyName,
  taxId,
  displayTaxId,
  country = 'BR',
  onCountryChange,
  onDisplayTaxIdChange,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const format = addressFormats[country] || addressFormats.BR;

  const handleCountryChange = React.useCallback((value: string) => {
    onCountryChange(value);
  }, [onCountryChange]);

  const handleDisplayTaxIdChange = React.useCallback((checked: boolean) => {
    onDisplayTaxIdChange(checked);
  }, [onDisplayTaxIdChange]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.currentTarget);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const { error } = await supabase
        .from('company_profiles')
        .upsert({
          user_id: user.id,
          company_name: formData.get('company_name')?.toString(),
          tax_id: formData.get('tax_id')?.toString(),
          display_tax_id: displayTaxId,
          country: country
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Dados da empresa salvos com sucesso",
      });
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao salvar os dados da empresa",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <Label htmlFor="country">{t('company.country')}</Label>
          <CountrySelect
            value={country}
            onValueChange={handleCountryChange}
          />
        </div>
        <div className="col-span-6">
          <Label htmlFor="company_name">{t('company.name')}</Label>
          <Input
            id="company_name"
            name="company_name"
            defaultValue={companyName}
            placeholder={t('company.name_placeholder')}
            required
          />
        </div>
        <div className="col-span-4 space-y-2">
          <Label htmlFor="tax_id">{format.taxIdLabel}</Label>
          <Input
            id="tax_id"
            name="tax_id"
            defaultValue={taxId}
            placeholder={format.taxIdMask}
          />
          <div className="flex items-center gap-2">
            <Switch
              id="display_tax_id"
              name="display_tax_id"
              checked={displayTaxId}
              onCheckedChange={handleDisplayTaxIdChange}
            />
            <Label htmlFor="display_tax_id" className="text-sm text-muted-foreground">
              {t('company.display_tax_id')}
            </Label>
          </div>
        </div>
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
};