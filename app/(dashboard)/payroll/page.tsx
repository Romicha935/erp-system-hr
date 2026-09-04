"use client";

import { TaxDefinitionsTable } from "@/app/components/dashboard/payrole/DefinationTable";
import { PayrollHistoryTable } from "@/app/components/dashboard/payrole/PayroleHistoryTable";
import { PayrollChart } from "@/app/components/dashboard/payrole/PayrollChart";
import { PayrollStats } from "@/app/components/dashboard/payrole/PayrolleStats";
import { PayslipsTable } from "@/app/components/dashboard/payrole/PaySlipsTable";
import { SalaryBreakdownTable } from "@/app/components/dashboard/payrole/SalaryBreckdownTable";
import React, { useState } from "react";


export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState<"salary" | "tax" | "payslips" | "payroll">("salary");

  return (
    <div className="space-y-6 w-full">
      {/* Top Metrics & Chart Grid */}
      <div className="">
        <div className="lg:col-span-7">
          <PayrollStats />
        </div>
        <div className="lg:col-span-5">
          <PayrollChart />
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex gap-6 text-xs font-semibold px-6">
        <button
          onClick={() => setActiveTab("salary")}
          className={`py-2 transition-colors border-b-2 ${
            activeTab === "salary" ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          Salary Breakdown
        </button>
        <button
          onClick={() => setActiveTab("tax")}
          className={`py-2 transition-colors border-b-2 ${
            activeTab === "tax" ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          Tax Definitions
        </button>
        <button
          onClick={() => setActiveTab("payslips")}
          className={`py-2 transition-colors border-b-2 ${
            activeTab === "payslips" ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          Payslips
        </button>
        <button
          onClick={() => setActiveTab("payroll")}
          className={`py-2 transition-colors border-b-2 ${
            activeTab === "payroll" ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          Payroll
        </button>
      </div>

      {/* Dynamic Tab Content */}
      {activeTab === "salary" && <SalaryBreakdownTable />}
      {activeTab === "tax" && <TaxDefinitionsTable />}
     {activeTab === "payslips" && <PayslipsTable />}
      {activeTab === "payroll" && <PayrollHistoryTable/>}
    </div>
  );
}