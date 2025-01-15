import { Menu, X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  menuItems: {
    [key: string]: {
      to: string;
      icon: JSX.Element;
      label: string;
    }[];
  };
}

const MobileMenu = ({ isOpen, onToggle, menuItems }: MobileMenuProps) => {
  const { t } = useTranslation();

  const MenuGroup = ({ title, items }: { title: string; items: any[] }) => (
    <div className="space-y-2">
      <h3 className="text-xs uppercase text-gray-500 font-semibold px-4">{title}</h3>
      <div className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
            onClick={onToggle}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <button
        className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
        onClick={onToggle}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16">
          <div className="container mx-auto px-4 py-6 space-y-6">
            <MenuGroup title={t('navigation.records')} items={menuItems.records} />
            <MenuGroup title={t('navigation.user')} items={menuItems.user} />
            <MenuGroup title={t('navigation.admin')} items={menuItems.admin} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;