interface PreviewHeaderProps {
  content: {
    header: {
      showLogo: boolean;
      alignment: 'left' | 'center' | 'right' | 'space-between';
      textColor: string;
      backgroundColor: string;
      title: string;
    };
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
}

export const PreviewHeader = ({ content, company }: PreviewHeaderProps) => {
  return (
    <div className="space-y-8">
      {/* Título principal */}
      <h1 className="text-3xl font-bold text-[#0EA5E9]">
        FREELANCE INVOICE TEMPLATE
      </h1>

      {/* Grid de informações importantes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-[#64748B] mb-1">Date:</p>
          <p className="font-medium text-[#0EA5E9]">
            {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-[#64748B] mb-1">Invoice No.</p>
          <p className="font-medium text-[#0EA5E9]">123456789</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-[#64748B] mb-1">Date payment due</p>
          <p className="font-medium text-[#0EA5E9]">
            {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-[#64748B] mb-1">Lead time</p>
          <p className="font-medium text-[#0EA5E9]">2 weeks</p>
        </div>
      </div>
    </div>
  );
};