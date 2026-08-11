"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateBudgetPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    budgetNumber: "",
    budgetDescription: "",
    budgetAmount: "",
    date: "",
    receivingOffice: "",
  });

  const [createdBudget, setCreatedBudget] = useState<{
    sn: string;
    budgetNo: string;
    description: string;
    amount: string;
    date: string;
  } | null>(null);

  const handleCreateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.budgetNumber || !formData.budgetDescription) return;

    setCreatedBudget({
      sn: "01",
      budgetNo: formData.budgetNumber,
      description: formData.budgetDescription,
      amount: formData.budgetAmount || "0.00",
      date: formData.date || "18/11/2022",
    });
  };

  const handleSubmitForApproval = () => {
    console.log("Submitted Budget for Approval:", createdBudget);
    router.push("/budget");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/budget" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      {/* Main Budget Creation Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Create Budget</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Kindly fill in the form below to create a budget
          </p>
        </div>

        <form onSubmit={handleCreateBudget} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Budget number</label>
              <input
                type="text"
                placeholder="Enter item"
                value={formData.budgetNumber}
                onChange={(e) => setFormData({ ...formData, budgetNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Budget description</label>
              <input
                type="text"
                placeholder="Enter description"
                value={formData.budgetDescription}
                onChange={(e) => setFormData({ ...formData, budgetDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Budget amount</label>
              <input
                type="text"
                placeholder="Enter amount in ₦"
                value={formData.budgetAmount}
                onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">📅</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Receiving office</label>
              <select
                value={formData.receivingOffice}
                onChange={(e) => setFormData({ ...formData, receivingOffice: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">Select option</option>
                <option value="Head Office">Head Office</option>
                <option value="Regional Office">Regional Office</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
            >
              Create Budget
            </button>
          </div>
        </form>
      </div>

      {/* Budget Request Table & Submission Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900">Budget Request</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 min-w-[40px]">S/N</th>
                <th className="pb-3 min-w-[100px]">Budget No.</th>
                <th className="pb-3 min-w-[280px]">Budget Description</th>
                <th className="pb-3 min-w-[140px]">Budget Amount (₦)</th>
                <th className="pb-3 min-w-[100px]">Date</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 font-medium divide-y divide-slate-50">
              {createdBudget ? (
                <tr>
                  <td className="py-3.5 text-slate-400">{createdBudget.sn}</td>
                  <td className="py-3.5 text-slate-600">{createdBudget.budgetNo}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{createdBudget.description}</td>
                  <td className="py-3.5 text-slate-800 font-semibold">{createdBudget.amount}</td>
                  <td className="py-3.5 text-slate-600">{createdBudget.date}</td>
                </tr>
              ) : (
                <tr>
                  <td className="py-3.5 text-slate-400">01</td>
                  <td className="py-3.5 text-slate-600">00211235</td>
                  <td className="py-3.5 font-semibold text-slate-800">Purchase of 10 units, 2Hp Hisense Air Conditions</td>
                  <td className="py-3.5 text-slate-800 font-semibold">1,400,000.00</td>
                  <td className="py-3.5 text-slate-600">18/11/2022</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSubmitForApproval}
            className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
          >
            Submit for Approval
          </button>
        </div>
      </div>
    </div>
  );
}