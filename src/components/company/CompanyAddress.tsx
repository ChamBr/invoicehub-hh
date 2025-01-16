import * as React from "react";
import { useTranslation } from "react-i18next";
import { addressFormats } from "./types";
import { AddressField } from "./AddressField";
import { useAddressState } from "./hooks/useAddressState";

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

  const {
    addressLine1,
    city: localCity,
    state: localState,
    zipCode: localZipCode,
    updateAddress,
  } = useAddressState({
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
        value={addressLine1}
        onChange={(value) => updateAddress('line1', value, addressLine2)}
        label={t('company.address_line1')}
        placeholder={t('company.address_line1_placeholder')}
      />
      
      <AddressField
        id="address_line2"
        value={addressLine2 || ''}
        onChange={(value) => updateAddress('line2', value)}
        label={t('company.address_line2')}
        placeholder={t('company.address_line2_placeholder')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AddressField
          id="zip_code"
          value={localZipCode}
          onChange={(value) => updateAddress('zip_code', value)}
          label={format.zipLabel}
          placeholder={format.zipLabel}
        />
        
        <AddressField
          id="city"
          value={localCity}
          onChange={(value) => updateAddress('city', value)}
          label={format.cityLabel}
          placeholder={format.cityLabel}
        />
        
        <AddressField
          id="state"
          value={localState}
          onChange={(value) => updateAddress('state', value)}
          label={format.stateLabel}
          placeholder={format.stateLabel}
        />
      </div>
    </div>
  );
};