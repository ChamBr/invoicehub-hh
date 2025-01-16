import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CountrySelect } from "@/components/ui/country-select";

interface CompanyBasicInfoProps {
  companyName?: string;
  taxId?: string;
  displayTaxId?: boolean;
  country?: string;
  onCountryChange: (value: string) => void;
  onDisplayTaxIdChange: (checked: boolean) => void;
}

export const CompanyBasicInfo = ({
  companyName,
  taxId,
  displayTaxId,
  country,
  onCountryChange,
  onDisplayTaxIdChange,
}: CompanyBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="country">País</Label>
        <CountrySelect
          value={country || 'BR'}
          onValueChange={onCountryChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company_name">Nome da Empresa</Label>
          <Input
            id="company_name"
            name="company_name"
            defaultValue={companyName}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tax_id">CNPJ/CPF</Label>
          <div className="space-y-2">
            <Input
              id="tax_id"
              name="tax_id"
              defaultValue={taxId}
            />
            <div className="flex items-center gap-2">
              <Switch
                id="display_tax_id"
                name="display_tax_id"
                checked={displayTaxId}
                onCheckedChange={onDisplayTaxIdChange}
              />
              <Label htmlFor="display_tax_id">Exibir CNPJ/CPF na fatura</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};