"use client";

import React from "react";
import Link from "next/link";

interface TrainingItem {
  id: string;
  sn: string;
  description: string;
  startDate: string;
  type: string;
  duration: string;
  mode: string;
  status: "Inprogress" | "To-do" | "Completed";
}

const metrics = [
  { title: "Total training request", count: "350", iconBg: "bg-sky-100 text-sky-600" },
  { title: "Total staff trained", count: "800", iconBg: "bg-amber-100 text-amber-600" },
  { title: "Total training done", count: "300", iconBg: "bg-purple-100 text-purple-600" },
  { title: "Staff training rate", count: "70%", iconBg: "bg-amber-100 text-amber-600" },
];

const trainingList: TrainingItem[] = [
  { id: "1", sn: "01", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Team", duration: "3days", mode: "Physical", status: "Inprogress" },
  { id: "2", sn: "02", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Team", duration: "2weeks", mode: "Online", status: "To-do" },
  { id: "3", sn: "03", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Team", duration: "3days", mode: "Physical", status: "Completed" },
  { id: "4", sn: "04", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Team", duration: "3days", mode: "Physical", status: "Completed" },
  { id: "5", sn: "05", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Individual", duration: "1week", mode: "Online", status: "Completed" },
  { id: "6", sn: "06", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Team", duration: "5days", mode: "Physical", status: "Completed" },
  { id: "7", sn: "07", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Team", duration: "3days", mode: "Physical", status: "Completed" },
  { id: "8", sn: "08", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Team", duration: "2days", mode: "Online", status: "Completed" },
  { id: "9", sn: "09", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Team", duration: "1month", mode: "Physical", status: "Completed" },
  { id: "10", sn: "10", description: "Staff Health and Safety Training", startDate: "03/12/2022", type: "Team", duration: "3weeks", mode: "Physical", status: "Completed" },
];

export default function CapacityBuildingPage() {
  const getStatusStyle = (status: TrainingItem["status"]) => {
    switch (status) {
      case "Inprogress": return "text-amber-500 font-semibold";
      case "To-do": return "text-slate-500 font-semibold";
      case "Completed": return "text-emerald-600 font-semibold";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{item.count}</h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.title}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${item.iconBg}`}>
              🧠
            </div>
          </div>
        ))}
      </div>

      {/* Banner Action Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Training request</h2>
        <Link href="/capacity-building/create">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Make Training Request
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900">All Trainings</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 min-w-[40px]">S/N</th>
                <th className="pb-3 min-w-[200px]">Training Description</th>
                <th className="pb-3 min-w-[100px]">Start Date</th>
                <th className="pb-3 min-w-[100px]">Training Type</th>
                <th className="pb-3 min-w-[100px]">Duration</th>
                <th className="pb-3 min-w-[100px]">Training Mode</th>
                <th className="pb-3 min-w-[100px]">Status</th>
                <th className="pb-3 min-w-[90px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              {trainingList.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 text-slate-400">{row.sn}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{row.description}</td>
                  <td className="py-3.5 text-slate-600">{row.startDate}</td>
                  <td className="py-3.5 text-slate-600">{row.type}</td>
                  <td className="py-3.5 text-slate-800">{row.duration}</td>
                  <td className="py-3.5 text-slate-800">{row.mode}</td>
                  <td className={`py-3.5 ${getStatusStyle(row.status)}`}>{row.status}</td>
                  <td className="py-3.5">
                    <Link href={`/capacity-building/${row.id}`} className="text-sky-600 font-semibold hover:underline">
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