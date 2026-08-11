"use client";

import React from "react";
import Link from "next/link";

interface ProcurementItem {
  id: string;
  sn: string;
  item: string;
  qty: number;
  amount: string;
  requestedBy: string;
  sentTo: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

const metrics = [
  { title: "Total request made", count: "350", change: "↑ 50 more than last year", iconBg: "bg-sky-100 text-sky-600" },
  { title: "Total cost incurred", count: "8,000,000", iconBg: "bg-purple-100 text-purple-600" },
  { title: "Pending request", count: "20", iconBg: "bg-amber-100 text-amber-600" },
  { title: "Approved request", count: "330", change: "↓ 2% more than last year", iconBg: "bg-emerald-100 text-emerald-600" },
];

const procurementList: ProcurementItem[] = [
  { id: "1", sn: "01", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Pending" },
  { id: "2", sn: "02", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Pending" },
  { id: "3", sn: "03", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Approved" },
  { id: "4", sn: "04", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Approved" },
  { id: "5", sn: "05", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Approved" },
  { id: "6", sn: "06", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Approved" },
  { id: "7", sn: "07", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Approved" },
  { id: "8", sn: "08", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Approved" },
  { id: "9", sn: "09", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Approved" },
  { id: "10", sn: "10", item: "Office chairs", qty: 20, amount: "360,000.00", requestedBy: "Otor John", sentTo: "Faruk Hashim", date: "21/11/2022", status: "Approved" },
];

export default function ProcurementPage() {
  const getStatusStyle = (status: ProcurementItem["status"]) => {
    switch (status) {
      case "Pending": return "text-amber-500 font-semibold";
      case "Approved": return "text-emerald-600 font-semibold";
      case "Rejected": return "text-rose-600 font-semibold";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{item.count}</h2>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.title}</p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${item.iconBg}`}>
                🛍️
              </div>
            </div>
            {item.change && (
              <p className={`text-[10px] font-medium mt-3 ${item.change.startsWith("↑") ? "text-emerald-600" : "text-rose-500"}`}>
                {item.change}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Banner Action Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Procurement request</h2>
        <Link href="/procurement/create">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Make Procurement Request
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900">Procurement Request</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 min-w-[40px]">S/N</th>
                <th className="pb-3 min-w-[150px]">Item</th>
                <th className="pb-3 min-w-[60px]">Qty</th>
                <th className="pb-3 min-w-[120px]">Amount</th>
                <th className="pb-3 min-w-[120px]">Requested By</th>
                <th className="pb-3 min-w-[120px]">Sent to</th>
                <th className="pb-3 min-w-[100px]">Date</th>
                <th className="pb-3 min-w-[90px]">Status</th>
                <th className="pb-3 min-w-[80px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              {procurementList.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 text-slate-400">{row.sn}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{row.item}</td>
                  <td className="py-3.5 text-slate-600">{row.qty}</td>
                  <td className="py-3.5 text-slate-800">{row.amount}</td>
                  <td className="py-3.5 text-slate-600">{row.requestedBy}</td>
                  <td className="py-3.5 text-slate-600">{row.sentTo}</td>
                  <td className="py-3.5 text-slate-600">{row.date}</td>
                  <td className={`py-3.5 ${getStatusStyle(row.status)}`}>{row.status}</td>
                  <td className="py-3.5">
                    <Link href={`/procurement/${row.id}`} className="text-sky-600 font-semibold hover:underline">
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