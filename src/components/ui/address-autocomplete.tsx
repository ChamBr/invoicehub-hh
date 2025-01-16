import * as React from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Input } from "./input";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const { data: config, isLoading, error } = useQuery({
    queryKey: ['mapbox-token'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        if (error) {
          console.error("Erro ao obter token do Mapbox:", error);
          throw error;
        }
        return data;
      } catch (err) {
        console.error("Erro na requisição do token:", err);
        throw err;
      }
    },
    staleTime: Infinity,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: mounted,
  });

  const handleRetrieve = React.useCallback((res: any) => {
    if (!mounted) return;
    
    try {
      if (onSelect) onSelect(res);
      if (onAddressSelect) onAddressSelect(res);
    } catch (err) {
      console.error("Erro ao processar endereço:", err);
      toast({
        title: "Erro ao processar endereço",
        description: "Ocorreu um erro ao processar o endereço selecionado.",
        variant: "destructive",
      });
    }
  }, [onSelect, onAddressSelect, mounted, toast]);

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
    toast({
      title: "Erro ao carregar autocompletar",
      description: "Não foi possível carregar o autocompletar de endereço. Por favor, tente novamente mais tarde.",
      variant: "destructive",
    });
    return (
      <Input
        placeholder="Digite seu endereço manualmente"
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }

  const AutofillComponent = AddressAutofill as any;

  return (
    <div className="w-full">
      <AutofillComponent
        accessToken={config.token}
        onRetrieve={handleRetrieve}
        options={{
          language: 'pt',
          countries: ['BR'],
        }}
      >
        <Input
          placeholder="Digite seu endereço"
          value={value}
          onChange={onChange}
          {...props}
        />
      </AutofillComponent>
    </div>
  );
}