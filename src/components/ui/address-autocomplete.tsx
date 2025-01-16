import * as React from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Input } from "./input";
import { UseFormReturn } from "react-hook-form";

export interface AddressAutocompleteProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (address: any) => void;
  form?: UseFormReturn<any>;
  onAddressSelect?: (address: any) => void;
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  form,
  onAddressSelect,
  ...props
}: AddressAutocompleteProps) {
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const handleRetrieve = (res: any) => {
    if (onSelect) onSelect(res);
    if (onAddressSelect) onAddressSelect(res);
  };

  if (!token) {
    return (
      <Input
        placeholder="Carregando autocompletar de endereço..."
        disabled
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }

  return (
    <div className="w-full">
      {/* @ts-ignore */}
      <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
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