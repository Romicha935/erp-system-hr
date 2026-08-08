"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { LayoutDashboard, Users } from "lucide";
import { Bell, BriefcaseBusiness, CreditCard, FileText, GraduationCap, LayoutDashboardIcon, Megaphone, Package, ShoppingCart, Truck, User, WalletCards, Wrench } from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    name: "Staff",
    href: "/staff",
    icon: <User />,
  },
  {
    name: "Payment Voucher",
    href: "/vouchers",
    icon: <WalletCards />,
  },
  {
    name: "Payroll",
    href: "/payroll",
    icon: <CreditCard />,
  },
  {
    name: "Memo",
    href: "/memo",
    icon: <FileText />,
  },
  {
    name: "Circulars",
    href: "/circulars",
    icon: <Megaphone />,
  },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: <Wrench />,
  },
  {
    name: "Logistics",
    href: "/logistics",
    icon: <Truck />,
  },
  {
    name: "Office Budget",
    href: "/budget",
    icon: <BriefcaseBusiness />,
  },
  {
    name: "Stocks and Inventory",
    href: "/inventory",
    icon: <Package />,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: <Bell />,
  },
  {
    name: "Capacity Building",
    href: "/capacity",
    icon: <GraduationCap />,
  },
  {
    name: "Procurements",
    href: "/procurements",
    icon: <ShoppingCart />,
  },
];



export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside className="w-64 bg-white min-h-screen border-r border-slate-100 flex flex-col py-6 px-4 shrink-0 hidden lg:flex">
      {/* Brand Logo */}
      <div className="flex flex-col items-center gap-2 px-3 mb-8">
        <img src="/logo.png" alt="" className="h-10 w-10" />
        <div>
          <span className="text-lg font-bold text-blue-600 leading-none block">UiUxOtor</span>
          <span className="text-base text-slate-900 font-medium">ERP System</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.name)}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};