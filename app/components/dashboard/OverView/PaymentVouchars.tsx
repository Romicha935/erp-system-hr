/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card } from "@/app/components/ui/card";
import { StatusBadge } from "@/app/components/ui/status-badge";

const voucherData = [
  { id: "01", subject: "Request for FARS for October 2022", date: "25/01/2023", status: "Pending" },
  { id: "02", subject: "Request for project proposal fee", date: "19/01/2023", status: "Approved" },
  { id: "03", subject: "Request for FARS for October 2022", date: "10/01/2023", status: "Approved" },
  { id: "04", subject: "Request for project proposal fee", date: "03/01/2023", status: "Pending" },
];

export const PaymentVoucherSection = () => {
  return (
    <Card title="Payment Vouchers" className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 font-semibold">
            <th className="pb-3">S/N</th>
            <th className="pb-3">Subject</th>
            <th className="pb-3">Date</th>
            <th className="pb-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
          {voucherData.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3 text-slate-400">{item.id}</td>
              <td className="py-3 font-semibold text-slate-800">{item.subject}</td>
              <td className="py-3 text-slate-500">{item.date}</td>
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