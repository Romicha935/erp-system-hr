"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateProcurementPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    date: "",
    unitPrice: "",
    totalPrice: "",
    requestedBy: "Otor John",
    sentTo: "",
    addAttachment: "",
    attachmentType: "",
    // Payment Voucher fields
    accountName: "",
    accountNumber: "",
    bankName: "",
    initiatedBy: "Otor John",
    verifiedBy: "",
    approvedBy: "",
  });

  const handleSubmit = (type: "submit" | "save") => {
    console.log("Saving Request:", { ...formData, type });
    router.push("/procurement");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/procurement" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      {/* Procurement Request Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-lg font-bold text-slate-900">Procurement Request</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Item</label>
            <input
              type="text"
              placeholder="Enter item name"
              value={formData.item}
              onChange={(e) => setFormData({ ...formData, item: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Quantity</label>
            <input
              type="text"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📅</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Unit price</label>
            <input
              type="text"
              placeholder="Enter amount"
              value={formData.unitPrice}
              onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Total price</label>
            <input
              type="text"
              placeholder="Enter amount"
              value={formData.totalPrice}
              onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Requested by</label>
            <input
              type="text"
              disabled
              value={formData.requestedBy}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-100/70 border border-slate-200 text-slate-600 rounded-xl outline-none cursor-not-allowed"
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
              <option value="Faruk Hashim">Faruk Hashim</option>
              <option value="Fatima Mohammed">Fatima Mohammed</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Add Attachment</label>
            <select
              value={formData.addAttachment}
              onChange={(e) => setFormData({ ...formData, addAttachment: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Attachment type</label>
            <select
              value={formData.attachmentType}
              onChange={(e) => setFormData({ ...formData, attachmentType: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            >
              <option value="">Select option</option>
              <option value="Invoice">Invoice</option>
              <option value="Receipt">Receipt</option>
            </select>
          </div>
        </div>

        <div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Attach Payment Voucher
          </button>
        </div>
      </div>

      {/* Payment Voucher Details Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900">Payment Voucher</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3">S/N</th>
                <th className="pb-3">Item</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Unit Price (₦)</th>
                <th className="pb-3">Total Price (₦)</th>
                <th className="pb-3">VAT %</th>
                <th className="pb-3">VAT Amount (₦)</th>
                <th className="pb-3">Gross Amount (₦)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              <tr>
                <td className="py-3 text-slate-400">01</td>
                <td className="py-3 font-semibold text-slate-800">Office chairs</td>
                <td className="py-3">25</td>
                <td className="py-3">22/11/2022</td>
                <td className="py-3">100,000.00</td>
                <td className="py-3">2,500,000.00</td>
                <td className="py-3">7.50%</td>
                <td className="py-3">187,500.00</td>
                <td className="py-3 font-semibold text-slate-900">2,687,500.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Beneficiary Payment Details */}
        <div className="space-y-4 pt-4">
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

        {/* Memo Activities */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xs font-bold text-slate-900">Memo Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Initiated by</label>
              <input
                type="text"
                disabled
                value={formData.initiatedBy}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-100/70 border border-slate-200 text-slate-600 rounded-xl outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Verified by</label>
              <select
                value={formData.verifiedBy}
                onChange={(e) => setFormData({ ...formData, verifiedBy: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">Select option</option>
                <option value="Faruk Hashim">Faruk Hashim</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Approved by</label>
              <select
                value={formData.approvedBy}
                onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">Select option</option>
                <option value="Fatima Mohammed">Fatima Mohammed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Signatures placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="border-t border-slate-300 pt-2 w-48">
            <p className="text-[11px] font-bold text-slate-800">Verifier Signature</p>
          </div>
          <div className="border-t border-slate-300 pt-2 w-48">
            <p className="text-[11px] font-bold text-slate-800">Authorizer Signature</p>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center gap-4 pt-6">
          <button
            onClick={() => handleSubmit("submit")}
            className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
          >
            Save and Send for Approval
          </button>
          <button
            onClick={() => handleSubmit("save")}
            className="px-8 py-2.5 border border-sky-600 text-sky-600 font-semibold text-xs rounded-xl hover:bg-sky-50 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}