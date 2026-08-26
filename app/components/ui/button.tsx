import { cn } from "@/app/lib/utils";
import React, { ButtonHTMLAttributes, forwardRef } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant = "primary", size = "md", isLoading = false, disabled, ...props },
    ref
  ) => {
    const variants = {
     
      primary: "bg-gradient-to-r from-[#20A0E5] to-[#1F62B8] text-white hover:from-[#1F95D1] hover:to-[#1950A5] disabled:from-[#A8DDF7] disabled:to-[#A7C8E8]",
      secondary: "bg-slate-800 text-white hover:bg-slate-900",
      outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
      danger: "bg-rose-600 text-white hover:bg-rose-700",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-full",
      md: "px-6 py-3 text-base rounded-full", 
      lg: "px-8 py-4 text-lg rounded-full",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-md animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";