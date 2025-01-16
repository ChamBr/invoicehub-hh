import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleForceRefresh = () => {
    // Limpa o cache do navegador e recarrega a página
    window.location.reload(true);
    toast({
      title: "Atualizando...",
      description: "A página está sendo recarregada sem cache.",
    });
  };

  return (
    <footer className="py-2 bg-gray-50 border-t">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-xs text-gray-600">
          InvoiceHub v0.01b - By HiveHub | alisson.ai
        </p>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-xs flex items-center gap-1"
          onClick={handleForceRefresh}
        >
          <RefreshCw className="h-3 w-3" />
          Atualizar
        </Button>
      </div>
    </footer>
  );
};

export default Footer;