import { useState, useCallback } from 'react';

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

interface UseAddressStateProps {
  initialCity?: string;
  initialState?: string;
  initialZipCode?: string;
  initialCountry?: string;
  onAddressSelect: (address: Address) => void;
}

export const useAddressState = ({
  initialCity = '',
  initialState = '',
  initialZipCode = '',
  initialCountry = 'BR',
  onAddressSelect,
}: UseAddressStateProps) => {
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState(initialCity);
  const [state, setState] = useState(initialState);
  const [zipCode, setZipCode] = useState(initialZipCode);
  const [country, setCountry] = useState(initialCountry);

  const updateAddress = useCallback((
    field: keyof Address,
    value: string,
    addressLine2?: string
  ) => {
    const newAddress = {
      line1: addressLine1,
      line2: addressLine2,
      city,
      state,
      zip_code: zipCode,
      country,
      [field]: value,
    };

    switch (field) {
      case 'line1':
        setAddressLine1(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'zip_code':
        setZipCode(value);
        break;
      case 'country':
        setCountry(value);
        break;
    }

    onAddressSelect(newAddress);
  }, [addressLine1, city, state, zipCode, country, onAddressSelect]);

  return {
    addressLine1,
    city,
    state,
    zipCode,
    country,
    updateAddress,
  };
};