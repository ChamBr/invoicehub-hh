import * as React from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Input } from "./input";

export interface AddressAutocompleteProps {
  accessToken: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (address: any) => void;
}

export function AddressAutocomplete({
  accessToken,
  value,
  onChange,
  onSelect,
  ...props
}: AddressAutocompleteProps) {
  return (
    <AddressAutofill accessToken={accessToken} onRetrieve={onSelect}>
      <Input
        placeholder="Digite seu endereço"
        value={value}
        onChange={onChange}
        {...props}
      />
    </AddressAutofill>
  );
}