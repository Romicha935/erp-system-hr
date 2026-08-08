/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card } from "@/app/components/ui/card";
import { StatusBadge } from "@/app/components/ui/status-badge";

const memoData = [
  { id: "01", title: "Operations memo", from: "Otor John", to: "Ibrahim Sadiq", status: "Pending" },
  { id: "02", title: "Operations project memo", from: "Fatima Faruk", to: "Shola Abiola", status: "Approved" },
  { id: "03", title: "Project onboard notice", from: "Otor John", to: "James Emeka", status: "Approved" },
  { id: "04", title: "Operations memo", from: "Ibrahim Musa", to: "Otor John", status: "Approved" },
];

export const MemoSection = () => {
  return (
    <Card title="Memo" className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 font-semibold">
            <th className="pb-3">S/N</th>
            <th className="pb-3">Memo Title</th>
            <th className="pb-3">Sent From</th>
            <th className="pb-3">Sent To</th>
            <th className="pb-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
          {memoData.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3 text-slate-400">{item.id}</td>
              <td className="py-3 font-semibold text-slate-800">{item.title}</td>
              <td className="py-3">{item.from}</td>
              <td className="py-3">{item.to}</td>
              <td className="py-3 text-right">
                <StatusBadge status={item.status as any} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};