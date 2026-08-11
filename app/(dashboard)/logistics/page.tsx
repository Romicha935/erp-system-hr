"use client";

import React from "react";
import Link from "next/link";
import { LogisticsMetrics } from "@/app/components/dashboard/logistics/MatricOverview";


interface LogisticsItem {
  id: string;
  sn: string;
  title: string;
  purpose: string;
  amount: string;
  requestedBy: string;
  sentTo: string;
  date: string;
  status: "Pending" | "Approved";
}

const logisticsList: LogisticsItem[] = [
  { id: "1", sn: "01", title: "Request for travel time", purpose: "Training course", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Pending" },
  { id: "2", sn: "02", title: "Request for travel time", purpose: "Vacation", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Pending" },
  { id: "3", sn: "03", title: "Request for travel time", purpose: "Training course", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Approved" },
  { id: "4", sn: "04", title: "Request for travel time", purpose: "Vacation", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Approved" },
  { id: "5", sn: "05", title: "Request for travel time", purpose: "Vacation", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Approved" },
  { id: "6", sn: "06", title: "Request for travel time", purpose: "Vacation", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Approved" },
  { id: "7", sn: "07", title: "Request for travel time", purpose: "Training course", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Approved" },
  { id: "8", sn: "08", title: "Request for travel time", purpose: "Training course", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Approved" },
  { id: "9", sn: "09", title: "Request for travel time", purpose: "Vacation", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Approved" },
  { id: "10", sn: "10", title: "Request for travel time", purpose: "Training course", amount: "360,000.00", requestedBy: "Otor John Stephen", sentTo: "Hassana Husseini", date: "21/11/2022", status: "Approved" },
];

export default function LogisticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Metric Cards */}
      <LogisticsMetrics />

      {/* Banner Action Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Logistics request</h2>
        <Link href="/logistics/create">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Make Logistics Request
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900">All Logistics Request</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 min-w-[40px]">S/N</th>
                <th className="pb-3 min-w-[180px]">Title</th>
                <th className="pb-3 min-w-[120px]">Purpose</th>
                <th className="pb-3 min-w-[110px]">Amount</th>
                <th className="pb-3 min-w-[150px]">Requested By</th>
                <th className="pb-3 min-w-[150px]">Sent to</th>
                <th className="pb-3 min-w-[100px]">Date</th>
                <th className="pb-3 min-w-[90px]">Status</th>
                <th className="pb-3 text-right min-w-[80px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              {logisticsList.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 text-slate-400">{row.sn}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{row.title}</td>
                  <td className="py-3.5 text-slate-600">{row.purpose}</td>
                  <td className="py-3.5 text-slate-800 font-semibold">{row.amount}</td>
                  <td className="py-3.5 text-slate-600">{row.requestedBy}</td>
                  <td className="py-3.5 text-slate-600">{row.sentTo}</td>
                  <td className="py-3.5 text-slate-600">{row.date}</td>
                  <td className="py-3.5 font-semibold">
                    <span className={row.status === "Pending" ? "text-amber-500" : "text-emerald-600"}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link href={`/logistics/${row.id}`} className="text-blue-600 font-semibold hover:underline">
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