import * as React from "react"
import ReactCountryFlag from "react-country-flag"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const countries = [
  { code: "US", name: "United States" },
  { code: "BR", name: "Brazil" },
]

interface CountrySelectProps {
  value?: string
  onValueChange: (value: string) => void
}

export function CountrySelect({ value, onValueChange }: CountrySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a country">
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
              {countries.find(country => country.code === value)?.name}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
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
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}