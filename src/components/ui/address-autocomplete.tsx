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
  const { data: config, isLoading, error } = useQuery({
    queryKey: ['mapbox-token'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-mapbox-token');
      if (error) throw error;
      return data;
    },
    staleTime: Infinity,
    retry: 3,
  });

  const handleRetrieve = React.useCallback((res: any) => {
    if (onSelect) onSelect(res);
    if (onAddressSelect) onAddressSelect(res);
  }, [onSelect, onAddressSelect]);

  if (isLoading) {
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

  if (error || !config?.token) {
    console.error("Erro ao carregar token do Mapbox:", error);
    return (
      <Input
        placeholder="Erro ao carregar autocompletar de endereço"
        disabled
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }

  return (
    <div className="w-full">
      {React.createElement(AddressAutofill, {
        accessToken: config.token,
        onRetrieve: handleRetrieve,
        options: {
          language: 'pt',
        },
        children: (
          <Input
            placeholder="Digite seu endereço"
            value={value}
            onChange={onChange}
            {...props}
          />
        )
      })}
    </div>
  );
}