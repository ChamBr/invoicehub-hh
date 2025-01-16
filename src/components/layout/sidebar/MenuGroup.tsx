import { cn } from "@/lib/utils";
import { MenuItem } from "./types";
import { Link, useLocation } from "react-router-dom";

interface MenuGroupProps {
  title: string;
  items: MenuItem[];
  collapsed: boolean;
}

const MenuGroup = ({ title, items, collapsed }: MenuGroupProps) => {
  const location = useLocation();

  return (
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
};

export default MenuGroup;