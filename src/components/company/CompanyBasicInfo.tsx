import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CountrySelect } from "@/components/ui/country-select";
import { addressFormats } from "./types";
import * as React from "react";
import { useTranslation } from "react-i18next";

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
  displayTaxId = false,
  country = 'BR',
  onCountryChange,
  onDisplayTaxIdChange,
}) => {
  const { t } = useTranslation();
  const format = addressFormats[country] || addressFormats.BR;

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="country">{t('company.country')}</Label>
          <CountrySelect
            value={country}
            onValueChange={onCountryChange}
          />
        </div>
        
        <div>
          <Label htmlFor="company_name">{t('company.name')}</Label>
          <Input
            id="company_name"
            name="company_name"
            defaultValue={companyName}
            placeholder={t('company.name_placeholder')}
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax_id">{format.taxIdLabel}</Label>
          <Input
            id="tax_id"
            name="tax_id"
            defaultValue={taxId}
            placeholder={format.taxIdMask}
            className="w-full"
          />
          <div className="flex items-center gap-2 pt-2">
            <Switch
              id="display_tax_id"
              name="display_tax_id"
              checked={displayTaxId}
              onCheckedChange={onDisplayTaxIdChange}
            />
            <Label htmlFor="display_tax_id" className="text-sm text-muted-foreground">
              {t('company.display_tax_id')}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};