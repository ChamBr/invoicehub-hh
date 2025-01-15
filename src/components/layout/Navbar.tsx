import { Link } from "react-router-dom";
import { Users, Package } from "lucide-react";

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
          <div className="flex items-center space-x-4">
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
              Produtos/Serviços
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;