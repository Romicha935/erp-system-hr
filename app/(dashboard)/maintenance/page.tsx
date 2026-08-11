import { MaintenanceCalendar } from "@/app/components/auth/maintenance/CalendarView";
import { MaintenanceMetrics } from "@/app/components/auth/maintenance/MaintenaceCard";
import Link from "next/link";


export default function MaintenancePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Metrics Cards */}
      <MaintenanceMetrics />

      {/* Schedule Banner Action */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-base font-bold text-slate-900">Schedule a Maintenance</h2>
        <Link href="/maintenance/schedule">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Schedule Maintenance
          </button>
        </Link>
      </div>

      {/* Calendar Section */}
      <MaintenanceCalendar />
    </div>
  );
}