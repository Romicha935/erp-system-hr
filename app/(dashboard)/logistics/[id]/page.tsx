"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LogisticsDetailsPage() {
  const [action, setAction] = useState("");
  const [remark, setRemark] = useState("");

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <Link href="/logistics" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Request For Travel Time</h1>

        {/* Info Grid */}
        <div className="space-y-2 text-xs text-slate-700">
          <p><span className="font-bold text-slate-900">Purpose:</span> Training course</p>
          <p><span className="font-bold text-slate-900">Amount:</span> ₦360,000.00</p>
          <p><span className="font-bold text-slate-900">From:</span> Otor John Stephen</p>
          <p><span className="font-bold text-slate-900">To:</span> Fatimah Mohammed</p>
          <p><span className="font-bold text-slate-900">Duration:</span> 4 days - (21/12/2022 - 24/12/2022)</p>
          <p><span className="font-bold text-slate-900">Status:</span> <span className="text-amber-500 font-semibold">Pending</span></p>
          <p><span className="font-bold text-slate-900">Attachment:</span> Yes</p>
        </div>

        <hr className="border-slate-100 my-4" />

        {/* Invoice / Document Preview Section */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/30">
          <div className="bg-white p-6 rounded-lg border border-slate-200 max-w-2xl mx-auto space-y-4 text-[11px] text-slate-800">
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <span className="font-black text-sky-600 text-base block">RE Relia Energy</span>
              </div>
              <div className="text-right space-y-0.5">
                <p>RC NO: 1667068</p>
                <p>TIN: 22393959-0001</p>
                <p className="font-bold">INVOICE NUMBER: RE/2022/102</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="bg-slate-50 p-3 rounded-lg border">
              <p className="font-bold text-slate-900">Bill to:</p>
              <p>THE MANAGING DIRECTOR,</p>
              <p>NNPC E & P LIMITED</p>
            </div>

            {/* Invoice Table */}
            <table className="w-full border-collapse border border-slate-200 text-left">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border p-1.5">S/N</th>
                  <th className="border p-1.5">DESCRIPTION</th>
                  <th className="border p-1.5">QTY</th>
                  <th className="border p-1.5">RATE</th>
                  <th className="border p-1.5">AMOUNT (NGN)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-1.5">1</td>
                  <td className="border p-1.5">Personnel Rate</td>
                  <td className="border p-1.5">50</td>
                  <td className="border p-1.5">11,000</td>
                  <td className="border p-1.5 font-semibold">₦550,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Approval Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4">
          <div className="md:col-span-4">
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Action</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            >
              <option value="">Select action</option>
              <option value="Approve">Approve</option>
              <option value="Reject">Reject</option>
            </select>
          </div>

          <div className="md:col-span-5">
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Remarks</label>
            <input
              type="text"
              placeholder="Enter remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="md:col-span-3">
            <button className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}