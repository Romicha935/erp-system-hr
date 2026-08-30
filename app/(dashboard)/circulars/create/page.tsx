/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/circulars/create/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateCircularMutation, CIRCULAR_GROUPS } from "@/app/redux/dashboard/circularApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function CreateCircularPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [sentToGroup, setSentToGroup] = useState("");
  const [message, setMessage] = useState("");

  const [createCircular, { isLoading }] = useCreateCircularMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !sentToGroup || !message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createCircular({ title, message, sentToGroup }).unwrap();
      toast.success("Circular sent successfully!");
      router.push("/circulars");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send circular.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/circulars" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Create Circular</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Circular title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Sent to</label>
              <select
                value={sentToGroup}
                onChange={(e) => setSentToGroup(e.target.value)}
                required
                className={inputClass}
              >
                <option value="">Select option</option>
                {CIRCULAR_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Circular message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message..."
              required
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Circular"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}