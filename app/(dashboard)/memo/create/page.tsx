"use client";

import React from "react";
import Link from "next/link";

export default function CreateMemoPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Memo created");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/memo" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Create Memo</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Grid Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Memo title</label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Sent from</label>
              <input
                type="text"
                readOnly
                value="Otor John"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Sent to</label>
              <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                <option value="">Select option</option>
                <option value="coo">Chief Operations Officer</option>
              </select>
            </div>
          </div>

          {/* Form Grid Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="flex gap-2 items-end md:col-span-1">
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Action</label>
                <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                  <option value="">Select option</option>
                </select>
              </div>
              <button
                type="button"
                className="px-3.5 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Form Grid Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Date</label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Add attachement?</label>
              <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Attachement type</label>
              <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                <option value="">Select type</option>
                <option value="voucher">Payment Voucher</option>
              </select>
            </div>
          </div>

          {/* Memo Body */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Memo body</label>
            <textarea
              rows={5}
              placeholder="Enter subject"
              className="w-full p-3.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
            >
              Attache Payment Voucher
            </button>
            <button
              type="submit"
              className="w-full sm:w-48 py-3 bg-white border border-blue-500 text-blue-600 font-semibold text-xs rounded-xl hover:bg-blue-50 transition-colors"
            >
              Send Memo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}