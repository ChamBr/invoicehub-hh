import { cn } from "@/lib/utils";

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
  };
}

export const PreviewHeader = ({ content, company }: PreviewHeaderProps) => {
  return (
    <div className="space-y-6">
      {/* Título e Logo */}
      <div className="flex justify-between items-start">
        <h1 className="text-4xl font-bold text-invoice-blue">FATURA</h1>
        {content.header.showLogo && (
          <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center w-48">
            <span className="text-gray-500">Seu Logo Aqui</span>
          </div>
        )}
      </div>

      {/* Informações da Empresa e Fatura */}
      <div className="grid grid-cols-3 gap-8">
        {/* Dados da Empresa */}
        <div className="col-span-1">
          <h2 className="font-semibold text-lg mb-2">{company.name}</h2>
          <div className="text-sm space-y-1 text-gray-600">
            <p>{company.address}</p>
            <p>{company.city}, {company.state} - {company.zipCode}</p>
          </div>
        </div>

        {/* Contato */}
        <div className="col-span-1">
          <div className="text-sm space-y-1">
            <p><span className="font-semibold text-invoice-blue">Telefone:</span> {company.phone}</p>
            <p><span className="font-semibold text-invoice-blue">Email:</span> {company.email}</p>
          </div>
        </div>

        {/* Dados da Fatura */}
        <div className="col-span-1 text-right">
          <div className="text-sm space-y-1">
            <p><span className="font-semibold text-invoice-blue">Data:</span> {new Date().toLocaleDateString('pt-BR')}</p>
            <p><span className="font-semibold text-invoice-blue">Fatura Nº:</span> INV-2024001</p>
            <p><span className="font-semibold text-invoice-blue">Vencimento:</span> {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};