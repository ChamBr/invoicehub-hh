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

  return (
    <div className="space-y-2">
      <Label htmlFor="address">Street Address</Label>
      <div>
        <AddressAutofill accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ''}>
          <Input
            id="address"
            placeholder="Start typing your address..."
            autoComplete="street-address"
            className="w-full"
          />
        </AddressAutofill>
      </div>
    </div>
  );
}