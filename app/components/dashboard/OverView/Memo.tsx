"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/app/components/ui/card";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { useGetMemosQuery } from "@/app/redux/dashboard/memosApi";


export const MemoSection = () => {
  const { data, isLoading } = useGetMemosQuery({ limit: 4 });
  const memos = data?.data ?? [];

  return (
    <Card title="Memo" className="overflow-x-auto">
      {isLoading ? (
        <div className="space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold">
              <th className="pb-3">Memo Title</th>
              <th className="pb-3">Sent From</th>
              <th className="pb-3">Sent To</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className=" text-slate-700 font-medium">
            {memos.length > 0 ? (
              memos.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-semibold text-slate-800">
                    <Link href={`/memo/${item.id}`} className="hover:text-blue-600">
                      {item.title}
                    </Link>
                  </td>
                  <td className="py-1">{item.sender.email}</td>
                  <td className="py-1">
                    {item.receiver.firstName} {item.receiver.lastName}
                  </td>
                  <td className="py-1 text-right">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">
                  No memos yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </Card>
  );
};