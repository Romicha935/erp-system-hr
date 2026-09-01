import React from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar Section */}
      <aside className="w-64 shrink-0 hidden md:block border-r border-slate-200 min-h-screen bg-white">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}