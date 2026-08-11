"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateLogisticsRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    purpose: "",
    amount: "",
    requestedBy: "Otor John Stephen",
    sentTo: "",
    dateFrom: "",
    dateTo: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const handleSaveAndSend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Request:", formData);
    router.push("/logistics");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/logistics" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      {/* Main Request Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Logistics Request</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Kindly fill in the form below to submit a logistics request
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Request title</label>
              <input
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Purpose</label>
              <input
                type="text"
                placeholder="Enter purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Amount</label>
              <input
                type="text"
                placeholder="Enter amount in ₦"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Requested by</label>
              <input
                type="text"
                readOnly
                value={formData.requestedBy}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Sent to</label>
              <select
                value={formData.sentTo}
                onChange={(e) => setFormData({ ...formData, sentTo: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">Select option</option>
                <option value="Hassana Husseini">Hassana Husseini</option>
                <option value="Fatimah Mohammed">Fatimah Mohammed</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Date from</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formData.dateFrom}
                  onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">📅</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Date to</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formData.dateTo}
                  onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">📅</span>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
            >
              Attach Payment Voucher
            </button>
          </div>
        </form>
      </div>

      {/* Payment Voucher Details Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900">Payment Voucher</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-2">S/N</th>
                <th className="pb-2">Request Title</th>
                <th className="pb-2">Purpose</th>
                <th className="pb-2">Date From</th>
                <th className="pb-2">Date To</th>
                <th className="pb-2">Amount (₦)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 font-medium">
              <tr>
                <td className="py-3">01</td>
                <td className="py-3 font-semibold">Request for travel time</td>
                <td className="py-3">Training course</td>
                <td className="py-3">22/11/2022</td>
                <td className="py-3">30/11/2022</td>
                <td className="py-3 font-semibold">360,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-900">Beneficiary Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Account name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Account number</label>
              <input
                type="text"
                placeholder="Enter number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Bank name</label>
              <input
                type="text"
                placeholder="Enter bank name"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-semibold text-slate-700">
          <div className="border-t border-slate-300 pt-2 w-48">
            Verifier Signature
          </div>
          <div className="border-t border-slate-300 pt-2 w-48">
            Authorizer Signature
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={handleSaveAndSend}
            className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
          >
            Save and Send for Approval
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-white border border-sky-500 text-sky-600 font-semibold text-xs rounded-xl hover:bg-sky-50 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}