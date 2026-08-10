"use client";

import React from "react";

export interface CircularDetail {
  id: string;
  sn: string;
  title: string;
  sentFrom: string;
  sentTo: string;
  date: string;
  circularType: "Sent" | "Received";
  message?: string;
}

interface ViewCircularModalProps {
  circular: CircularDetail | null;
  onClose: () => void;
}

export const ViewCircularModal: React.FC<ViewCircularModalProps> = ({
  circular,
  onClose,
}) => {
  if (!circular) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">{circular.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Circular Meta Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div>
            <span className="text-slate-400 block text-[11px]">Sent From</span>
            <span className="font-semibold text-slate-900">{circular.sentFrom}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Sent To</span>
            <span className="font-semibold text-slate-900">{circular.sentTo}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Date</span>
            <span className="font-semibold text-slate-900">{circular.date}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Circular Type</span>
            <span className="font-semibold text-slate-900 inline-flex items-center gap-1">
              {circular.circularType} {circular.circularType === "Sent" ? "↗" : "↙"}
            </span>
          </div>
        </div>

        {/* Circular Body Message */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-400">
            Circular Message
          </h3>
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed min-h-[120px]">
            {circular.message ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
          </div>
        </div>

        {/* Close Action */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};