import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { addressFormats } from "./types";

interface CompanyAddressProps {
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  onAddressSelect: (address: any) => void;
}

export const CompanyAddress: React.FC<CompanyAddressProps> = ({
  addressLine2,
  city,
  state,
  zipCode,
  country = 'BR',
  onAddressSelect,
}) => {
  const format = addressFormats[country] || addressFormats.BR;
  const [addressInput, setAddressInput] = React.useState("");

  const handleAddressSelect = React.useCallback((address: any) => {
    if (address && addressInput.trim().length >= 3) {
      onAddressSelect(address);
    }
  }, [onAddressSelect, addressInput]);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{format.addressLabel}</h3>
      <AddressAutocomplete 
        onAddressSelect={handleAddressSelect}
        value={addressInput}
        onChange={handleInputChange}
      />
      
      <div className="space-y-2">
        <Label htmlFor="address_line2">Complemento (Opcional)</Label>
        <Input
          id="address_line2"
          name="address_line2"
          defaultValue={addressLine2}
          placeholder="Apartamento, sala, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">{format.cityLabel}</Label>
          <Input
            id="city"
            name="city"
            defaultValue={city}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">{format.stateLabel}</Label>
          <Input
            id="state"
            name="state"
            defaultValue={state}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip_code">{format.zipLabel}</Label>
          <Input
            id="zip_code"
            name="zip_code"
            defaultValue={zipCode}
          />
        </div>
      </div>
    </div>
  );
};