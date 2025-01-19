import { ReactNode } from "react";

export interface MenuItem {
  to: string;
  icon: ReactNode;
  label: string;
  requiresSubscription?: boolean;
}

export interface MenuItems {
  records: MenuItem[];
  admin: MenuItem[];
  user: MenuItem[];
}