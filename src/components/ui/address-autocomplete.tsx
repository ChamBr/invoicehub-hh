import * as React from "react";
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
  return (
    <div className="w-full">
      <Input
        placeholder="Digite seu endereço"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}