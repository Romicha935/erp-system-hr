"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddNewItemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemType = searchParams.get("type") || "stocks";

  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    category: "",
    qtyPurchased: "",
    unitPrice: "",
    totalAmount: "",
    supplier: "",
    image: null as File | null,
  });

  // Calculate total amount automatically when unit price or quantity changes
  useEffect(() => {
    const qty = parseFloat(formData.qtyPurchased) || 0;
    const price = parseFloat(formData.unitPrice.replace(/[^0-9.]/g, "")) || 0;
    const total = qty * price;
    setFormData((prev) => ({
      ...prev,
      totalAmount: total > 0 ? `₦${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "",
    }));
  }, [formData.qtyPurchased, formData.unitPrice]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submitting new item for ${itemType}:`, formData);
    router.push("/inventory");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/inventory" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Add New Item</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Upload */}
            <div className="lg:col-span-4 bg-slate-50/50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
              <div className="w-28 h-28 rounded-full bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer relative hover:bg-slate-200/50 transition-colors">
                <span className="text-2xl">📷</span>
                <span className="text-[11px] font-semibold text-slate-500 mt-1">
                  {formData.image ? formData.image.name.slice(0, 10) + "..." : "Upload photo"}
                </span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <p>Allowed format</p>
                <p className="font-semibold text-slate-600">JPG, JPEG, and PNG</p>
                <p className="pt-2">Max file size</p>
                <p className="font-semibold text-slate-600">2MB</p>
              </div>
            </div>

            {/* Right Column: Form Inputs */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Product name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Product ID</label>
                  <input
                    type="text"
                    placeholder="Enter ID"
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
                  >
                    <option value="">Select category</option>
                    <option value="Stationaries">Stationaries</option>
                    <option value="Detergent">Detergent</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Office equipments">Office equipments</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Furnitures">Furnitures</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">QTY purchased</label>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    value={formData.qtyPurchased}
                    onChange={(e) => setFormData({ ...formData, qtyPurchased: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Unit price</label>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Total amount</label>
                  <input
                    type="text"
                    readOnly
                    placeholder="Amount"
                    value={formData.totalAmount}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Supplier</label>
                <input
                  type="text"
                  placeholder="Enter supplier name"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}