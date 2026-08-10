"use client";

import React from "react";
import Link from "next/link";

export default function CreateSalaryDefinitionPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link href="/payroll" className="text-xs font-semibold text-blue-600 hover:underline">
        ← Back
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Create Salary Definition</h1>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Title</label>
              <select className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                <option value="">Select option</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Level</label>
              <select className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                <option value="">Select option</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Basic salary</label>
              <input
                type="text"
                placeholder="Enter amount in Naira"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Allowance</label>
              <input
                type="text"
                placeholder="Enter amount in Naira"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Gross Salary</label>
              <input
                type="text"
                placeholder="Enter amount in Naira"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Deductions</label>
              <input
                type="text"
                placeholder="Enter amount in Naira"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Net Salary</label>
              <input
                type="text"
                placeholder="Enter amount in Naira"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}