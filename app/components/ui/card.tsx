import { cn } from "@/app/lib/utils";
import React from "react";


interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, title }) => {
  return (
    <div className={cn("bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-sm", className)}>
      {title && <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>}
      {children}
    </div>
  );
};