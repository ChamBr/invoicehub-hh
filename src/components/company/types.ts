export type AddressFormat = {
  zipLabel: string;
  stateLabel: string;
  cityLabel: string;
  addressLabel: string;
  taxIdLabel: string;
  taxIdMask: string;
};

export const addressFormats: Record<string, AddressFormat> = {
  BR: {
    zipLabel: "CEP",
    stateLabel: "Estado",
    cityLabel: "Cidade",
    addressLabel: "Endereço",
    taxIdLabel: "CNPJ/CPF",
    taxIdMask: "999.999.999-99",
  },
  US: {
    zipLabel: "ZIP Code",
    stateLabel: "State",
    cityLabel: "City",
    addressLabel: "Address",
    taxIdLabel: "Tax ID",
    taxIdMask: "99-9999999",
  },
  ES: {
    zipLabel: "Código Postal",
    stateLabel: "Provincia",
    cityLabel: "Ciudad",
    addressLabel: "Dirección",
    taxIdLabel: "NIF/CIF",
    taxIdMask: "X9999999X",
  }
};