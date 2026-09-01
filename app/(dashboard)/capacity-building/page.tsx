"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useGetTrainingsQuery,
  useGetTrainingSummaryQuery,
  TrainingStatus,
} from "@/app/redux/dashboard/trainingApi";

const statusStyle: Record<TrainingStatus, string> = {
  TODO: "text-slate-500 font-semibold",
  INPROGRESS: "text-amber-500 font-semibold",
  COMPLETED: "text-emerald-600 font-semibold",
};

const statusLabel: Record<TrainingStatus, string> = {
  TODO: "To-do",
  INPROGRESS: "Inprogress",
  COMPLETED: "Completed",
};

export default function CapacityBuildingPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isFetching } = useGetTrainingsQuery({ page, limit });
  const { data: summary, isLoading: isSummaryLoading } = useGetTrainingSummaryQuery();

  const list = data?.data ?? [];
  const meta = data?.meta;

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");
  const formatDuration = (value: number, unit: string) => `${value}${unit}`;

  const metrics = summary
    ? [
        { title: "Total training request", count: summary.data.totalRequests.toString(), iconBg: "bg-sky-100 text-sky-600" },
        { title: "Total staff trained", count: summary.data.totalStaffTrained.toString(), iconBg: "bg-amber-100 text-amber-600" },
        { title: "Total training done", count: summary.data.totalCompleted.toString(), iconBg: "bg-purple-100 text-purple-600" },
        { title: "Staff training rate", count: `${summary.data.trainingRate}%`, iconBg: "bg-amber-100 text-amber-600" },
      ]
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {isSummaryLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-24 animate-pulse" />
          ))}
        </div>
      ) : (
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
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Training request</h2>
        <Link href="/capacity-building/create">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Make Training Request
          </button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900">All Trainings</h3>

        {isLoading || isFetching ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
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
                {list.length > 0 ? (
                  list.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 font-semibold text-slate-800">{row.description}</td>
                      <td className="py-3.5 text-slate-600">{formatDate(row.startDate)}</td>
                      <td className="py-3.5 text-slate-600">{row.type}</td>
                      <td className="py-3.5 text-slate-800">{formatDuration(row.durationValue, row.durationUnit)}</td>
                      <td className="py-3.5 text-slate-800">{row.mode}</td>
                      <td className={`py-3.5 ${statusStyle[row.status]}`}>{statusLabel[row.status]}</td>
                      <td className="py-3.5">
                        <Link href={`/capacity-building/${row.id}`} className="text-sky-600 font-semibold hover:underline">
                          View more
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No training requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.totalPages > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-colors ${
                  page === p
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}