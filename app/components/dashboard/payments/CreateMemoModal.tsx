"use client";

import React from "react";

interface CreateMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export  const CreateMemoModal: React.FC<CreateMemoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Create Memo</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Memo title</label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Send to</label>
              <select className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none bg-white">
                <option value="">Select option</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">CC1</label>
              <select className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none bg-white">
                <option value="">Select option</option>
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-700 block mb-1">CC 1 action</label>
                <select className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none bg-white">
                  <option value="">Select option</option>
                </select>
              </div>
              <button className="h-9 w-9 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200">
                +
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Date</label>
            <input
              type="date"
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Memo body</label>
            <textarea
              rows={3}
              placeholder="Enter title"
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none"
            />
          </div>

          {/* Attachment */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Attachment</label>
            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700">
              <span>📄</span>
              <span className="truncate">REQUEST FOR FARS FOR OCTOBER 2022 IFO GRM CONSULTING LTD</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity mt-4"
          >
            Send Memo
          </button>
        </div>
      </div>
    </div>
  );
};