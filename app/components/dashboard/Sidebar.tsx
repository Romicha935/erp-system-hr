"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import {
  Bell,
  BriefcaseBusiness,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboardIcon,
  Megaphone,
  Package,
  ShoppingCart,
  Truck,
  User,
  WalletCards,
  Wrench,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboardIcon size={18} /> },
  { name: "Staff", href: "/staff", icon: <User size={18} /> },
  { name: "Payment Voucher", href: "/payments", icon: <WalletCards size={18} /> },
  { name: "Payroll", href: "/payroll", icon: <CreditCard size={18} /> },
  { name: "Memo", href: "/memo", icon: <FileText size={18} /> },
  { name: "Circulars", href: "/circulars", icon: <Megaphone size={18} /> },
  { name: "Maintenance", href: "/maintenance", icon: <Wrench size={18} /> },
  { name: "Logistics", href: "/logistics", icon: <Truck size={18} /> },
  { name: "Office Budget", href: "/budget", icon: <BriefcaseBusiness size={18} /> },
  { name: "Stocks and Inventory", href: "/inventory", icon: <Package size={18} /> },
  { name: "Notifications", href: "/notifications", icon: <Bell size={18} /> },
  { name: "Capacity Building", href: "/capacity-building", icon: <GraduationCap size={18} /> },
  { name: "Procurements", href: "/procurement", icon: <ShoppingCart size={18} /> },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-[1px] md:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 md:z-0 h-screen w-64 shrink-0 bg-white border-r border-slate-100 flex flex-col py-6 px-4 transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
              <img src="/logoo.png" alt="Logo" className="h-8 w-8 object-contain" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">ERP System</p>
              <p className="text-[11px] font-medium text-slate-400">HR Management</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};