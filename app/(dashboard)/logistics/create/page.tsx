// app/(dashboard)/logistics/create/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";
import { useCreateLogisticsMutation } from "@/app/redux/dashboard/logisticsApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-300 rounded-md outline-none focus:border-sky-500 transition-colors";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function CreateLogisticsRequestPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [requestedById, setRequestedById] = useState("");
  const [sentToId, setSentToId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const { data: staffData, isLoading: isStaffLoading } = useGetStaffQuery({ limit: 100 });
  const [createLogistics, { isLoading }] = useCreateLogisticsMutation();

  const staffList = staffData?.data ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !purpose.trim() ||
      !amount ||
      !requestedById ||
      !sentToId ||
      !dateFrom ||
      !dateTo ||
      !accountName ||
      !accountNumber ||
      !bankName
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createLogistics({
        title,
        purpose,
        amount: parseFloat(amount),
        requestedById,
        sentToId,
        dateFrom,
        dateTo,
        accountName,
        accountNumber,
        bankName,
      }).unwrap();

      toast.success("Logistics request created successfully! 🎉");
      router.push("/logistics");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create logistics request.");
    }
  };

  return (
    <div className="space-y-6 w-full pb-10">
      <Link href="/logistics" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Logistics Request</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Kindly fill in the form below to submit a logistics request
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Request title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Purpose</label>
            <input
              type="text"
              placeholder="Enter purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter amount in ₦"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Requested by</label>
            <select
              value={requestedById}
              onChange={(e) => setRequestedById(e.target.value)}
              className={inputClass}
              disabled={isStaffLoading}
              required
            >
              <option value="">
                {isStaffLoading ? "Loading staff..." : "Select staff member"}
              </option>
              {staffList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName} ({s.staffId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Sent to</label>
            <select
              value={sentToId}
              onChange={(e) => setSentToId(e.target.value)}
              className={inputClass}
              disabled={isStaffLoading}
              required
            >
              <option value="">
                {isStaffLoading ? "Loading staff..." : "Select staff member"}
              </option>
              {staffList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName} ({s.staffId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Date from</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Date to</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="text-xs font-bold text-slate-900">Beneficiary Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Save and Send for Approval"}
          </button>
        </div>
      </form>
    </div>
  );
}