"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useGetMaintenancesQuery } from "@/app/redux/dashboard/maintenanceApi";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MaintenanceCalendar: React.FC = () => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number>(today.getDate());

  const { data, isLoading } = useGetMaintenancesQuery({
    month: viewMonth + 1,
    year: viewYear,
    limit: 200,
  });

  const maintenances = data?.data ?? [];

  const datesWithEvents = useMemo(() => {
    const set = new Set<number>();
    maintenances.forEach((m) => {
      const d = new Date(m.scheduledDate);
      if (d.getMonth() === viewMonth && d.getFullYear() === viewYear) {
        set.add(d.getDate());
      }
    });
    return set;
  }, [maintenances, viewMonth, viewYear]);

  const eventsForSelectedDate = useMemo(() => {
    return maintenances.filter((m) => {
      const d = new Date(m.scheduledDate);
      return d.getDate() === selectedDate && d.getMonth() === viewMonth && d.getFullYear() === viewYear;
    });
  }, [maintenances, selectedDate, viewMonth, viewYear]);

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const calendarCells: { day: number; inCurrentMonth: boolean }[] = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarCells.push({ day: daysInPrevMonth - i, inCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({ day: d, inCurrentMonth: true });
  }
  while (calendarCells.length % 7 !== 0) {
    calendarCells.push({ day: calendarCells.length - daysInMonth - firstDayOfMonth + 1, inCurrentMonth: false });
  }

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const formatFullDate = (day: number) =>
    `${day}${getOrdinal(day)} ${monthNames[viewMonth]}, ${viewYear}`;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <h3 className="text-base font-bold text-slate-900">Scheduled Maintenance</h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <button onClick={goToPrevMonth} className="text-slate-400 hover:text-slate-600 font-bold text-sm">
              ‹
            </button>
            <span className="text-xs font-bold text-slate-800">
              {monthNames[viewMonth]} {viewYear}
            </span>
            <button onClick={goToNextMonth} className="text-slate-400 hover:text-slate-600 font-bold text-sm">
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-2">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>

          <div className="grid grid-cols-7 text-center text-xs gap-y-2 font-medium text-slate-700">
            {calendarCells.map((cell, idx) => {
              if (!cell.inCurrentMonth) {
                return (
                  <span key={idx} className="text-slate-300">
                    {cell.day}
                  </span>
                );
              }

              const hasEvent = datesWithEvents.has(cell.day);
              const isSelected = selectedDate === cell.day;
              const todayFlag = isToday(cell.day);

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(cell.day)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors ${
                    isSelected
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold"
                      : hasEvent
                      ? "border border-sky-400 text-sky-600 font-bold"
                      : todayFlag
                      ? "text-rose-600 font-bold"
                      : ""
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block w-px bg-slate-100 h-full self-stretch" />

        <div className="lg:col-span-6 space-y-6">
          {isLoading ? (
            <p className="text-xs text-slate-400">Loading...</p>
          ) : eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((event, idx) => (
              <div key={event.id} className="space-y-3">
                <span className="text-xs font-semibold text-slate-400 block">
                  {formatFullDate(selectedDate)}
                </span>
                <p className="text-xs font-bold text-slate-800">
                  {idx + 1}. Scheduled maintenance for {event.itemName} (Qty: {event.quantity})
                </p>
                <Link href={`/maintenance/${event.id}`}>
                  <button className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-sm hover:opacity-90 transition-opacity">
                    View
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">No maintenance scheduled for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

function getOrdinal(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}



// "use client";

// import React from "react";
// import Link from "next/link";
// import { DataTable, Column } from "@/app/components/ui/DataTable";
// import { useGetMaintenancesQuery, Maintenance } from "@/app/redux/dashboard/maintenanceApi";

// const statusStyle: Record<string, string> = {
//   PENDING: "text-amber-500 font-semibold",
//   COMPLETED: "text-emerald-600 font-semibold",
//   OVERDUE: "text-rose-600 font-semibold",
// };

// export const MaintenanceCalendar: React.FC = () => {
//   const { data, isLoading, isFetching } = useGetMaintenancesQuery({ limit: 50 });

//   const list = data?.data ?? [];

//   const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

//   const columns: Column<Maintenance>[] = [
//     { header: "Item Name", accessor: "itemName", className: "font-semibold text-slate-800" },
//     { header: "Quantity", accessor: "quantity" },
//     { header: "Scheduled Date", accessor: (row) => formatDate(row.scheduledDate) },
//     { header: "Type", accessor: (row) => (row.maintenanceType === "RECURRING" ? "Recurring" : "One-time") },
//     {
//       header: "Status",
//       accessor: (row) => <span className={statusStyle[row.status]}>{row.status}</span>,
//     },
//   ];

//   return (
//     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-6 border-b border-slate-100">
//         <div>
//           <h3 className="text-base font-bold text-slate-900">Scheduled Maintenance</h3>
//           <p className="text-xs text-slate-400 mt-1">Upcoming and past maintenance records</p>
//         </div>
//         <Link href="/maintenance/schedule">
//           <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
//             Schedule Maintenance
//           </button>
//         </Link>
//       </div>

//       <div className="p-6">
//         <DataTable
//           columns={columns}
//           data={list}
//           isLoading={isLoading || isFetching}
//           emptyMessage="No maintenance scheduled yet."
//           currentPage={1}
//           totalPages={1}
//           itemsPerPage={list.length || 10}
//           onPageChange={() => {}}
//           onItemsPerPageChange={() => {}}
//           renderAction={(row) => (
//             <Link
//               href={`/maintenance/${row.id}`}
//               className="text-blue-600 font-semibold hover:underline text-xs"
//             >
//               View
//             </Link>
//           )}
//         />
//       </div>
//     </div>
//   );
// };