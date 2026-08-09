"use client";

import { PaymentVoucherItem } from "@/app/types/payments";
import React from "react";


interface VoucherFormTableProps {
  items: PaymentVoucherItem[];
  onChange: (updatedItems: PaymentVoucherItem[]) => void;
}

export const VoucherFormTable: React.FC<VoucherFormTableProps> = ({
  items,
  onChange,
}) => {
  const handleItemChange = (
    index: number,
    field: keyof PaymentVoucherItem,
    value: any
  ) => {
    const newItems = [...items];
    const current = { ...newItems[index], [field]: value };

    // Auto Calculations
    const qty = Number(current.qty) || 0;
    const unitPrice = Number(current.unitPrice) || 0;
    const vatPercent = Number(current.vatPercent) || 0;
    const whtPercent = Number(current.whtPercent) || 0;

    const amount = qty * unitPrice;
    const vatAmount = (amount * vatPercent) / 100;
    const grossAmount = amount + vatAmount;
    const whtAmount = (amount * whtPercent) / 100;
    const netAmount = grossAmount - whtAmount;

    newItems[index] = {
      ...current,
      amount,
      vatAmount,
      grossAmount,
      whtAmount,
      netAmount,
    };

    onChange(newItems);
  };

  const addRow = () => {
    const newItem: PaymentVoucherItem = {
      id: Date.now().toString(),
      sn: String(items.length + 1).padStart(2, "0"),
      classType: "",
      description: "",
      qty: 1,
      unitPrice: 0,
      amount: 0,
      vatPercent: 7.5,
      vatAmount: 0,
      grossAmount: 0,
      whtPercent: 2.5,
      whtAmount: 0,
      netAmount: 0,
    };
    onChange([...items, newItem]);
  };

  // Totals
  const totalAmount = items.reduce((acc, curr) => acc + curr.amount, 0);
  const totalVat = items.reduce((acc, curr) => acc + curr.vatAmount, 0);
  const totalWht = items.reduce((acc, curr) => acc + curr.whtAmount, 0);
  const totalNet = items.reduce((acc, curr) => acc + curr.netAmount, 0);

  return (
    <div className="space-y-4 overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500 font-bold">
            <th className="pb-3 min-w-[40px]">S/N</th>
            <th className="pb-3 min-w-[130px]">Class</th>
            <th className="pb-3 min-w-[150px]">Description</th>
            <th className="pb-3 min-w-[60px]">QTY</th>
            <th className="pb-3 min-w-[100px]">Unit Price (₦)</th>
            <th className="pb-3 min-w-[100px]">Amount (₦)</th>
            <th className="pb-3 min-w-[70px]">VAT %</th>
            <th className="pb-3 min-w-[100px]">VAT Amount (₦)</th>
            <th className="pb-3 min-w-[100px]">Gross Amount (₦)</th>
            <th className="pb-3 min-w-[70px]">WHT%</th>
            <th className="pb-3 min-w-[100px]">WHT Amount</th>
            <th className="pb-3 min-w-[100px] text-right">Net Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium">
          {items.map((row, idx) => (
            <tr key={row.id} className="hover:bg-slate-50/50">
              <td className="py-3 text-slate-400">{row.sn}</td>
              <td className="py-3 pr-2">
                <input
                  type="text"
                  value={row.classType}
                  onChange={(e) => handleItemChange(idx, "classType", e.target.value)}
                  placeholder="Class"
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </td>
              <td className="py-3 pr-2">
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                  placeholder="Description"
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </td>
              <td className="py-3 pr-2">
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) => handleItemChange(idx, "qty", Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg outline-none"
                />
              </td>
              <td className="py-3 pr-2">
                <input
                  type="number"
                  value={row.unitPrice}
                  onChange={(e) => handleItemChange(idx, "unitPrice", Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg outline-none"
                />
              </td>
              <td className="py-3 font-semibold text-slate-800">{row.amount.toLocaleString()}</td>
              <td className="py-3 pr-2">
                <input
                  type="number"
                  value={row.vatPercent}
                  onChange={(e) => handleItemChange(idx, "vatPercent", Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg outline-none"
                />
              </td>
              <td className="py-3 text-slate-600">{row.vatAmount.toLocaleString()}</td>
              <td className="py-3 text-slate-600">{row.grossAmount.toLocaleString()}</td>
              <td className="py-3 pr-2">
                <input
                  type="number"
                  value={row.whtPercent}
                  onChange={(e) => handleItemChange(idx, "whtPercent", Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg outline-none"
                />
              </td>
              <td className="py-3 text-slate-600">{row.whtAmount.toLocaleString()}</td>
              <td className="py-3 text-right font-bold text-slate-900">{row.netAmount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Row Button */}
      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <span className="text-base">+</span> Add another row
      </button>

      {/* Total Summary Row */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between font-bold text-sm text-slate-900">
        <span>Total</span>
        <div className="flex gap-8">
          <span>Amount: ₦{totalAmount.toLocaleString()}</span>
          <span>VAT: ₦{totalVat.toLocaleString()}</span>
          <span>WHT: ₦{totalWht.toLocaleString()}</span>
          <span className="text-blue-600">Net: ₦{totalNet.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};