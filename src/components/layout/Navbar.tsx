import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Package, 
  FileText, 
  MessageSquare, 
  UserCircle,
  Menu,
  X,
  Settings
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSwitcher from "./LanguageSwitcher";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar perfil do usuário
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
        return null;
      }

      return data;
    },
  });

  const handleAdminToggle = async (checked: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Usuário não autenticado.",
        });
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ role: checked ? "admin" : "user" })
        .eq("id", user.id);

      if (error) {
        console.error("Erro ao atualizar perfil:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível atualizar o perfil.",
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: t('common.admin.mode'),
        description: checked ? t('common.admin.enabled') : t('common.admin.disabled'),
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
      });
    }
  };

  useEffect(() => {
    const pageTitles: { [key: string]: string } = {
      "/": "Dashboard",
      "/customers": t('navigation.customers'),
      "/products": t('navigation.products'),
      "/invoices": t('navigation.invoices'),
      "/profile": t('navigation.profile'),
      "/admin": t('navigation.admin'),
      "/feedback": t('navigation.feedback.submit')
    };
    document.title = `InvoiceHub - ${pageTitles[location.pathname] || ""}`;
  }, [location, t]);

  const menuItems = {
    records: [
      {
        to: "/customers",
        icon: <Users className="h-4 w-4" />,
        label: t('navigation.customers')
      },
      {
        to: "/products",
        icon: <Package className="h-4 w-4" />,
        label: t('navigation.products')
      },
      {
        to: "/invoices",
        icon: <FileText className="h-4 w-4" />,
        label: t('navigation.invoices')
      }
    ],
    user: [
      {
        to: "/profile",
        icon: <UserCircle className="h-4 w-4" />,
        label: t('navigation.profile')
      },
      {
        to: "/feedback",
        icon: <MessageSquare className="h-4 w-4" />,
        label: t('navigation.feedback.submit')
      }
    ],
    admin: [
      {
        to: "/admin",
        icon: <Settings className="h-4 w-4" />,
        label: t('navigation.admin')
      }
    ]
  };

  const MenuGroup = ({ title, items }: { title: string; items: any[] }) => (
    <div className="space-y-2">
      <h3 className="text-xs uppercase text-gray-500 font-semibold px-4">{title}</h3>
      <div className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-semibold text-primary">
              InvoiceHub
            </Link>
            <div className="flex items-center gap-2">
              <Switch
                checked={profile?.role === "admin"}
                onCheckedChange={handleAdminToggle}
                disabled={isLoading}
                aria-label={t('common.admin.mode')}
              />
              <span className="text-xs text-gray-500">
                {t('common.admin.mode')}
              </span>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {Object.entries(menuItems).map(([group, items]) => (
              <div key={group} className="flex items-center space-x-4">
                {items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Botão Menu Mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16">
          <div className="container mx-auto px-4 py-6 space-y-6">
            <MenuGroup title={t('navigation.records')} items={menuItems.records} />
            <MenuGroup title={t('navigation.user')} items={menuItems.user} />
            <MenuGroup title={t('navigation.admin')} items={menuItems.admin} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;