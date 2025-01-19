import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MenuGroup from "./sidebar/MenuGroup";
import { createMenuItems } from "./sidebar/menuItems";
import AdminModeSwitch from "./navbar/AdminModeSwitch";
import { useAuth } from "@/components/auth/AuthProvider";
import { useProfile } from "@/hooks/use-profile";
import { useSubscription } from "@/hooks/use-subscription";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const { session } = useAuth();
  const { isAdmin } = useProfile();
  const { hasActiveSubscription } = useSubscription();
  const menuItems = createMenuItems(t);

  // Filtrar os itens do menu com base na assinatura
  const filterMenuItems = (items: any[]) => {
    if (isAdmin) return items; // Admins veem todos os itens
    return items.filter(item => !item.requiresSubscription || hasActiveSubscription);
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <Link to="/" className="text-xl text-primary font-semibold hover:text-primary/90 transition-colors">
            InvoiceHub
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 py-6 space-y-6 overflow-y-auto">
        <MenuGroup 
          title={t('navigation.records')} 
          items={filterMenuItems(menuItems.records)} 
          collapsed={collapsed} 
        />
        <MenuGroup 
          title={t('navigation.user')} 
          items={filterMenuItems(menuItems.user)} 
          collapsed={collapsed} 
        />
      </div>
      
      {isAdmin && (
        <div className="mt-auto border-t border-gray-200 bg-gray-50 p-4">
          {!collapsed && (
            <div className="mb-4">
              <AdminModeSwitch />
            </div>
          )}
          <div className="py-2">
            <MenuGroup title="Administração" items={menuItems.admin} collapsed={collapsed} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;