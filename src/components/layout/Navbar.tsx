import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Users, Package, FileText, MessageSquare, UserCircle, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSwitcher from "./LanguageSwitcher";
import AdminModeSwitch from "./navbar/AdminModeSwitch";
import NavLinks from "./navbar/NavLinks";
import MobileMenu from "./navbar/MobileMenu";
import UserMenu from "./navbar/UserMenu";
import { useAuth } from "@/components/auth/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { t } = useTranslation();
  const { session } = useAuth();

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

  if (!session) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-semibold text-primary">
              InvoiceHub
            </Link>
            <AdminModeSwitch />
          </div>

          <NavLinks />

          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <MobileMenu
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
              menuItems={menuItems}
            />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;