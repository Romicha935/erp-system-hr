"use client";

import { cn } from "@/app/lib/utils";
import React, { InputHTMLAttributes, forwardRef, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = "text", className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";

    // Password field true hole show/hide type toggle hbe
    const inputType = isPasswordType
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full px-4 py-3 text-sm bg-white border border-slate-400 rounded-md outline-none transition-all duration-200 text-slate-900 placeholder:text-slate-400",
              "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
              "disabled:bg-slate-50 disabled:text-slate-400",
              isPasswordType && "pr-11", // Password icon er jonno right padding
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-100",
              className
            )}
            {...props}
          />

          {/* Show / Hide Password Toggle Icon */}
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors p-1"
              tabIndex={-1}
            >
              {showPassword ? (
                // Eye Off Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                  <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                  <line x1="2" x2="22" y1="2" y2="22"/>
                </svg>
              ) : (
                // Eye Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          )}
        </div>

        {error && <span className="text-xs text-rose-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";