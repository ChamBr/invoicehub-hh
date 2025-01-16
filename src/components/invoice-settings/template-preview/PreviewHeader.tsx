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
    <div 
      className={cn(
        "p-6 rounded-t-lg",
        content.header.alignment === 'space-between' ? "flex justify-between items-center" : `text-${content.header.alignment}`
      )}
      style={{
        backgroundColor: content.header.backgroundColor,
        color: content.header.textColor
      }}
    >
      <div>
        <h1 className="text-2xl font-bold mb-2">FATURA</h1>
        <div className="text-sm space-y-1">
          <p className="font-semibold">{company.name}</p>
          <p>{company.address}</p>
          <p>{company.city}, {company.state} - {company.zipCode}</p>
          <p>Tel: {company.phone}</p>
          <p>{company.email}</p>
        </div>
      </div>
      <div className="text-sm text-right space-y-1">
        <p><strong>Fatura Nº:</strong> INV-2024001</p>
        <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
        <p><strong>Vencimento:</strong> {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
  );
};