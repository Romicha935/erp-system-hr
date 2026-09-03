"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/app/components/ui/card";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { useGetPaymentVouchersQuery } from "@/app/redux/dashboard/paymentVoucherApi";

export const PaymentVoucherSection = () => {
  const { data, isLoading } = useGetPaymentVouchersQuery({ limit: 4 });
  const vouchers = data?.data ?? [];

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  return (
    <Card title="Payment Vouchers" className="overflow-x-auto">
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
              <th className="pb-3">Item</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
            {vouchers.length > 0 ? (
              vouchers.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-semibold text-slate-800">
                    <Link href={`/payments/${item.id}`} className="hover:text-blue-600">
                      {item.procurement.item}
                    </Link>
                  </td>
                  <td className="py-3 text-slate-500">{formatDate(item.createdAt)}</td>
                  <td className="py-3 text-right">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-6 text-center text-slate-400">
                  No payment vouchers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </Card>
  );
};