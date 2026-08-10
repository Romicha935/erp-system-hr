"use client";

import React from "react";
import Link from "next/link";

export default function CreateTaxDefinitionPage() {
  return (
    <div className="p-6 space-y-6">
      <Link
        href="/payroll"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">
          Create Tax Definition
        </h1>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Tax type
              </label>

              <input
                type="text"
                placeholder="Enter tax name"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                % value
              </label>

              <input
                type="text"
                placeholder="Enter % value"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-64 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}