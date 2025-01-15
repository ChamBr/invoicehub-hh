import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  Package, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  UserCircle,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Atualiza o título da página
  useEffect(() => {
    const pageTitles: { [key: string]: string } = {
      "/": "Dashboard",
      "/customers": "Customers",
      "/products": "Products",
      "/invoices": "Invoices",
      "/plans": "Plans",
      "/feedback": "Feedback",
      "/profile": "Profile"
    };
    document.title = `InvoiceHub - ${pageTitles[location.pathname] || ""}`;
  }, [location]);

  const menuItems = {
    records: [
      {
        to: "/customers",
        icon: <Users className="h-4 w-4" />,
        label: "Clientes"
      },
      {
        to: "/products",
        icon: <Package className="h-4 w-4" />,
        label: "Produtos"
      },
      {
        to: "/invoices",
        icon: <FileText className="h-4 w-4" />,
        label: "Faturas"
      }
    ],
    services: [
      {
        to: "/plans",
        icon: <CreditCard className="h-4 w-4" />,
        label: "Planos"
      },
      {
        to: "/feedback",
        icon: <MessageSquare className="h-4 w-4" />,
        label: "Feedback"
      }
    ],
    user: [
      {
        to: "/profile",
        icon: <UserCircle className="h-4 w-4" />,
        label: "Perfil"
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
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-primary">
              InvoiceHub
            </Link>
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
          </div>

          {/* Botão Menu Mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
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

      {/* Menu Mobile */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16">
          <div className="container mx-auto px-4 py-6 space-y-6">
            <MenuGroup title="Records" items={menuItems.records} />
            <MenuGroup title="Services" items={menuItems.services} />
            <MenuGroup title="User" items={menuItems.user} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
