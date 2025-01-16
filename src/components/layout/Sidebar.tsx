import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MenuGroup from "./sidebar/MenuGroup";
import { createMenuItems } from "./sidebar/menuItems";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const menuItems = createMenuItems(t);

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
        <MenuGroup title={t('navigation.records')} items={menuItems.records} collapsed={collapsed} />
        <MenuGroup title="Administração" items={menuItems.admin} collapsed={collapsed} />
        <MenuGroup title={t('navigation.user')} items={menuItems.user} collapsed={collapsed} />
      </div>
    </div>
  );
};

export default Sidebar;