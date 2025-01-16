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
      <div className="bg-white rounded-lg">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[#1EAEDB] mb-3">Bill to:</h2>
            <div className="text-sm space-y-1 text-gray-600">
              <p>{customer.name}</p>
              <p>{customer.company}</p>
              <p>{customer.address}</p>
              <p>{customer.city}, {customer.state} - {customer.zipCode}</p>
              <p>{customer.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};