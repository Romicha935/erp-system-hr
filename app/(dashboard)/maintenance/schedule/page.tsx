
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateMaintenanceMutation, MaintenanceType } from "@/app/redux/dashboard/maintenanceApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function ScheduleMaintenancePage() {
  const router = useRouter();

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [maintenanceType, setMaintenanceType] = useState<MaintenanceType | "">("");
  const [recurringOption, setRecurringOption] = useState("");

  const [createMaintenance, { isLoading }] = useCreateMaintenanceMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemName.trim() || !quantity || !scheduledDate || !maintenanceType) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createMaintenance({
        itemName,
        quantity: parseInt(quantity, 10),
        scheduledDate,
        maintenanceType,
        recurringOption: maintenanceType === "RECURRING" ? recurringOption || undefined : undefined,
      }).unwrap();

      toast.success("Maintenance scheduled successfully! 🎉");
      router.push("/maintenance");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to schedule maintenance.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/maintenance" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Schedule Maintenance</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Kindly fill in the form below to schedule a maintenance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Item name</label>
              <input
                type="text"
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Quantity</label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Scheduled date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Maintenance type</label>
              <select
                value={maintenanceType}
                onChange={(e) => setMaintenanceType(e.target.value as MaintenanceType)}
                required
                className={inputClass}
              >
                <option value="">Select option</option>
                <option value="RECURRING">Recurring</option>
                <option value="ONE_TIME">One-time</option>
              </select>
            </div>

            {maintenanceType === "RECURRING" && (
              <div>
                <label className={labelClass}>Recurring option</label>
                <select
                  value={recurringOption}
                  onChange={(e) => setRecurringOption(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select option</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Every two months">Every two months</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Scheduling..." : "Schedule Maintenance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}