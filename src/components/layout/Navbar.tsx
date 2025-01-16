import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import UserMenu from "./navbar/UserMenu";

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { session } = useAuth();

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
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                {location.pathname === "/" ? "Dashboard" : t(`navigation${location.pathname}`)}
              </h1>
              <p className="text-sm text-gray-500">
                {location.pathname === "/" ? t('dashboard.welcome') : t('common.navigation.description')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;