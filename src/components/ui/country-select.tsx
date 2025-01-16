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

const countries = [
  { label: "Brasil", value: "BR" },
  { label: "Estados Unidos", value: "US" },
  { label: "Portugal", value: "PT" },
  { label: "Espanha", value: "ES" },
] as const;

export interface CountrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function CountrySelect({ 
  value = "BR", 
  onValueChange, 
  disabled = false 
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);

  // Garante que o valor inicial seja válido
  const selectedCountry = countries.find((country) => country.value === value);
  const displayValue = selectedCountry ? selectedCountry.label : "Selecione um país...";

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
          {displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={true}>
          <CommandInput placeholder="Procurar país..." />
          <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
          <CommandGroup>
            {countries.map((country) => (
              <CommandItem
                key={country.value}
                value={country.value}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === country.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {country.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}