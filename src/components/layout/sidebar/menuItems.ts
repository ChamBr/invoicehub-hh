import { Users, Package, FileText, MessageSquare, UserCircle, CreditCard, BarChart, Wallet, Sliders, Building, Receipt } from "lucide-react";
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
  user: [
    {
      to: "/profile",
      icon: createElement(UserCircle, { className: "h-4 w-4" }),
      label: t('navigation.profile')
    },
    {
      to: "/profile/company",
      icon: createElement(Building, { className: "h-4 w-4" }),
      label: t('navigation.company')
    },
    {
      to: "/profile/invoice-settings",
      icon: createElement(Receipt, { className: "h-4 w-4" }),
      label: t('navigation.invoice_settings')
    },
    {
      to: "/feedback",
      icon: createElement(MessageSquare, { className: "h-4 w-4" }),
      label: t('navigation.feedback.submit')
    }
  ],
  admin: [
    {
      to: "/admin/subscribers",
      icon: createElement(Users, { className: "h-4 w-4" }),
      label: t('navigation.admin.subscribers')
    },
    {
      to: "/admin/plans",
      icon: createElement(CreditCard, { className: "h-4 w-4" }),
      label: t('navigation.admin.plans')
    },
    {
      to: "/admin/integrations",
      icon: createElement(Wallet, { className: "h-4 w-4" }),
      label: t('navigation.admin.integrations')
    },
    {
      to: "/admin/reports",
      icon: createElement(BarChart, { className: "h-4 w-4" }),
      label: t('navigation.admin.reports')
    },
    {
      to: "/admin/settings",
      icon: createElement(Sliders, { className: "h-4 w-4" }),
      label: t('navigation.admin.settings')
    }
  ]
});