"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateInventoryItemMutation } from "@/app/redux/dashboard/inventoryApi";

function AddNewItemForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemType = (searchParams.get("type") || "stocks") === "stocks" ? "STOCK" : "INVENTORY";
  const isStocks = itemType === "STOCK";

  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [category, setCategory] = useState("");
  const [qtyPurchased, setQtyPurchased] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [functioningUnits, setFunctioningUnits] = useState("");
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createItem, { isLoading }] = useCreateInventoryItemMutation();

  const totalAmount = (parseFloat(qtyPurchased) || 0) * (parseFloat(unitPrice) || 0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName.trim() || !productId.trim() || !category || !qtyPurchased || !unitPrice || !supplier.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("type", itemType);
    formData.append("productName", productName);
    formData.append("productId", productId);
    formData.append("category", category);
    formData.append("qtyPurchased", qtyPurchased);
    formData.append("unitPrice", unitPrice);
    formData.append("supplier", supplier);

    if (isStocks && quantityInStock) {
      formData.append("quantityInStock", quantityInStock);
    }
    if (!isStocks && totalUnits) {
      formData.append("totalUnits", totalUnits);
    }
    if (!isStocks && functioningUnits) {
      formData.append("functioningUnits", functioningUnits);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await createItem(formData).unwrap();
      toast.success("Item added successfully! 🎉");
      router.push("/inventory");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add item.");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <Link href="/inventory" className="inline-flex items-center gap-1 text-xs text-gray-800 font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">
          Add New {isStocks ? "Stock" : "Inventory"} Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-4 bg-slate-50/50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
              <label className="cursor-pointer flex flex-col items-center justify-center space-y-3 w-full">
                {imagePreview ? (
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-full bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-200/50 transition-colors">
                    <span className="text-2xl">📷</span>
                    <span className="text-[11px] font-semibold text-slate-500 mt-1">Upload photo</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <div className="text-[11px] text-slate-400 space-y-1">
                <p>Allowed format</p>
                <p className="font-semibold text-slate-600">JPG, JPEG, and PNG</p>
                <p className="pt-2">Max file size</p>
                <p className="font-semibold text-slate-600">2MB</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Product name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Product ID</label>
                  <input
                    type="text"
                    placeholder="Enter ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-gray-800 text-slate-900 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
                    required
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
                  <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">QTY purchased</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter quantity"
                    value={qtyPurchased}
                    onChange={(e) => setQtyPurchased(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Unit price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter amount"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Total amount</label>
                  <input
                    type="text"
                    readOnly
                    value={totalAmount > 0 ? `₦${totalAmount.toLocaleString("en-NG")}` : ""}
                    placeholder="Amount"
                    className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-100 border border-slate-200 rounded-md cursor-pointer text-slate-700 outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              {isStocks ? (
                <div>
                  <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Quantity in stock</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter current stock quantity"
                    value={quantityInStock}
                    onChange={(e) => setQuantityInStock(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Total units</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Total units"
                      value={totalUnits}
                      onChange={(e) => setTotalUnits(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Functioning units</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Functioning units"
                      value={functioningUnits}
                      onChange={(e) => setFunctioningUnits(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Supplier</label>
                <input
                  type="text"
                  placeholder="Enter supplier name"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs text-gray-800 rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddNewItemPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-slate-400 text-sm">Loading...</div>}>
      <AddNewItemForm />
    </Suspense>
  );
}

// "use client";

// import React, { Suspense, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { toast } from "react-toastify";
// import { useCreateInventoryItemMutation } from "@/app/redux/dashboard/inventoryApi";

// function AddNewItemForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const itemType = (searchParams.get("type") || "stocks") === "stocks" ? "STOCK" : "INVENTORY";
//   const isStocks = itemType === "STOCK";

//   const [productName, setProductName] = useState("");
//   const [productId, setProductId] = useState("");
//   const [category, setCategory] = useState("");
//   const [qtyPurchased, setQtyPurchased] = useState("");
//   const [unitPrice, setUnitPrice] = useState("");
//   const [supplier, setSupplier] = useState("");
//   const [quantityInStock, setQuantityInStock] = useState("");
//   const [totalUnits, setTotalUnits] = useState("");
//   const [functioningUnits, setFunctioningUnits] = useState("");

//   const [createItem, { isLoading }] = useCreateInventoryItemMutation();

//   const totalAmount = (parseFloat(qtyPurchased) || 0) * (parseFloat(unitPrice) || 0);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!productName.trim() || !productId.trim() || !category || !qtyPurchased || !unitPrice || !supplier.trim()) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     try {
//       await createItem({
//         type: itemType,
//         productName,
//         productId,
//         category,
//         qtyPurchased: parseInt(qtyPurchased, 10),
//         unitPrice: parseFloat(unitPrice),
//         supplier,
//         quantityInStock: isStocks && quantityInStock ? parseInt(quantityInStock, 10) : undefined,
//         totalUnits: !isStocks && totalUnits ? parseInt(totalUnits, 10) : undefined,
//         functioningUnits: !isStocks && functioningUnits ? parseInt(functioningUnits, 10) : undefined,
//       }).unwrap();

//       toast.success("Item added successfully! 🎉");
//       router.push("/inventory");
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to add item.");
//     }
//   };

//   return (
//     <div className="space-y-6 w-full mx-auto pb-10">
//       <Link href="/inventory" className="inline-flex items-center gap-1 text-xs text-gray-800 font-semibold text-sky-600 hover:underline">
//         ‹ Back
//       </Link>

//       <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
//         <h1 className="text-xl font-bold text-slate-900">
//           Add New {isStocks ? "Stock" : "Inventory"} Item
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//             <div className="lg:col-span-4 bg-slate-50/50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
//               <div className="w-28 h-28 rounded-full bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
//                 <span className="text-2xl">📷</span>
//                 <span className="text-[11px] font-semibold text-slate-500 mt-1">Upload photo</span>
//               </div>
//               <div className="text-[11px] text-slate-400 space-y-1">
//                 <p>Allowed format</p>
//                 <p className="font-semibold text-slate-600">JPG, JPEG, and PNG</p>
//                 <p className="pt-2">Max file size</p>
//                 <p className="font-semibold text-slate-600">2MB</p>
//               </div>
//             </div>

//             <div className="lg:col-span-8 space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Product name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter product name"
//                     value={productName}
//                     onChange={(e) => setProductName(e.target.value)}
//                     className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Product ID</label>
//                   <input
//                     type="text"
//                     placeholder="Enter ID"
//                     value={productId}
//                     onChange={(e) => setProductId(e.target.value)}
//                     className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Category</label>
//                   <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="w-full px-3.5 py-2.5 text-xs text-gray-800 text-slate-900 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
//                     required
//                   >
//                     <option value="">Select category</option>
//                     <option value="Stationaries">Stationaries</option>
//                     <option value="Detergent">Detergent</option>
//                     <option value="Electronics">Electronics</option>
//                     <option value="Office equipments">Office equipments</option>
//                     <option value="Automobile">Automobile</option>
//                     <option value="Furnitures">Furnitures</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">QTY purchased</label>
//                   <input
//                     type="number"
//                     min="0"
//                     placeholder="Enter quantity"
//                     value={qtyPurchased}
//                     onChange={(e) => setQtyPurchased(e.target.value)}
//                     className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Unit price</label>
//                   <input
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     placeholder="Enter amount"
//                     value={unitPrice}
//                     onChange={(e) => setUnitPrice(e.target.value)}
//                     className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Total amount</label>
//                   <input
//                     type="text"
//                     readOnly
//                     value={totalAmount > 0 ? `₦${totalAmount.toLocaleString("en-NG")}` : ""}
//                     placeholder="Amount"
//                     className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-100 border border-slate-200 rounded-md cursor-pointer text-slate-700 outline-none cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//               {isStocks ? (
//                 <div>
//                   <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Quantity in stock</label>
//                   <input
//                     type="number"
//                     min="0"
//                     placeholder="Enter current stock quantity"
//                     value={quantityInStock}
//                     onChange={(e) => setQuantityInStock(e.target.value)}
//                     className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
//                   />
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Total units</label>
//                     <input
//                       type="number"
//                       min="0"
//                       placeholder="Total units"
//                       value={totalUnits}
//                       onChange={(e) => setTotalUnits(e.target.value)}
//                       className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Functioning units</label>
//                     <input
//                       type="number"
//                       min="0"
//                       placeholder="Functioning units"
//                       value={functioningUnits}
//                       onChange={(e) => setFunctioningUnits(e.target.value)}
//                       className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="text-xs text-gray-800 font-semibold text-slate-700 block mb-1.5">Supplier</label>
//                 <input
//                   type="text"
//                   placeholder="Enter supplier name"
//                   value={supplier}
//                   onChange={(e) => setSupplier(e.target.value)}
//                   className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-sky-500 transition-colors"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs text-gray-800 rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
//             >
//               {isLoading ? "Adding..." : "Add Item"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function AddNewItemPage() {
//   return (
//     <Suspense fallback={<div className="py-16 text-center text-slate-400 text-sm">Loading...</div>}>
//       <AddNewItemForm />
//     </Suspense>
//   );
// }