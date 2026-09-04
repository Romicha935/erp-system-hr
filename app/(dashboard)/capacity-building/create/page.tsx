// app/(dashboard)/capacity-building/create/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";
import { useCreateTrainingMutation } from "@/app/redux/dashboard/trainingApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function CreateTrainingRequestPage() {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [durationValue, setDurationValue] = useState("");
  const [durationUnit, setDurationUnit] = useState("");
  const [startDate, setStartDate] = useState("");
  const [mode, setMode] = useState("");
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const { data: staffData, isLoading: isStaffLoading } = useGetStaffQuery({ limit: 100 });
  const [createTraining, { isLoading }] = useCreateTrainingMutation();

  const staffList = staffData?.data ?? [];

  const toggleParticipant = (id: string) => {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setParticipantIds(participantIds.length === staffList.length ? [] : staffList.map((s) => s.id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim() || !type || !durationValue || !durationUnit || !startDate || !mode) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (participantIds.length === 0) {
      toast.error("Please select at least one participant");
      return;
    }

    try {
      await createTraining({
        description,
        type,
        durationValue: parseInt(durationValue, 10),
        durationUnit,
        startDate,
        mode,
        participantIds,
      }).unwrap();

      toast.success("Training request created successfully! 🎉");
      router.push("/capacity-building");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create training request.");
    }
  };

  return (
    <div className="space-y-6 w-full pb-10">
      <Link href="/capacity-building" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-lg font-bold text-slate-900">Training Request</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Training description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Training type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass} required>
              <option value="">Select type</option>
              <option value="Team">Team</option>
              <option value="Individual">Individual</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Training duration</label>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 focus-within:border-sky-500">
              <input
                type="number"
                min="1"
                value={durationValue}
                onChange={(e) => setDurationValue(e.target.value)}
                className="w-1/2 px-3.5 py-2.5 text-xs bg-transparent outline-none"
                required
              />
              <select
                value={durationUnit}
                onChange={(e) => setDurationUnit(e.target.value)}
                className="w-1/2 px-3 py-2.5 text-xs bg-slate-100/70 border-l border-slate-200 text-slate-700 outline-none"
                required
              >
                <option value="">Select option</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Training date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Training mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)} className={inputClass} required>
              <option value="">Select mode</option>
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelClass}>Staff to be trained</label>
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-xs font-semibold text-sky-600 hover:underline"
            >
              {participantIds.length === staffList.length ? "Deselect all" : "Select all"}
            </button>
          </div>

          <div className="border border-slate-200 rounded-xl max-h-64 overflow-y-auto divide-y divide-slate-100">
            {isStaffLoading ? (
              <div className="p-4 text-center text-xs text-slate-400">Loading staff...</div>
            ) : staffList.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">No staff found.</div>
            ) : (
              staffList.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={participantIds.includes(s.id)}
                    onChange={() => toggleParticipant(s.id)}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-800">{s.firstName} {s.lastName}</span>
                  <span className="text-slate-400">({s.staffId})</span>
                  <span className="text-slate-400 ml-auto">{s.designation}</span>
                </label>
              ))
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">{participantIds.length} staff selected</p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Save and Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}