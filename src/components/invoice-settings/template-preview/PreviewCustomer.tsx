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
    <div className="mt-6">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#1EAEDB] mb-3">Bill to: {customer.name}</h2>
        <div className="text-sm space-y-1 text-gray-600">
          <p>{customer.company}</p>
          <p>{customer.address}</p>
          <p>{customer.city}, {customer.state} - {customer.zipCode}</p>
          <p>{customer.phone}</p>
        </div>
      </div>
    </div>
  );
};