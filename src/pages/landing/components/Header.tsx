import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-white border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary">InvoiceHub</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/login">
            <Button>Começar Grátis</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};