
"use client";

import React from "react";
import { X, LucideIcon, AlertTriangle } from "lucide-react";

interface ConfirmActionModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  confirmColor?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = "Yes",
  cancelLabel = "No",
  icon: Icon = AlertTriangle,
  iconColor = "text-rose-500",
  iconBg = "bg-rose-50",
  confirmColor = "text-rose-500 hover:bg-rose-50",
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="p-6 pt-8 text-center">
          <div className={`mx-auto w-12 h-12 rounded-full ${iconBg} flex items-center justify-center mb-4`}>
            <Icon size={22} className={iconColor} />
          </div>

          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 mt-2">{description}</p>
        </div>

        <div className="flex border-t border-slate-100 p-4 gap-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-2 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <div className="w-px bg-slate-100" />
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-2 text-sm font-semibold cursor-pointer transition-colors disabled:opacity-50 ${confirmColor}`}
          >
            {isLoading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};