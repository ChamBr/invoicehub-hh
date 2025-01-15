import { Link } from "react-router-dom";
import { Users, Package, FileText, CreditCard, MessageSquare, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-primary">
              InvoiceHub
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/customers"
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Clientes
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Produtos
            </Link>
            <Link
              to="/invoices"
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <FileText className="h-4 w-4" />
              Faturas
            </Link>
            <Link
              to="/plans"
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <CreditCard className="h-4 w-4" />
              Planos
            </Link>
            <Link
              to="/feedback"
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <MessageSquare className="h-4 w-4" />
              Feedback
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <UserCircle className="h-4 w-4" />
              Perfil
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;