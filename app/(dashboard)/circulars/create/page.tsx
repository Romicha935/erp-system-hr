"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateCircularPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    sentFrom: "Otor John",
    sentTo: "",
    date: "16/11/2022",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Circular Created:", formData);
    // Redirect back to circulars list
    router.push("/circulars");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Back Button */}
      <Link href="/circulars" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      {/* Main Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Create Circular</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Form Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Circular title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title"
                required
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Sent from</label>
              <input
                type="text"
                readOnly
                value={formData.sentFrom}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Sent to</label>
              <select
                value={formData.sentTo}
                onChange={(e) => setFormData({ ...formData, sentTo: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Select option</option>
                <option value="Operations Staffs">Operations Staffs</option>
                <option value="HR Staffs">HR Staffs</option>
                <option value="All Staff">All Staff</option>
              </select>
            </div>
          </div>

          {/* Bottom Form Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Date</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={formData.date}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-not-allowed"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">📅</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Circular message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter message..."
                required
                className="w-full p-3.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none transition-colors"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
            >
              Send Circular
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}