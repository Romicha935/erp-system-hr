"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
export default function CreateTrainingRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: "",
    type: "",
    durationValue: "",
    durationUnit: "",
    startDate: "",
    mode: "",
    staffToTrain: "",
  });

  const handleSave = (isSubmit: boolean) => {
    console.log("Saving training request:", { ...formData, isSubmit });
    router.push("/capacity-building");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/capacity-building" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-lg font-bold text-slate-900">Training Request</h1>

        <div className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Training description</label>
              <input
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Training type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">Select type</option>
                <option value="Team">Team</option>
                <option value="Individual">Individual</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Training duration</label>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 focus-within:border-sky-500">
                <input
                  type="text"
                  placeholder=""
                  value={formData.durationValue}
                  onChange={(e) => setFormData({ ...formData, durationValue: e.target.value })}
                  className="w-1/2 px-3.5 py-2.5 text-xs bg-transparent outline-none"
                />
                <select
                  value={formData.durationUnit}
                  onChange={(e) => setFormData({ ...formData, durationUnit: e.target.value })}
                  className="w-1/2 px-3 py-2.5 text-xs bg-slate-100/70 border-l border-slate-200 text-slate-500 outline-none"
                >
                  <option value="">Select option</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Training date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📅</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Training mode</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">Select mode</option>
                <option value="Physical">Physical</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Staff to be trained</label>
              <select
                value={formData.staffToTrain}
                onChange={(e) => setFormData({ ...formData, staffToTrain: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">Select names</option>
                <option value="all">All Staffs</option>
                <option value="devs">Engineering Team</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={() => handleSave(true)}
              className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
            >
              Save and Submit
            </button>
            <button
              onClick={() => handleSave(false)}
              className="px-8 py-2.5 border border-sky-600 text-sky-600 font-semibold text-xs rounded-xl hover:bg-sky-50 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}