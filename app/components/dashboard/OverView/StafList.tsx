"use client";

import React from "react";
import { Card } from "@/app/components/ui/card";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";

export const StaffListSection = () => {
  const { data, isLoading } = useGetStaffQuery({ limit: 4 });
  const staffList = data?.data ?? [];

  return (
    <Card title="Staff List" className="overflow-x-auto">
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold">
              <th className="pb-3">Staff Name</th>
              <th className="pb-3">Staff Role</th>
              <th className="pb-3">Designation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
            {staffList.length > 0 ? (
              staffList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-semibold text-slate-800">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="py-3">{item.role}</td>
                  <td className="py-3 text-slate-500">{item.designation ?? "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-6 text-center text-slate-400">
                  No staff yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </Card>
  );
};