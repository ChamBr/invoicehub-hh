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
      {/* Cabeçalho com INVOICE e Número */}
      <div className="flex justify-between items-center border-b border-[#33C3F0] pb-4">
        <h1 className="text-3xl font-bold text-[#1EAEDB]">INVOICE</h1>
        <p className="text-lg text-[#1EAEDB]">INV-2024001</p>
      </div>

      {/* Grid de informações importantes */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Date:</p>
          <p className="font-medium">{new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Invoice No.</p>
          <p className="font-medium">INV-2024001</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Date payment due</p>
          <p className="font-medium">{new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Lead time</p>
          <p className="font-medium">2 weeks</p>
        </div>
      </div>
    </div>
  );
};