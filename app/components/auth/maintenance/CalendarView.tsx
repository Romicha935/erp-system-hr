"use client";

import React, { useState } from "react";
import Link from "next/link";

export const MaintenanceCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number>(18);

  // Sample scheduled events for selected date
  const events = [
    { id: "1", date: "18th November, 2022", title: "1. Scheduled maintenance for service of 3 unit of AC" },
    { id: "2", date: "18th November, 2022", title: "2. Scheduled maintenance for service of 3 unit of AC" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <h3 className="text-base font-bold text-slate-900">Scheduled Maintenance</h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Calendar UI */}
        <div className="lg:col-span-5 bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <button className="text-slate-400 hover:text-slate-600 font-bold text-sm">‹</button>
            <span className="text-xs font-bold text-slate-800">November 2022</span>
            <button className="text-slate-400 hover:text-slate-600 font-bold text-sm">›</button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-2">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 text-center text-xs gap-y-2 font-medium text-slate-700">
            <span className="text-slate-300">29</span>
            <span className="text-slate-300">30</span>
            <span>1</span>
            <span>2</span>
            <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto font-bold">3</span>
            <span>4</span>
            <span>5</span>

            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>

            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span className="text-sky-500 font-bold">17</span>
            <button
              onClick={() => setSelectedDate(18)}
              className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors ${
                selectedDate === 18 ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold" : ""
              }`}
            >
              18
            </button>
            <span>19</span>

            <span>20</span>
            <span className="w-7 h-7 rounded-full border border-sky-400 text-sky-600 flex items-center justify-center mx-auto">21</span>
            <span>22</span>
            <span className="w-7 h-7 rounded-full border border-sky-400 text-sky-600 flex items-center justify-center mx-auto">23</span>
            <span>24</span>
            <span>25</span>
            <span>26</span>

            <span>27</span>
            <span>28</span>
            <span>29</span>
            <span>30</span>
            <span className="text-slate-300">1</span>
            <span className="text-slate-300">2</span>
            <span className="text-slate-300">3</span>
          </div>
        </div>

        {/* Vertical Separator */}
        <div className="hidden lg:block w-px bg-slate-100 h-full self-stretch" />

        {/* Right Event Details List */}
        <div className="lg:col-span-6 space-y-6">
          {events.map((event) => (
            <div key={event.id} className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 block">{event.date}</span>
              <p className="text-xs font-bold text-slate-800">{event.title}</p>
              <Link href={`/maintenance/${event.id}`}>
                <button className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-sm hover:opacity-90 transition-opacity">
                  View
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};