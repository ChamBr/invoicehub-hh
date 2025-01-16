import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

interface Country {
  code: string;
  name_en: string;
}

export interface CountrySelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function CountrySelect({ 
  value = "US", 
  onValueChange, 
  disabled = false 
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const { data: countries = [], isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("countries")
        .select("code, name_en")
        .eq("is_active", true)
        .order("name_en");

      if (error) {
        console.error("Erro ao buscar países:", error);
        return [];
      }

      return data as Country[];
    },
  });

  // Garante que sempre tenhamos um país selecionado válido
  const selectedCountry = React.useMemo(() => {
    const found = countries.find((country) => country.code === value);
    return found || countries[0];
  }, [value, countries]);

  if (isLoading) {
    return (
      <Button variant="outline" className="w-full" disabled>
        Carregando países...
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedCountry?.name_en || t("common.loading")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={t("common.search_country")} />
          <CommandEmpty>{t("common.no_country_found")}</CommandEmpty>
          <CommandGroup>
            {countries.map((country) => (
              <CommandItem
                key={country.code}
                value={country.code}
                onSelect={(currentValue) => {
                  onValueChange(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === country.code ? "opacity-100" : "opacity-0"
                  )}
                />
                {country.name_en}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}