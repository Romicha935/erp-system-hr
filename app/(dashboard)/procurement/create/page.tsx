"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";
import {
  useCreateProcurementMutation,
  AttachmentType,
} from "@/app/redux/dashboard/procurementApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function CreateProcurementPage() {
  const router = useRouter();

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [sentToId, setSentToId] = useState("");
  const [hasAttachment, setHasAttachment] = useState<"" | "Yes" | "No">("");
  const [attachmentType, setAttachmentType] = useState<AttachmentType | "">("");

  const { data: staffData, isLoading: isStaffLoading } = useGetStaffQuery({ limit: 100 });
  const [createProcurement, { isLoading }] = useCreateProcurementMutation();

  const staffList = staffData?.data ?? [];

  const totalPrice = useMemo(() => {
    const qty = parseFloat(quantity || "0");
    const price = parseFloat(unitPrice || "0");
    return qty * price;
  }, [quantity, unitPrice]);

  const formatCurrency = (value: number) =>
    `₦${value.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!item.trim() || !quantity || !unitPrice || !sentToId) {
    toast.error("Please fill in all required fields");
    return;
  }

  if (hasAttachment === "Yes" && !attachmentType) {
    toast.error("Please select attachment type");
    return;
  }

  try {
    const qty = Number(quantity);
    const price = Number(unitPrice);
    const calculatedTotalPrice = qty * price;

    // TODO: এখানে logged-in user's staff ID দিতে হবে
    const requestedById = "9355d83e-632c-49e4-8bef-7fcccc1581a0";

    const payload = {
      requestedById,
      sentToId,
      item: item.trim(),
      quantity: qty,
      unitPrice: price,
      totalPrice: calculatedTotalPrice,
      hasAttachment: hasAttachment === "Yes",
      ...(hasAttachment === "Yes" && attachmentType
        ? {
            attachmentType,
          }
        : {}),
    };

    console.log("PROCUREMENT PAYLOAD:", payload);

    await createProcurement(payload).unwrap();

    toast.success("Procurement request created successfully! 🎉");
    router.push("/procurement");
  } catch (error: any) {
    console.log("PROCUREMENT ERROR:", error);
    console.log("ERROR DATA:", error?.data);

    toast.error(
      error?.data?.message ||
        "Failed to create procurement request."
    );
  }
};

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/procurement" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-lg font-bold text-slate-900">Procurement Request</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Item</label>
            <input
              type="text"
              placeholder="Enter item name"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className={inputClass}
              required
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
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Unit price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter amount"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Total price</label>
            <input
              type="text"
              disabled
              value={formatCurrency(totalPrice)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 text-slate-600 rounded-xl outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className={labelClass}>Sent to</label>
            <select
              value={sentToId}
              onChange={(e) => setSentToId(e.target.value)}
              className={inputClass}
              disabled={isStaffLoading}
              required
            >
              <option value="">
                {isStaffLoading ? "Loading staff..." : "Select staff member"}
              </option>
              {staffList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName} ({s.staffId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Add attachment</label>
            <select
              value={hasAttachment}
              onChange={(e) => setHasAttachment(e.target.value as "" | "Yes" | "No")}
              className={inputClass}
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {hasAttachment === "Yes" && (
            <div>
              <label className={labelClass}>Attachment type</label>
              <select
                value={attachmentType}
                onChange={(e) => setAttachmentType(e.target.value as AttachmentType)}
                className={inputClass}
              >
                <option value="">Select option</option>
                <option value="INVOICE">Invoice</option>
                <option value="RECEIPT">Receipt</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}