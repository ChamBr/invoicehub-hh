import * as React from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Input } from "./input";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  const { data: config } = useQuery({
    queryKey: ["mapbox-token"],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('get-mapbox-token');
      return data;
    },
  });

  const handleRetrieve = (res: any) => {
    if (onSelect) onSelect(res);
    if (onAddressSelect) onAddressSelect(res);
  };

  if (!config?.token) {
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
      <AddressAutofill accessToken={config.token} onRetrieve={handleRetrieve}>
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