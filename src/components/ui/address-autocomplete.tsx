import * as React from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Input } from "./input";
import { UseFormReturn } from "react-hook-form";
import { useToast } from "./use-toast";

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
  const { toast } = useToast();
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleError = (error: any) => {
    console.error("Erro no autocompletar de endereço:", error);
    toast({
      title: "Erro ao carregar endereço",
      description: "Não foi possível carregar o autocompletar de endereço",
      variant: "destructive",
    });
  };

  const handleRetrieve = (res: any) => {
    try {
      if (onSelect) onSelect(res);
      if (onAddressSelect) onAddressSelect(res);
    } catch (error) {
      handleError(error);
    }
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
      {React.createElement(AddressAutofill, {
        accessToken: token,
        onRetrieve: handleRetrieve,
        children: (
          <Input
            ref={inputRef}
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