"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import {
  useGetInventoryItemsQuery,
  useGetStockSummaryQuery,
  useGetInventorySummaryQuery,
  useDeleteInventoryItemMutation,
} from "@/app/redux/dashboard/inventoryApi";

import { MetricsOverview, MetricItem } from "@/app/components/dashboard/inventory/MatrixOverview";
import { ConfirmDeleteModal } from "@/app/components/ui/DeleteConfirmModal";

export default function StocksAndInventoryPage() {
  const [activeTab, setActiveTab] = useState<"stocks" | "inventory">("stocks");
  const [page, setPage] = useState(1);
  const [targetToDelete, setTargetToDelete] = useState<{ id: string; name: string } | null>(null);

  const isStocks = activeTab === "stocks";
  const apiType = isStocks ? "STOCK" : "INVENTORY";

  const { data: listData, isLoading: isListLoading, isFetching } = useGetInventoryItemsQuery({
    type: apiType,
    page,
    limit: 10,
  });

  const { data: stockSummary, isLoading: isStockSummaryLoading } = useGetStockSummaryQuery(undefined, {
    skip: !isStocks,
  });
  const { data: inventorySummary, isLoading: isInventorySummaryLoading } = useGetInventorySummaryQuery(
    undefined,
    { skip: isStocks }
  );

  const [deleteItem, { isLoading: isDeleting }] = useDeleteInventoryItemMutation();

  const currentData = listData?.data ?? [];
  const meta = listData?.meta;

  const formatCurrency = (v: number) => `₦${v.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const currentMetrics: MetricItem[] = isStocks
    ? stockSummary
      ? [
          { title: "Categories", count: stockSummary.data.categories.toString(), iconBg: "bg-sky-100 text-sky-600" },
          { title: "Total items", count: stockSummary.data.totalItems.toString(), iconBg: "bg-amber-100 text-amber-600" },
          { title: "Total item cost", count: formatCurrency(stockSummary.data.totalCost), iconBg: "bg-purple-100 text-purple-600" },
          { title: "Items low in stock", count: stockSummary.data.lowInStock.toString(), iconBg: "bg-amber-100 text-amber-600" },
        ]
      : []
    : inventorySummary
    ? [
        { title: "Categories", count: inventorySummary.data.categories.toString(), iconBg: "bg-sky-100 text-sky-600" },
        { title: "Total items", count: inventorySummary.data.totalItems.toString(), iconBg: "bg-amber-100 text-amber-600" },
        { title: "Total item cost", count: formatCurrency(inventorySummary.data.totalCost), iconBg: "bg-purple-100 text-purple-600" },
        { title: "Total suppliers", count: inventorySummary.data.suppliers.toString(), iconBg: "bg-amber-100 text-amber-600" },
      ]
    : [];

  const isSummaryLoading = isStocks ? isStockSummaryLoading : isInventorySummaryLoading;

  const getStatusColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-emerald-600";
      case "warning":
        return "text-amber-500";
      case "danger":
        return "text-rose-500";
      default:
        return "text-slate-600";
    }
  };

  const handleConfirmDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteItem(targetToDelete.id).unwrap();
      toast.success("Item deleted successfully");
      setTargetToDelete(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete item.");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-8 border-b border-slate-200 pb-2">
        <button
          onClick={() => {
            setActiveTab("stocks");
            setPage(1);
          }}
          className={`text-sm font-bold transition-colors relative pb-2 ${
            isStocks ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Stocks
          {isStocks && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full" />}
        </button>
        <button
          onClick={() => {
            setActiveTab("inventory");
            setPage(1);
          }}
          className={`text-sm font-bold transition-colors relative pb-2 ${
            !isStocks ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Inventory
          {!isStocks && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full" />}
        </button>
      </div>

      {isSummaryLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <MetricsOverview metrics={currentMetrics} />
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">
          {isStocks ? "Update Stock List" : "Update Inventory Table"}
        </h2>
        <Link href={`/inventory/create?type=${activeTab}`}>
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity">
            {isStocks ? "Add Stock Item" : "Add Inventory Item"}
          </button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900">{isStocks ? "Stock List" : "Inventory List"}</h3>

        {isListLoading || isFetching ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                  <th className="pb-3 min-w-[60px]">Image</th>
                  <th className="pb-3 min-w-[160px]">Product Name</th>
                  <th className="pb-3 min-w-[100px]">Product ID</th>
                  <th className="pb-3 min-w-[130px]">Category</th>
                  <th className="pb-3 min-w-[110px]">QTY Purchased</th>
                  <th className="pb-3 min-w-[100px]">Unit Price</th>
                  <th className="pb-3 min-w-[110px]">Total Amount</th>
                  {isStocks && <th className="pb-3 min-w-[90px]">In-Stock</th>}
                  <th className="pb-3 min-w-[140px]">Supplier</th>
                  <th className="pb-3 min-w-[100px]">Status</th>
                  <th className="pb-3 text-right min-w-[60px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                {currentData.length > 0 ? (
                  currentData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                          {row.imageUrl ? (
                            <img src={row.imageUrl?.startsWith("http") ? row.imageUrl : `https://your-api-domain.com${row.imageUrl}`} alt={row.productName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-slate-400">📦</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-slate-800">{row.productName}</td>
                      <td className="py-3 text-slate-600">{row.productId}</td>
                      <td className="py-3 text-slate-600">{row.category}</td>
                      <td className="py-3 text-slate-800">{row.qtyPurchased}pcs</td>
                      <td className="py-3 text-slate-800 font-semibold">
                        ₦{parseFloat(row.unitPrice).toLocaleString("en-NG")}
                      </td>
                      <td className="py-3 text-slate-800 font-semibold">{formatCurrency(row.totalAmount)}</td>
                      {isStocks && <td className="py-3 text-slate-800">{row.quantityInStock ?? 0}pcs</td>}
                      <td className="py-3 text-slate-600">{row.supplier}</td>
                      <td className={`py-3 font-semibold ${getStatusColor(row.statusType)}`}>{row.status}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setTargetToDelete({ id: row.id, name: row.productName })}
                          className="text-rose-500 hover:text-rose-700 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isStocks ? 10 : 9} className="py-8 text-center text-slate-400">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.totalPages > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-colors ${
                  page === p
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={!!targetToDelete}
        itemName={targetToDelete?.name}
        title="Delete this item?"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTargetToDelete(null)}
      />
    </div>
  );
}