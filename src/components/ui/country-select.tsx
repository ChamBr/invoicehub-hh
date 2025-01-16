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
  { label: "Estados Unidos", value: "US" },
  { label: "Brasil", value: "BR" },
  { label: "Espanha", value: "ES" },
  { label: "Portugal", value: "PT" },
] as const;

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

  // Garante que sempre tenhamos um país selecionado válido
  const selectedCountry = React.useMemo(() => {
    const found = countries.find((country) => country.value === value);
    return found || countries[0]; // Retorna Estados Unidos se nenhum país for encontrado
  }, [value]);

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
          {selectedCountry.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Procurar país..." />
          <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
          <CommandGroup>
            {countries.map((country) => (
              <CommandItem
                key={country.value}
                value={country.value}
                onSelect={(currentValue) => {
                  onValueChange(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCountry.value === country.value ? "opacity-100" : "opacity-0"
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