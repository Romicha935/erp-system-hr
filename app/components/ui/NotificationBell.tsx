// app/components/layout/NotificationBell.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "@/app/redux/dashboard/notificationApi";

export const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data } = useGetNotificationsQuery({ limit: 5 });
  const [markAsRead] = useMarkNotificationAsReadMutation();

  const unreadCount = data?.unreadCount ?? 0;
  const recentGroups = data?.data ?? [];
  const recentItems = recentGroups.flatMap((g) => g.items).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (value: string) => {
    const diffMin = Math.floor((Date.now() - new Date(value).getTime()) / 60000);
    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}min ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}hr ago`;
    return `${Math.floor(diffHr / 24)}day ago`;
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
      >
        <Bell size={20} className="text-slate-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-slate-100 shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-[11px] font-semibold text-sky-600">{unreadCount} unread</span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
            {recentItems.length > 0 ? (
              recentItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!item.isRead) markAsRead(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${
                    !item.isRead ? "bg-sky-50/40" : ""
                  }`}
                >
                  <p className="text-xs font-medium text-slate-800 line-clamp-2">{item.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{formatTime(item.createdAt)}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-xs text-slate-400">No notifications yet.</div>
            )}
          </div>

          <Link
            href="/notifications"
            onClick={() => setIsOpen(false)}
            className="block text-center py-3 text-xs font-semibold text-sky-600 hover:bg-slate-50 transition-colors border-t border-slate-100"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
};