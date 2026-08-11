"use client";

import React, { useState } from "react";
import Link from "next/link";

import { MetricItem, MetricsOverview } from "@/app/components/dashboard/inventory/MatrixOverview";


// Data Types
interface StockItem {
  sn: string;
  image: string;
  productName: string;
  productId: string;
  category: string;
  qtyPurchased: string;
  unitPrice: string;
  totalAmount: string;
  inStock?: string;
  supplier: string;
  status: string;
  statusType: "success" | "warning" | "danger";
}

// Metrics Data for Stocks Tab
const stockMetrics: MetricItem[] = [
  { title: "Categories", count: "15", subtext: "2 more than last year", isIncrease: true, iconBg: "bg-sky-100 text-sky-600" },
  { title: "Total items", count: "800", subtext: "10 more than last year", isIncrease: true, iconBg: "bg-amber-100 text-amber-600" },
  { title: "Total item cost", count: "₦5,000,000", subtext: "2.5% less than last year", isIncrease: false, iconBg: "bg-purple-100 text-purple-600" },
  { title: "Items low in stock", count: "200", subtext: "20 more than last week", isIncrease: true, iconBg: "bg-amber-100 text-amber-600" },
];

// Metrics Data for Inventory Tab
const inventoryMetrics: MetricItem[] = [
  { title: "Categories", count: "10", subtext: "2 more than last year", isIncrease: true, iconBg: "bg-sky-100 text-sky-600" },
  { title: "Total items", count: "300", subtext: "10 more than last year", isIncrease: true, iconBg: "bg-amber-100 text-amber-600" },
  { title: "Total item cost", count: "₦250,000,000", subtext: "2.5% less than last year", isIncrease: false, iconBg: "bg-purple-100 text-purple-600" },
  { title: "Total suppliers", count: "20", subtext: "2 more than last week", isIncrease: true, iconBg: "bg-amber-100 text-amber-600" },
];

// Stocks Mock Data
const stocksList: StockItem[] = [
  { sn: "01", image: "/placeholder.png", productName: "Pen", productId: "45656787", category: "Stationaries", qtyPurchased: "50pcs", unitPrice: "₦100.00", totalAmount: "₦5,000.00", inStock: "40pcs", supplier: "Big Ben's Store", status: "In stock", statusType: "success" },
  { sn: "02", image: "/placeholder.png", productName: "A4 Paper", productId: "69956787", category: "Stationaries", qtyPurchased: "20pcs", unitPrice: "₦3,000.00", totalAmount: "₦60,000.00", inStock: "0pcs", supplier: "Big Ben's Store", status: "Out of Stock", statusType: "danger" },
  { sn: "03", image: "/placeholder.png", productName: "Liquid wash", productId: "36426787", category: "Detergent", qtyPurchased: "35pcs", unitPrice: "₦5,000.00", totalAmount: "₦175,000.00", inStock: "10pcs", supplier: "Quality wash", status: "Low in stock", statusType: "warning" },
  { sn: "04", image: "/placeholder.png", productName: "Paper clips", productId: "45656787", category: "Stationaries", qtyPurchased: "45pcs", unitPrice: "₦200.00", totalAmount: "₦9,000.00", inStock: "10pcs", supplier: "Big Ben's Store", status: "Low in Stock", statusType: "warning" },
  { sn: "05", image: "/placeholder.png", productName: "Notepads", productId: "36426787", category: "Stationaries", qtyPurchased: "100pcs", unitPrice: "₦2,000.00", totalAmount: "₦200,000.00", inStock: "45pcs", supplier: "Big Ben's Store", status: "In Stock", statusType: "success" },
  { sn: "06", image: "/placeholder.png", productName: "Air freshner", productId: "36420021", category: "Detergent", qtyPurchased: "10pcs", unitPrice: "₦1,000.00", totalAmount: "₦10,000.00", inStock: "0pcs", supplier: "Quality wash", status: "Out of Stock", statusType: "danger" },
];

// Inventory Mock Data
const inventoryList: StockItem[] = [
  { sn: "01", image: "/placeholder.png", productName: "LG Air condition", productId: "45656787", category: "Office equipments", qtyPurchased: "5pcs", unitPrice: "₦50,000.00", totalAmount: "₦250,000.00", supplier: "Big Ben's Store", status: "All functioning", statusType: "success" },
  { sn: "02", image: "/placeholder.png", productName: "Toyota Spcae Bus", productId: "63196787", category: "Automobile", qtyPurchased: "2pcs", unitPrice: "₦1,500,000.00", totalAmount: "₦3,000,000.00", supplier: "Innoson Vehicles", status: "All functioning", statusType: "success" },
  { sn: "03", image: "/placeholder.png", productName: "55Inch Hisense TV", productId: "328422AA", category: "Electronics", qtyPurchased: "3pcs", unitPrice: "₦150,000.00", totalAmount: "₦450,000.00", supplier: "Big Ben's Store", status: "2 functioning", statusType: "warning" },
  { sn: "04", image: "/placeholder.png", productName: "Office Chairs", productId: "45656787", category: "Furnitures", qtyPurchased: "15pcs", unitPrice: "₦100,000.00", totalAmount: "₦1,500,000.00", supplier: "Decorhub NG", status: "All functioning", statusType: "success" },
  { sn: "05", image: "/placeholder.png", productName: "HP 16inch Desktops", productId: "00247791", category: "Electronics", qtyPurchased: "25pcs", unitPrice: "₦50,000.00", totalAmount: "₦1,250,000.00", supplier: "HP Abuja Stores", status: "20 functioning", statusType: "warning" },
  { sn: "06", image: "/placeholder.png", productName: "Laser Jet Printers", productId: "45656787", category: "Office equipments", qtyPurchased: "5pcs", unitPrice: "₦50,000.00", totalAmount: "₦250,000.00", supplier: "Big Ben's Store", status: "All functioning", statusType: "success" },
];

export default function StocksAndInventoryPage() {
  const [activeTab, setActiveTab] = useState<"stocks" | "inventory">("stocks");

  const isStocks = activeTab === "stocks";
  const currentMetrics = isStocks ? stockMetrics : inventoryMetrics;
  const currentData = isStocks ? stocksList : inventoryList;

  const getStatusColor = (type: "success" | "warning" | "danger") => {
    switch (type) {
      case "success": return "text-emerald-600";
      case "warning": return "text-amber-500";
      case "danger": return "text-rose-500";
      default: return "text-slate-600";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Tab Switcher */}
      <div className="flex items-center gap-8 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("stocks")}
          className={`text-sm font-bold transition-colors relative pb-2 ${
            isStocks ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Stocks
          {isStocks && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`text-sm font-bold transition-colors relative pb-2 ${
            !isStocks ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Inventory
          {!isStocks && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full" />}
        </button>
      </div>

      {/* Metrics Section */}
      <MetricsOverview metrics={currentMetrics} />

      {/* Banner Action Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">
          {isStocks ? "Update Stock List" : "Update Inventory Table"}
        </h2>
        <Link href={`/inventory/create?type=${activeTab}`}>
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            {isStocks ? "Update Stock" : "Update Inventory"}
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900">Stock List</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 min-w-[40px]">S/N</th>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              {currentData.map((row) => (
                <tr key={row.sn} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 text-slate-400">{row.sn}</td>
                  <td className="py-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                      <span className="text-[10px] text-slate-400">📦</span>
                    </div>
                  </td>
                  <td className="py-3 font-semibold text-slate-800">{row.productName}</td>
                  <td className="py-3 text-slate-600">{row.productId}</td>
                  <td className="py-3 text-slate-600">{row.category}</td>
                  <td className="py-3 text-slate-800">{row.qtyPurchased}</td>
                  <td className="py-3 text-slate-800 font-semibold">{row.unitPrice}</td>
                  <td className="py-3 text-slate-800 font-semibold">{row.totalAmount}</td>
                  {isStocks && <td className="py-3 text-slate-800">{row.inStock}</td>}
                  <td className="py-3 text-slate-600">{row.supplier}</td>
                  <td className={`py-3 font-semibold ${getStatusColor(row.statusType)}`}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}