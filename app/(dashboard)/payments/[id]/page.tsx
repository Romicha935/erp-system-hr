"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { PaymentVoucherItem } from "@/app/types/payments";
import { VoucherFormTable } from "@/app/components/dashboard/payments/PaymentsFormTable";
import { CreateMemoModal } from "@/app/components/dashboard/payments/CreateMemoModal";

const mockVoucherDetails = {
  id: "1",
  subject: "Request for FARS for October 2022",
  accountName: "GRM Consulting Ltd",
  accountNumber: "0123456789",
  bankName: "GT Bank",
  items: [
    {
      id: "101",
      sn: "01",
      classType: "Consultancy service",
      description: "FARS",
      qty: 1,
      unitPrice: 1000000,
      amount: 1000000,
      vatPercent: 7.5,
      vatAmount: 75000,
      grossAmount: 1075000,
      whtPercent: 2.5,
      whtAmount: 25000,
      netAmount: 1050000,
    },
    {
      id: "102",
      sn: "02",
      classType: "Consultancy service",
      description: "Tax Service",
      qty: 1,
      unitPrice: 500000,
      amount: 500000,
      vatPercent: 7.5,
      vatAmount: 37500,
      grossAmount: 537500,
      whtPercent: 10,
      whtAmount: 50000,
      netAmount: 487500,
    },
  ],
};

export default function VoucherDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Existing Data State Populate
  const [subject, setSubject] = useState(mockVoucherDetails.subject);
  const [accountName, setAccountName] = useState(mockVoucherDetails.accountName);
  const [accountNumber, setAccountNumber] = useState(mockVoucherDetails.accountNumber);
  const [bankName, setBankName] = useState(mockVoucherDetails.bankName);
  const [items, setItems] = useState<PaymentVoucherItem[]>(mockVoucherDetails.items);
  
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Updating Voucher ID ${id}:`, {
      subject,
      items,
      beneficiary: { accountName, accountNumber, bankName },
    });
    // Update সম্পন্ন হলে Memo Modal ওপেন হবে (Screen 3)
    setIsMemoModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link href="/payments" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ← Back to All Vouchers
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Payment Voucher Details</h1>
          <span className="text-xs px-3 py-1 font-semibold rounded-full bg-blue-50 text-blue-600">
            Voucher ID: #{id}
          </span>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Subject Input Field */}
          <div className="max-w-md">
            <label className="text-xs font-semibold text-slate-700 block mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium"
              required
            />
          </div>

          {/* Dynamic Table with Full Calculations */}
          <VoucherFormTable items={items} onChange={setItems} />

          {/* Beneficiary Details */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Beneficiary Payment Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Account name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Account number</label>
                <input
                  type="text"
                  placeholder="Enter number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Bank name</label>
                <input
                  type="text"
                  placeholder="Enter bank name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Update / Submit Button */}
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-all"
          >
            Submit Payment Voucher
          </button>
        </form>
      </div>

  
      <CreateMemoModal isOpen={isMemoModalOpen} onClose={() => setIsMemoModalOpen(false)} />
    </div>
  );
}