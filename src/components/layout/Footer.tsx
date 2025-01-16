import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: settings } = useQuery({
    queryKey: ["footer-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("footer_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleForceRefresh = () => {
    window.location.reload();
    toast({
      title: "Atualizando...",
      description: "A página está sendo recarregada sem cache.",
    });
  };

  return (
    <footer className="py-2 bg-gray-50/50 border-t border-gray-100">
      <div className="container mx-auto px-4 grid grid-cols-3 items-center">
        <p className="text-xs text-gray-400">
          {settings?.left_text || 'InvoiceHub v0.01b'}
        </p>
        <p className="text-xs text-gray-400 text-center">
          {settings?.center_text || 'By HiveHub'} | {settings?.right_text || 'alisson.ai'}
        </p>
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs flex items-center gap-1 text-gray-300 hover:text-gray-400 hover:bg-transparent"
            onClick={handleForceRefresh}
          >
            <RefreshCw className="h-3 w-3" />
            Atualizar
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;