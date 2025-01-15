import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Users, Package, FileText, MessageSquare, UserCircle, Settings } from "lucide-react";

const NavLinks = () => {
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

  return (
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
    </div>
  );
};

export default NavLinks;