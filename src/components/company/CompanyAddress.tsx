import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";

interface CompanyAddressProps {
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  onAddressSelect: (address: any) => void;
}

export const CompanyAddress = ({
  addressLine2,
  city,
  state,
  zipCode,
  onAddressSelect,
}: CompanyAddressProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Endereço</h3>
      <AddressAutocomplete onAddressSelect={onAddressSelect} />
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
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            name="city"
            defaultValue={city}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            name="state"
            defaultValue={state}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip_code">CEP</Label>
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