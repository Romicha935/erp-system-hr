"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HRNotificationGroup {
  id: string;
  dateTime: string;
  messages: string[];
}

const initialHRMessages: HRNotificationGroup[] = [
  {
    id: "1",
    dateTime: "Friday, Nov 11. 10:00am",
    messages: [
      "Lorem ipsum dolor sit amet consectetur. Aliquet nisl laoreet nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id. nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id.",
      "Lorem ipsum dolor sit amet consectetur. Aliquet nisl laoreet nunc enim dignissim pulvinarenim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id.",
    ],
  },
  {
    id: "2",
    dateTime: "Saturday, Nov 12. 01:20pm",
    messages: [
      "Lorem ipsum dolor sit amet consectetur. Aliquet nisl laoreet nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id. nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id.",
      "Lorem ipsum dolor sit amet consectetur. Aliquet nisl laoreet nunc enim dignissim pulvinarenim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id.",
    ],
  },
  {
    id: "3",
    dateTime: "Sunday, Nov 13. 09:20am",
    messages: [
      "Lorem ipsum dolor sit amet consectetur. Aliquet nisl laoreet nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id. nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id.",
    ],
  },
];

export default function HRNotificationDetailsPage() {
  const [messages, setMessages] = useState<HRNotificationGroup[]>(initialHRMessages);

  const handleDeleteAll = () => {
    setMessages([]);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Back Link */}
      <Link href="/notifications" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <h1 className="text-base font-bold text-slate-900">Notifications from HR</h1>
        <button
          onClick={handleDeleteAll}
          className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
        >
          Delete All
        </button>
      </div>

      {/* Message List Area */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8 min-h-[400px]">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs font-semibold">
            No notifications available.
          </div>
        ) : (
          messages.map((group) => (
            <div key={group.id} className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900">{group.dateTime}</h2>
              <div className="space-y-3">
                {group.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs text-slate-600 leading-relaxed max-w-4xl"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}