import { Users, Package, FileText, MessageSquare, UserCircle, CreditCard, BarChart, Wallet, Sliders } from "lucide-react";
import { MenuItems } from "./types";
import { createElement } from "react";

export const createMenuItems = (t: (key: string) => string): MenuItems => ({
  records: [
    {
      to: "/customers",
      icon: createElement(Users, { className: "h-4 w-4" }),
      label: t('navigation.customers')
    },
    {
      to: "/products",
      icon: createElement(Package, { className: "h-4 w-4" }),
      label: t('navigation.products')
    },
    {
      to: "/invoices",
      icon: createElement(FileText, { className: "h-4 w-4" }),
      label: t('navigation.invoices')
    }
  ],
  admin: [
    {
      to: "/admin/customers",
      icon: createElement(Users, { className: "h-4 w-4" }),
      label: "Clientes"
    },
    {
      to: "/admin/plans",
      icon: createElement(CreditCard, { className: "h-4 w-4" }),
      label: "Planos"
    },
    {
      to: "/admin/integrations",
      icon: createElement(Wallet, { className: "h-4 w-4" }),
      label: "Integrações"
    },
    {
      to: "/admin/reports",
      icon: createElement(BarChart, { className: "h-4 w-4" }),
      label: "Relatórios"
    },
    {
      to: "/admin/settings",
      icon: createElement(Sliders, { className: "h-4 w-4" }),
      label: "Configurações"
    }
  ],
  user: [
    {
      to: "/profile",
      icon: createElement(UserCircle, { className: "h-4 w-4" }),
      label: t('navigation.profile')
    },
    {
      to: "/feedback",
      icon: createElement(MessageSquare, { className: "h-4 w-4" }),
      label: t('navigation.feedback.submit')
    }
  ]
});