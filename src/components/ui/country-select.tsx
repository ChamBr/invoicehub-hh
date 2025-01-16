import * as React from "react"
import ReactCountryFlag from "react-country-flag"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslation } from "react-i18next"

const countries = [
  { code: "US", name: "United States" },
  { code: "BR", name: "Brazil" },
]

interface CountrySelectProps {
  value?: string
  onValueChange: (value: string) => void
}

export function CountrySelect({ value, onValueChange }: CountrySelectProps) {
  const { i18n } = useTranslation();

  const getCountryName = (code: string) => {
    const countryNames = new Intl.DisplayNames([i18n.language], { type: 'region' });
    return countryNames.of(code);
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue placeholder="Select country">
          {value && (
            <div className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={value}
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                }}
              />
              {getCountryName(value)}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        {countries.map((country) => (
          <SelectItem
            key={country.code}
            value={country.code}
            className="flex items-center gap-2"
          >
            <ReactCountryFlag
              countryCode={country.code}
              svg
              style={{
                width: '1.5em',
                height: '1.5em',
              }}
            />
            {getCountryName(country.code)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}