"use client";

import React, { useState } from "react";
import Link from "next/link";

const participants = [
  "Fatima Mohammed",
  "Ibrahim Bankole",
  "Otor John Stephen",
  "Abubakar Alghazali",
  "Ranky Akab",
  "Sadiq Lukman",
];

export default function TrainingDetailsPage() {
  const [status, setStatus] = useState<string>("Inprogress");
  const [selectedStatusOption, setSelectedStatusOption] = useState<string>("");

  const handleUpdateStatus = () => {
    if (selectedStatusOption) {
      setStatus(selectedStatusOption);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/capacity-building" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8 min-h-[450px]">
        <h1 className="text-lg font-bold text-slate-900">Staff Health and Safety Training</h1>

        {/* Training Meta Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-slate-100 pb-6">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Training type</p>
            <p className="text-xs font-bold text-slate-900 mt-1">Team training</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Training duration</p>
            <p className="text-xs font-bold text-slate-900 mt-1">3 weeks</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Training mode</p>
            <p className="text-xs font-bold text-slate-900 mt-1">Physical</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Training status</p>
            <p className="text-xs font-bold text-amber-500 mt-1">{status}</p>
          </div>
        </div>

        {/* Participant List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-900">Training participant</h2>
          <ol className="space-y-2 text-xs font-medium text-slate-700">
            {participants.map((person, index) => (
              <li key={index}>
                {index + 1}. {person}
              </li>
            ))}
          </ol>
        </div>

        {/* Update Status Dropdown */}
        <div className="pt-6 space-y-2">
          <label className="text-xs font-semibold text-slate-700 block">Update status</label>
          <div className="flex items-center gap-4 max-w-md">
            <select
              value={selectedStatusOption}
              onChange={(e) => setSelectedStatusOption(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            >
              <option value="">Select option</option>
              <option value="To-do">To-do</option>
              <option value="Inprogress">Inprogress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={handleUpdateStatus}
              className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity shrink-0"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}