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
      {/* Cabeçalho com INVOICE e número */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#0EA5E9]">
          INVOICE
        </h1>
        <p className="text-xl font-medium text-[#0EA5E9]">
          #123456789
        </p>
      </div>

      {/* Grid de informações importantes - 2 cards alinhados à direita */}
      <div className="flex justify-end gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm w-64">
          <p className="text-sm text-[#64748B] mb-1">Date:</p>
          <p className="font-medium text-[#0EA5E9]">
            {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm w-64">
          <p className="text-sm text-[#64748B] mb-1">Date payment due</p>
          <p className="font-medium text-[#0EA5E9]">
            {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
};