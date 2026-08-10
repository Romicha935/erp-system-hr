"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PaymentVoucher } from "@/app/types/payments";


const mockVouchers: PaymentVoucher[] = Array(12).fill({
  id: "1",
  sn: "01",
  subject: "Request for FARS for October 2022",
  date: "05/12/2022",
  preparedBy: "Otor John",
  sendTo: "Abubakar Sadiq",
});

export default function PaymentPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">250</h2>
          <p className="text-xs text-slate-400 font-medium">Total payment vouchers</p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700"
          >
            <option value="All">All memos</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>

          <Link href="/payments/create">
            <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90">
              Create Payment Voucher
            </button>
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">All Payment Vouchers</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3">S/N</th>
                <th className="pb-3">Subject</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Prepared By</th>
                <th className="pb-3">Send To</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
              {mockVouchers.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3.5 text-slate-400">{item.sn}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{item.subject}</td>
                  <td className="py-3.5 text-slate-500">{item.date}</td>
                  <td className="py-3.5">{item.preparedBy}</td>
                  <td className="py-3.5">{item.sendTo}</td>
                  <td className="py-3.5 text-right">
                    <Link href={`/payments/${item.id}`} className="text-blue-600 font-semibold hover:underline">
                      View more
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}