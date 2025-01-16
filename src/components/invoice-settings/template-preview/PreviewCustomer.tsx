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
  company: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
    website: string;
  };
  layout?: 'horizontal' | 'vertical';
}

export const PreviewCustomer = ({ customer, company, layout = 'vertical' }: PreviewCustomerProps) => {
  if (layout === 'horizontal') {
    return (
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Coluna do Emissor */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[#1EAEDB] mb-3">From:</h2>
            <div className="text-sm space-y-1 text-gray-600">
              <p>{company.name}</p>
              <p>{company.address}</p>
              <p>{company.city}, {company.state} {company.zipCode}</p>
              <p>{company.phone}</p>
              <p>{company.email}</p>
              <p>{company.website}</p>
            </div>
          </div>

          {/* Coluna do Destinatário */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[#1EAEDB] mb-3">Bill to:</h2>
            <div className="text-sm space-y-1 text-gray-600">
              <p>{customer.name}</p>
              <p>{customer.company}</p>
              <p>{customer.address}</p>
              <p>{customer.city}, {customer.state} {customer.zipCode}</p>
              <p>{customer.phone}</p>
              <p>{customer.email}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      {/* Emissor */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-[#1EAEDB] mb-3">From:</h2>
        <div className="text-sm space-y-1 text-gray-600">
          <p>{company.name}</p>
          <p>{company.address}</p>
          <p>{company.city}, {company.state} {company.zipCode}</p>
          <p>{company.phone}</p>
          <p>{company.email}</p>
          <p>{company.website}</p>
        </div>
      </div>

      {/* Destinatário */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-[#1EAEDB] mb-3">Bill to:</h2>
        <div className="text-sm space-y-1 text-gray-600">
          <p>{customer.name}</p>
          <p>{customer.company}</p>
          <p>{customer.address}</p>
          <p>{customer.city}, {customer.state} {customer.zipCode}</p>
          <p>{customer.phone}</p>
          <p>{customer.email}</p>
        </div>
      </div>
    </div>
  );
};