import * as React from "react"
import { AddressAutofill, AddressAutofillProps } from '@mapbox/search-js-react';
import { Input } from "./input"
import { Label } from "./label"
import { FormControl, FormField, FormItem, FormLabel } from "./form"
import { UseFormReturn } from "react-hook-form"
import { CustomerFormValues } from "@/components/customers/types"

interface AddressAutocompleteProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function AddressAutocomplete({ form }: AddressAutocompleteProps) {
  const handleAddressSelect = (address: any) => {
    form.setValue("address", address.address1 || '');
    form.setValue("city", address.city || '');
    form.setValue("state", address.state || '');
    form.setValue("zipCode", address.postcode || '');
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Endereço</FormLabel>
            <FormControl>
              <AddressAutofill
                accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                onRetrieve={handleAddressSelect}
              >
                <Input
                  placeholder="Digite seu endereço..."
                  autoComplete="street-address"
                  {...field}
                />
              </AddressAutofill>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}