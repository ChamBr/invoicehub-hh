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
  const [localCity, setLocalCity] = React.useState(city || "");
  const [localState, setLocalState] = React.useState(state || "");
  const [localZipCode, setLocalZipCode] = React.useState(zipCode || "");

  // Atualiza estados locais quando as props mudam
  React.useEffect(() => {
    setLocalCity(city || "");
    setLocalState(state || "");
    setLocalZipCode(zipCode || "");
  }, [city, state, zipCode]);

  const handleAddressSelect = React.useCallback((address: any) => {
    if (!address) return;

    // Atualiza os campos locais
    const newCity = address.city || "";
    const newState = address.state || "";
    const newZipCode = address.postalCode || "";
    
    setLocalCity(newCity);
    setLocalState(newState);
    setLocalZipCode(newZipCode);
    
    // Prepara os dados do endereço mantendo o país atual
    const addressData = {
      ...address,
      country, // Mantém o país atual
      city: newCity,
      state: newState,
      zip_code: newZipCode,
      address_line1: address.line1 || "",
    };
    
    onAddressSelect(addressData);
  }, [country, onAddressSelect]);

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
            value={localCity}
            onChange={(e) => setLocalCity(e.target.value)}
            placeholder={format.cityLabel}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">{format.stateLabel}</Label>
          <Input
            id="state"
            name="state"
            value={localState}
            onChange={(e) => setLocalState(e.target.value)}
            placeholder={format.stateLabel}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip_code">{format.zipLabel}</Label>
          <Input
            id="zip_code"
            name="zip_code"
            value={localZipCode}
            onChange={(e) => setLocalZipCode(e.target.value)}
            placeholder={format.zipLabel}
          />
        </div>
      </div>
    </div>
  );
};