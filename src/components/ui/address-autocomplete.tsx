import * as React from "react"
import { AddressAutofill } from '@mapbox/search-js-react';
import { Input } from "./input"
import { Label } from "./label"

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }) => void;
}

export function AddressAutocomplete({ onAddressSelect }: AddressAutocompleteProps) {
  const handleAddressSelect = (address: any) => {
    const formattedAddress = {
      line1: address.address1 || '',
      line2: address.address2 || '',
      city: address.city || '',
      state: address.state || '',
      postalCode: address.postcode || '',
      country: address.country || 'US',
    };
    onAddressSelect(formattedAddress);
  };

  const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentPropsWithRef<'input'>>(
    (props, ref) => (
      <Input
        ref={ref}
        id="address"
        placeholder="Digite seu endereço..."
        autoComplete="street-address"
        className="w-full"
        {...props}
      />
    )
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="address">Endereço</Label>
      <AddressAutofill
        accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ''}
        onRetrieve={handleAddressSelect}
      >
        <InputComponent />
      </AddressAutofill>
    </div>
  );
}