"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CreatePayslipPage() {
  const [basicSalary, setBasicSalary] = useState<number>(0);
  const [housing, setHousing] = useState<number>(0);
  const [transport, setTransport] = useState<number>(0);
  const [utility, setUtility] = useState<number>(0);
  const [productivity, setProductivity] = useState<number>(0);
  const [communication, setCommunication] = useState<number>(0);
  const [inconvenience, setInconvenience] = useState<number>(0);

  const [tax, setTax] = useState<number>(0);
  const [pension, setPension] = useState<number>(0);

  // Auto Calculated Fields
  const grossSalary = basicSalary + housing + transport + utility + productivity + communication + inconvenience;
  const totalDeduction = tax + pension;
  const netSalary = grossSalary - totalDeduction;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payslip Data:", { grossSalary, totalDeduction, netSalary });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/payroll" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      <div className="space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Create Payslip</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Staff name</label>
                <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                  <option value="">Select staff</option>
                  <option value="1">Abubakar Alghazali</option>
                  <option value="2">Fatima Mohammed</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Title</label>
                <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                  <option value="">Select title</option>
                  <option value="md">Managing Director</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Level</label>
                <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                  <option value="">Select level</option>
                  <option value="ceo">MD/CEO</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Salary Structure */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Salary Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Basic salary</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Housing allowance</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => setHousing(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Transport allowance</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => setTransport(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Utility allowance</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => setUtility(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Productivity allowance</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => setProductivity(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Communication allowance</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => setCommunication(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Inconvenience allowance</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => setInconvenience(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Gross Salary</label>
                <input
                  type="text"
                  readOnly
                  value={grossSalary ? `₦${grossSalary.toLocaleString()}` : "Amount"}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-bold outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Deductions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Deductions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">TAX/PAYE</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => setTax(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Employee pension</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => setPension(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Total deduction</label>
                <input
                  type="text"
                  readOnly
                  value={totalDeduction ? `₦${totalDeduction.toLocaleString()}` : "Amount"}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-bold outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Net Salary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Net Salary</h2>
            <div className="max-w-xs">
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Net salary</label>
              <input
                type="text"
                readOnly
                value={netSalary ? `₦${netSalary.toLocaleString()}` : "Amount"}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-900 font-extrabold outline-none cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity mt-4"
            >
              Create Payslip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}