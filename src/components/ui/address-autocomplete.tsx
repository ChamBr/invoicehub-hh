import * as React from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Input } from "./input";
import { UseFormReturn } from "react-hook-form";

export interface AddressAutocompleteProps {
  accessToken?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (address: any) => void;
  form?: UseFormReturn<any>;
  onAddressSelect?: (address: any) => void;
}

export function AddressAutocomplete({
  accessToken = process.env.MAPBOX_ACCESS_TOKEN,
  value,
  onChange,
  onSelect,
  form,
  onAddressSelect,
  ...props
}: AddressAutocompleteProps) {
  const handleRetrieve = (res: any) => {
    if (onSelect) onSelect(res);
    if (onAddressSelect) onAddressSelect(res);
  };

  return (
    <div className="w-full">
      {/* @ts-ignore */}
      <AddressAutofill accessToken={accessToken} onRetrieve={handleRetrieve}>
        <Input
          placeholder="Digite seu endereço"
          value={value}
          onChange={onChange}
          {...props}
        />
      </AddressAutofill>
    </div>
  );
}