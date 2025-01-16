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

  const footerStyle = {
    height: settings?.container_height || '40px',
  };

  const textStyle = {
    fontSize: settings?.font_size || '12px',
    color: settings?.text_color || '#8E9196',
    opacity: settings?.text_alpha || 0.7,
  };

  return (
    <footer className="py-2 bg-gray-50/50 border-t border-gray-100" style={footerStyle}>
      <div className="container mx-auto px-4 grid grid-cols-3 items-center">
        <p className="text-xs" style={textStyle}>
          {settings?.left_text || 'InvoiceHub v0.01b'}
        </p>
        <p className="text-xs text-center" style={textStyle}>
          {settings?.center_text || 'By HiveHub'} | {settings?.right_text || 'alisson.ai'}
        </p>
        <div className="flex justify-end">
          {settings?.show_refresh_button && (
            <Button 
              variant="ghost" 
              size={settings?.refresh_button_size as any || "sm"}
              className="text-xs flex items-center gap-1 hover:bg-transparent"
              onClick={handleForceRefresh}
              style={{ color: settings?.refresh_button_color || '#8E9196' }}
            >
              <RefreshCw className="h-3 w-3" />
              Atualizar
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;