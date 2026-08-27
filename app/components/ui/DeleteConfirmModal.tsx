// app/components/ui/ConfirmDeleteModal.tsx
"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title = "Delete this item?",
  description,
  itemName,
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-4 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="p-6 pt-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
            <AlertTriangle size={22} className="text-rose-500" />
          </div>

          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 mt-2">
            {description ?? (
              <>
                Are you sure you want to delete{" "}
                {itemName ? <span className="font-semibold text-slate-700">&quot;{itemName}&quot; </span> : "this item"}?
                This action cannot be undone.
              </>
            )}
          </p>
        </div>

        <div className="flex gap-2 border-t border-slate-100 p-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-2 text-sm font-semibold text-slate-600 border border-gray-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            No, cancel
          </button>
          <div className="w-px bg-slate-100" />
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2 text-sm font-semibold text-white hover:bg-rose-600 bg-red-500 rounded-md cursor-pointer transition-colors disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Yes, delete"}
          </button>
        </div>
      </div>
    </div>
  );
};