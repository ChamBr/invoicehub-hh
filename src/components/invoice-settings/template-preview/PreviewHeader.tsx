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
    <div className="space-y-6">
      {/* Título e Logo */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-invoice-blue">FATURA</h1>
          <p className="text-sm text-gray-500 mt-1">INV-2024001</p>
        </div>
        {content.header.showLogo && (
          <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center w-48 h-24">
            <span className="text-gray-500">Seu Logo Aqui</span>
          </div>
        )}
      </div>

      {/* Informações da Empresa e Fatura */}
      <div className="grid grid-cols-3 gap-4 bg-invoice-lightBlue p-4 rounded-lg">
        {/* Dados da Empresa */}
        <div>
          <h2 className="font-semibold text-invoice-blue mb-2">{company.name}</h2>
          <div className="text-sm space-y-1 text-gray-600">
            <p>{company.address}</p>
            <p>{company.city}, {company.state}</p>
            <p>{company.zipCode}</p>
          </div>
        </div>

        {/* Contato */}
        <div>
          <h2 className="font-semibold text-invoice-blue mb-2">Contato</h2>
          <div className="text-sm space-y-1 text-gray-600">
            <p>{company.phone}</p>
            <p>{company.email}</p>
            <p>{company.website}</p>
          </div>
        </div>

        {/* Dados da Fatura */}
        <div>
          <h2 className="font-semibold text-invoice-blue mb-2">Detalhes</h2>
          <div className="text-sm space-y-1 text-gray-600">
            <p><span className="font-medium">Data:</span> {new Date().toLocaleDateString('pt-BR')}</p>
            <p><span className="font-medium">Vencimento:</span> {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('pt-BR')}</p>
            <p><span className="font-medium">Forma de Pagamento:</span> PIX</p>
          </div>
        </div>
      </div>
    </div>
  );
};