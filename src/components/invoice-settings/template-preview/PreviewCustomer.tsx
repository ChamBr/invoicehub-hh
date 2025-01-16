interface PreviewCustomerProps {
  customer: {
    name: string;
    company: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  };
}

export const PreviewCustomer = ({ customer }: PreviewCustomerProps) => {
  return (
    <div className="border-b pb-4">
      <h2 className="font-semibold mb-2">Faturar Para:</h2>
      <div className="text-sm space-y-1">
        <p className="font-medium">{customer.name}</p>
        <p>{customer.company}</p>
        <p>{customer.address}</p>
        <p>{customer.city}, {customer.state} - {customer.zipCode}</p>
        <p>Tel: {customer.phone}</p>
        <p>{customer.email}</p>
      </div>
    </div>
  );
};