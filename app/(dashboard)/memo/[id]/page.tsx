"use client";

import React, { use } from "react";
import Link from "next/link";

export default function ViewMemoDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Back Button */}
      <Link href="/memo" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Operations Memo</h1>

        {/* Memo Meta Details Grid */}
        <div className="space-y-2 text-xs text-slate-700 font-medium leading-relaxed">
          <p><strong className="text-slate-900 min-w-[100px] inline-block">Date:</strong> 21/12/2022</p>
          <p><strong className="text-slate-900 min-w-[100px] inline-block">From:</strong> Otor John Stephen</p>
          <p><strong className="text-slate-900 min-w-[100px] inline-block">To:</strong> Abubakr Algazali</p>
          <p><strong className="text-slate-900 min-w-[100px] inline-block">CC1:</strong> Fatimah Mohammed</p>
          <p><strong className="text-slate-900 min-w-[100px] inline-block">CC2:</strong> Sadiq Lukman</p>
          <p><strong className="text-slate-900 min-w-[100px] inline-block">CC3:</strong> Jemz Nweke Jnr.</p>
          <p><strong className="text-slate-900 min-w-[100px] inline-block">Attachment:</strong> No</p>
          <p className="pt-2">
            <strong className="text-slate-900">Memo Message:</strong> Lorem ipsum dolor sit amet consectetur. Purus lacinia pulvinar morbi praesent egestas senectus non neque sem. Fermentum mi ipsum dictumst ultricies mollis. Amet praesent convallis vivamus rhoncus. Volutpat sit aliquet elementum facilisi consectetur.
          </p>
        </div>

        <hr className="border-slate-200" />

        {/* Attachment / Document Preview Container */}
        <div className="p-4 sm:p-8 border border-slate-200 rounded-xl bg-slate-50/30 max-w-3xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-blue-600 font-bold text-base">Relia Energy</div>
            <div className="text-[10px] text-slate-500 text-right leading-tight">
              RC NO: 1667068<br />
              TIN: 22393869-0001
            </div>
          </div>

          <div className="text-[11px] text-slate-600 space-y-1">
            <p className="font-semibold">INVOICE NUMBER:</p>
            <p>Bill to: THE MANAGING DIRECTOR, NNPC E & P LIMITED</p>
          </div>

          {/* Embedded Invoice Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-slate-200/60 font-bold border-b border-slate-300">
                  <th className="p-2">S/N</th>
                  <th className="p-2">ITEM</th>
                  <th className="p-2">QUANTITY</th>
                  <th className="p-2">RATE</th>
                  <th className="p-2 text-right">AMOUNT (NGN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr><td className="p-2">1</td><td className="p-2">ITEM 1</td><td className="p-2">50</td><td className="p-2">11,000</td><td className="p-2 text-right">₦550,000.00</td></tr>
                <tr><td className="p-2">2</td><td className="p-2">ITEM 2</td><td className="p-2">45</td><td className="p-2">10,500</td><td className="p-2 text-right">₦472,500.00</td></tr>
                <tr className="font-bold bg-slate-100">
                  <td colSpan={4} className="p-2">GRAND TOTAL</td>
                  <td className="p-2 text-right">₦2,690,187.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Action Status Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-800">
          <p><span className="text-slate-500 font-normal block">Action:</span> Recommended for approval</p>
          <p><span className="text-slate-500 font-normal block">By:</span> Fatimah Mohammed</p>
          <p><span className="text-slate-500 font-normal block">Signature:</span> —</p>
        </div>

        {/* Bottom Approval Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Action</label>
            <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
              <option value="">Select action</option>
              <option value="approve">Approve</option>
              <option value="reject">Reject</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Remarks</label>
            <input
              type="text"
              placeholder="Enter remark"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="button"
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