import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Package, 
  FileText, 
  MessageSquare, 
  UserCircle, 
  Settings, 
  AlignLeft,
  CreditCard,
  BarChart,
  Wallet,
  Sliders
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

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
    admin: [
      {
        to: "/admin/customers",
        icon: <Users className="h-4 w-4" />,
        label: "Clientes"
      },
      {
        to: "/admin/plans",
        icon: <CreditCard className="h-4 w-4" />,
        label: "Planos"
      },
      {
        to: "/admin/integrations",
        icon: <Wallet className="h-4 w-4" />,
        label: "Integrações"
      },
      {
        to: "/admin/reports",
        icon: <BarChart className="h-4 w-4" />,
        label: "Relatórios"
      },
      {
        to: "/admin/settings",
        icon: <Sliders className="h-4 w-4" />,
        label: "Configurações"
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
    ]
  };

  const MenuGroup = ({ title, items }: { title: string; items: any[] }) => (
    <div className="space-y-2">
      {!collapsed && (
        <h3 className="text-xs uppercase text-gray-500 font-semibold px-4">{title}</h3>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-light rounded-lg transition-colors",
              location.pathname === item.to && "bg-primary-light text-primary font-medium"
            )}
          >
            {item.icon}
            {!collapsed && item.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {!collapsed && (
          <Link to="/" className="text-xl font-semibold text-primary">
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
        <MenuGroup title={t('navigation.records')} items={menuItems.records} />
        <MenuGroup title="Administração" items={menuItems.admin} />
        <MenuGroup title={t('navigation.user')} items={menuItems.user} />
      </div>
    </div>
  );
};

export default Sidebar;