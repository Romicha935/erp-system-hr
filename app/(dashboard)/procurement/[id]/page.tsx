"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ProcurementDetail() {
  const [action, setAction] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    console.log("Action Submitted:", { action, remarks });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/procurement" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-lg font-bold text-slate-900">Procurement Request Detail</h1>

        {/* Key-Value Details */}
        <div className="space-y-3 text-xs text-slate-700">
          <p><span className="font-bold text-slate-900">Item:</span> Office Chairs</p>
          <p><span className="font-bold text-slate-900">Quantity:</span> 10</p>
          <p><span className="font-bold text-slate-900">Unit Price:</span> ₦360,000.00</p>
          <p><span className="font-bold text-slate-900">Total Price:</span> ₦360,000.00</p>
          <p><span className="font-bold text-slate-900">Date:</span> 21/12/2022</p>
          <p><span className="font-bold text-slate-900">Requested By:</span> Otor John Stephen</p>
          <p><span className="font-bold text-slate-900">Sent To:</span> Fatima Mohammed</p>
          <p><span className="font-bold text-slate-900">Request Status:</span> <span className="text-amber-500 font-semibold">Pending</span></p>
          <p><span className="font-bold text-slate-900">Attachment:</span> Yes</p>
        </div>

        <hr className="border-slate-200 my-6" />

        {/* Invoice Document Preview Placeholder */}
        <div className="p-6 border border-slate-200 rounded-xl bg-slate-50/30 max-w-2xl mx-auto font-sans text-xs text-slate-800 space-y-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="w-12 h-12 bg-sky-600 text-white font-black flex items-center justify-center rounded-lg text-lg">RE</div>
              <p className="font-bold text-sky-700 text-sm mt-1">Relia Energy</p>
            </div>
            <div className="text-right text-[10px] space-y-0.5 text-slate-600">
              <p><span className="font-bold text-slate-800">RC NO:</span> 1667058</p>
              <p><span className="font-bold text-slate-800">TIN:</span> 22393959-0001</p>
              <p><span className="font-bold text-slate-800">CONTRACT:</span> Contract for The Provision of Field Management</p>
              <p><span className="font-bold text-slate-800">INVOICE NUMBER:</span> ---</p>
            </div>
          </div>

          <div className="text-[10px] space-y-1">
            <p className="text-slate-500">20th October, 2022</p>
            <div className="p-2 border border-slate-300 rounded bg-white w-56">
              <p className="font-bold">Bill to:</p>
              <p>THE MANAGING DIRECTOR,</p>
              <p>NNPC E & P LIMITED</p>
              <p>OGBA ROAD, P.M.B 1262, BENIN CITY</p>
            </div>
          </div>

          <table className="w-full text-[10px] border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 p-1">S/N</th>
                <th className="border border-slate-300 p-1">DESCRIPTION</th>
                <th className="border border-slate-300 p-1">QTY</th>
                <th className="border border-slate-300 p-1">RATE</th>
                <th className="border border-slate-300 p-1">AMOUNT (NGN)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 p-1 text-center">1</td>
                <td className="border border-slate-300 p-1">ITEM 1</td>
                <td className="border border-slate-300 p-1 text-center">50</td>
                <td className="border border-slate-300 p-1 text-right">11,000</td>
                <td className="border border-slate-300 p-1 text-right">₦550,000.00</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-1 text-center">2</td>
                <td className="border border-slate-300 p-1">ITEM 1</td>
                <td className="border border-slate-300 p-1 text-center">45</td>
                <td className="border border-slate-300 p-1 text-right">10,500</td>
                <td className="border border-slate-300 p-1 text-right">₦472,500.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="border-slate-200 my-6" />

        {/* Action Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
          <div>
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

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Remarks</label>
            <input
              type="text"
              placeholder="Enter remark"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}