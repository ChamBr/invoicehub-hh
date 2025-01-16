import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CountrySelect } from "@/components/ui/country-select";
import { addressFormats } from "./types";

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
  country = 'BR',
  onCountryChange,
  onDisplayTaxIdChange,
}: CompanyBasicInfoProps) => {
  const format = addressFormats[country] || addressFormats.BR;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="country">País</Label>
        <CountrySelect
          value={country}
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
          <Label htmlFor="tax_id">{format.taxIdLabel}</Label>
          <div className="space-y-2">
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
                onCheckedChange={onDisplayTaxIdChange}
              />
              <Label htmlFor="display_tax_id">Exibir {format.taxIdLabel} na fatura</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};