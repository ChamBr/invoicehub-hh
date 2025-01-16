import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addressFormats } from "./types";
import { useTranslation } from "react-i18next";

interface CompanyAddressProps {
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  onAddressSelect: (address: any) => void;
}

export const CompanyAddress: React.FC<CompanyAddressProps> = ({
  addressLine2,
  city,
  state,
  zipCode,
  country = 'BR',
  onAddressSelect,
}) => {
  const { t } = useTranslation();
  const format = addressFormats[country] || addressFormats.BR;
  const [localCity, setLocalCity] = React.useState(city || "");
  const [localState, setLocalState] = React.useState(state || "");
  const [localZipCode, setLocalZipCode] = React.useState(zipCode || "");
  const [localAddressLine1, setLocalAddressLine1] = React.useState("");

  React.useEffect(() => {
    if (city !== undefined) setLocalCity(city);
    if (state !== undefined) setLocalState(state);
    if (zipCode !== undefined) setLocalZipCode(zipCode);
  }, [city, state, zipCode]);

  const handleAddressLine1Change = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddressLine1 = e.target.value;
    setLocalAddressLine1(newAddressLine1);
    onAddressSelect({ 
      line1: newAddressLine1,
      line2: addressLine2,
      city: localCity,
      state: localState,
      zip_code: localZipCode,
      country
    });
  }, [addressLine2, localCity, localState, localZipCode, country, onAddressSelect]);

  const handleCityChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setLocalCity(newCity);
    onAddressSelect({ 
      line1: localAddressLine1,
      line2: addressLine2,
      city: newCity,
      state: localState,
      zip_code: localZipCode,
      country
    });
  }, [localAddressLine1, addressLine2, localState, localZipCode, country, onAddressSelect]);

  const handleStateChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.value;
    setLocalState(newState);
    onAddressSelect({ 
      line1: localAddressLine1,
      line2: addressLine2,
      city: localCity,
      state: newState,
      zip_code: localZipCode,
      country
    });
  }, [localAddressLine1, addressLine2, localCity, localZipCode, country, onAddressSelect]);

  const handleZipCodeChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newZipCode = e.target.value;
    setLocalZipCode(newZipCode);
    onAddressSelect({ 
      line1: localAddressLine1,
      line2: addressLine2,
      city: localCity,
      state: localState,
      zip_code: newZipCode,
      country
    });
  }, [localAddressLine1, addressLine2, localCity, localState, country, onAddressSelect]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('company.address')}</h3>
      <div className="space-y-2">
        <Label htmlFor="address_line1">{t('company.address_line1')}</Label>
        <Input
          id="address_line1"
          name="address_line1"
          value={localAddressLine1}
          onChange={handleAddressLine1Change}
          placeholder={t('company.address_line1_placeholder')}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address_line2">{t('company.address_line2')}</Label>
        <Input
          id="address_line2"
          name="address_line2"
          defaultValue={addressLine2}
          placeholder={t('company.address_line2_placeholder')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zip_code">{format.zipLabel}</Label>
          <Input
            id="zip_code"
            name="zip_code"
            value={localZipCode}
            onChange={handleZipCodeChange}
            placeholder={format.zipLabel}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">{format.cityLabel}</Label>
          <Input
            id="city"
            name="city"
            value={localCity}
            onChange={handleCityChange}
            placeholder={format.cityLabel}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">{format.stateLabel}</Label>
          <Input
            id="state"
            name="state"
            value={localState}
            onChange={handleStateChange}
            placeholder={format.stateLabel}
          />
        </div>
      </div>
    </div>
  );
};