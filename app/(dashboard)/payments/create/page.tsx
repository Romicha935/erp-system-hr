// app/(dashboard)/payments/create/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useGetProcurementsQuery } from "@/app/redux/dashboard/procurementApi";
import { useCreatePaymentVoucherMutation } from "@/app/redux/dashboard/paymentVoucherApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function CreatePaymentVoucherPage() {
  const router = useRouter();

  const [procurementId, setProcurementId] = useState("");
  const [vatPercentage, setVatPercentage] = useState("");
  const [remarks, setRemarks] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const { data: procurementData, isLoading: isProcurementLoading } = useGetProcurementsQuery({
    status: "APPROVED",
    limit: 100,
  });
  const [createPaymentVoucher, { isLoading }] = useCreatePaymentVoucherMutation();

  const procurementList = procurementData?.data ?? [];
  const selectedProcurement = procurementList.find((p) => p.id === procurementId);

  const formatCurrency = (value: string) =>
    `₦${parseFloat(value).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const vatAmount = selectedProcurement && vatPercentage
    ? (parseFloat(selectedProcurement.totalPrice) * parseFloat(vatPercentage)) / 100
    : 0;

  const grossAmount = selectedProcurement
    ? parseFloat(selectedProcurement.totalPrice) + vatAmount
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!procurementId || !vatPercentage || !accountName || !accountNumber || !bankName) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const result = await createPaymentVoucher({
        procurementId,
        vatPercentage: parseFloat(vatPercentage),
        remarks: remarks || undefined,
        accountName,
        accountNumber,
        bankName,
      }).unwrap();

      toast.success("Payment voucher created successfully! 🎉");
      router.push(`/payments/${result.data.id}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create payment voucher.");
    }
  };

  return (
    <div className="space-y-5 w-full pb-10">
      <Link
        href="/payments"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Create Payment Voucher</h1>
          <p className="text-sm text-slate-400 mt-1">
            Attach a voucher to an approved procurement request
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div>
            <label className={labelClass}>Procurement request</label>
            <select
              value={procurementId}
              onChange={(e) => setProcurementId(e.target.value)}
              className={inputClass}
              disabled={isProcurementLoading}
              required
            >
              <option value="">
                {isProcurementLoading ? "Loading requests..." : "Select an approved procurement request"}
              </option>
              {procurementList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.item} — {p.sn} ({formatCurrency(p.totalPrice)})
                </option>
              ))}
            </select>
          </div>

          {selectedProcurement && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div>
                <p className="text-slate-400 font-semibold">Item</p>
                <p className="text-slate-800 font-medium mt-0.5">{selectedProcurement.item}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Quantity</p>
                <p className="text-slate-800 font-medium mt-0.5">{selectedProcurement.quantity}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Unit Price</p>
                <p className="text-slate-800 font-medium mt-0.5">{formatCurrency(selectedProcurement.unitPrice)}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Total Price</p>
                <p className="text-slate-800 font-medium mt-0.5">{formatCurrency(selectedProcurement.totalPrice)}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>VAT percentage</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                placeholder="e.g. 7.5"
                value={vatPercentage}
                onChange={(e) => setVatPercentage(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Remarks</label>
              <input
                type="text"
                placeholder="Optional remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {selectedProcurement && vatPercentage && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-sky-50 rounded-xl border border-sky-100 text-xs">
              <div>
                <p className="text-sky-600 font-semibold">VAT Amount</p>
                <p className="text-slate-800 font-bold mt-0.5">₦{vatAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-sky-600 font-semibold">Gross Amount</p>
                <p className="text-slate-900 font-bold mt-0.5">₦{grossAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Beneficiary Payment Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Account name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Account number</label>
                <input
                  type="text"
                  placeholder="Enter number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Bank name</label>
                <input
                  type="text"
                  placeholder="Enter bank name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-slate-100">
            <Link href="/payments">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-md cursor-pointer hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-sm rounded-md cursor-pointer shadow-md shadow-indigo-100 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Payment Voucher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}