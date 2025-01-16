import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleForceRefresh = () => {
    // Força uma atualização completa da página
    window.location.reload();
    toast({
      title: "Atualizando...",
      description: "A página está sendo recarregada sem cache.",
    });
  };

  return (
    <footer className="py-2 bg-[#F1F0FB] border-t border-gray-100">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          InvoiceHub v0.01b - By HiveHub | alisson.ai
        </p>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-xs flex items-center gap-1 text-gray-400 hover:text-gray-600 hover:bg-transparent"
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