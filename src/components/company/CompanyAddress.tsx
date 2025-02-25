import * as React from "react";
import { useTranslation } from "react-i18next";
import { addressFormats } from "./types";
import { AddressField } from "./AddressField";
import { useAddressState } from "./hooks/useAddressState";

interface CompanyAddressProps {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  onAddressSelect: (address: any) => void;
  disabled?: boolean;
}

export const CompanyAddress: React.FC<CompanyAddressProps> = ({
  addressLine1,
  addressLine2,
  city,
  state,
  zipCode,
  country = 'BR',
  onAddressSelect,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const format = addressFormats[country] || addressFormats.BR;

  const {
    addressLine1: localAddressLine1,
    city: localCity,
    state: localState,
    zipCode: localZipCode,
    updateAddress,
  } = useAddressState({
    initialAddressLine1: addressLine1,
    initialCity: city,
    initialState: state,
    initialZipCode: zipCode,
    initialCountry: country,
    onAddressSelect,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('company.address')}</h3>
      
      <AddressField
        id="address_line1"
        value={localAddressLine1}
        onChange={(value) => updateAddress('line1', value, addressLine2)}
        label={t('company.address_line1')}
        placeholder={t('company.address_line1_placeholder')}
        disabled={disabled}
      />
      
      <AddressField
        id="address_line2"
        value={addressLine2 || ''}
        onChange={(value) => updateAddress('line2', value)}
        label={t('company.address_line2')}
        placeholder={t('company.address_line2_placeholder')}
        disabled={disabled}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AddressField
          id="zip_code"
          value={localZipCode}
          onChange={(value) => updateAddress('zip_code', value)}
          label={format.zipLabel}
          placeholder={format.zipLabel}
          disabled={disabled}
        />
        
        <AddressField
          id="city"
          value={localCity}
          onChange={(value) => updateAddress('city', value)}
          label={format.cityLabel}
          placeholder={format.cityLabel}
          disabled={disabled}
        />
        
        <AddressField
          id="state"
          value={localState}
          onChange={(value) => updateAddress('state', value)}
          label={format.stateLabel}
          placeholder={format.stateLabel}
          disabled={disabled}
        />
      </div>
    </div>
  );
};