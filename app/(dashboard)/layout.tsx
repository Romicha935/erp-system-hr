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
      {/* Fixed Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area with Header */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-6 md:p-8 overflow-y-auto flex-1">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
}