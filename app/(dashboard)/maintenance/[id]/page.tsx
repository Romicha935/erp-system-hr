"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function MaintenanceDetailsPage() {
  const [status, setStatus] = useState("Completed");

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Back Button */}
      <Link href="/maintenance" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      {/* Top Details Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Scheduled Maintenance</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-medium block mb-1">Item name</span>
            <span className="font-bold text-slate-900">2Hp Hisense Air Condition</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Number</span>
            <span className="font-bold text-slate-900">3</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Date</span>
            <span className="font-bold text-slate-900">18/11/2022</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Maintenance type</span>
            <span className="font-bold text-slate-900">Recurring</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Recurring type</span>
            <span className="font-bold text-slate-900">Every two months</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-emerald-600 font-bold bg-transparent outline-none cursor-pointer"
            >
              <option value="Completed">Completed ∨</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Attach Payment Invoice
          </button>
        </div>
      </div>

      {/* Bottom Breakdown Placeholder Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm min-h-[300px] flex flex-col justify-between">
        <h2 className="text-base font-bold text-slate-900">Maintenance Breakdown</h2>

        {/* Custom Section */}
        <div className="py-12 text-center">
          <p className="text-slate-400 text-sm font-semibold">Breakdown details will be rendered here.</p>
        </div>

        <div>
          <button className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}