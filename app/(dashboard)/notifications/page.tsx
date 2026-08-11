"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NotificationItem {
  id: string;
  avatar: string;
  message: string;
  time: string;
  isUnread: boolean;
  group: "Today" | "Yesterday 18th November, 2022";
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    avatar: "/placeholder-user.png",
    message: "Your payment invoice request has been approved by Admin",
    time: "3min ago",
    isUnread: true,
    group: "Today",
  },
  {
    id: "2",
    avatar: "/placeholder-user.png",
    message: "Your payment invoice request has been approved by Admin",
    time: "10min ago",
    isUnread: true,
    group: "Today",
  },
  {
    id: "3",
    avatar: "/placeholder-user.png",
    message: "Your payment invoice request has been approved by Admin",
    time: "1hr ago",
    isUnread: true,
    group: "Today",
  },
  {
    id: "4",
    avatar: "/placeholder-user.png",
    message: "Your payment invoice request has been approved by Admin",
    time: "5hr ago",
    isUnread: false,
    group: "Today",
  },
  {
    id: "5",
    avatar: "/placeholder-user.png",
    message: "Your payment invoice request has been approved by Admin",
    time: "1day ago",
    isUnread: false,
    group: "Yesterday 18th November, 2022",
  },
  {
    id: "6",
    avatar: "/placeholder-user.png",
    message: "Your payment invoice request has been approved by Admin",
    time: "1day ago",
    isUnread: false,
    group: "Yesterday 18th November, 2022",
  },
  {
    id: "7",
    avatar: "/placeholder-user.png",
    message: "Your payment invoice request has been approved by Admin",
    time: "1day ago",
    isUnread: false,
    group: "Yesterday 18th November, 2022",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => n.isUnread).length;

  // Group notifications
  const todayNotifications = notifications.filter((n) => n.group === "Today");
  const yesterdayNotifications = notifications.filter((n) => n.group === "Yesterday 18th November, 2022");

  // Handlers
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isUnread: false })));
  };

  const handleSelectGroup = (groupName: string, isChecked: boolean) => {
    const groupItemIds = notifications.filter((n) => n.group === groupName).map((n) => n.id);
    if (isChecked) {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...groupItemIds])));
    } else {
      setSelectedIds((prev) => prev.filter((id) => !groupItemIds.includes(id)));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isGroupAllSelected = (groupName: string) => {
    const groupItems = notifications.filter((n) => n.group === groupName);
    return groupItems.length > 0 && groupItems.every((n) => selectedIds.includes(n.id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Top Bar Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900">
          Notifications <span className="font-semibold text-slate-700">({unreadCount} unread)</span>
        </h1>
        <button
          onClick={handleMarkAllAsRead}
          className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
        >
          Mark All As Read
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
        
        {/* Today Group */}
        {todayNotifications.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-800">Today</h2>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGroupAllSelected("Today")}
                  onChange={(e) => handleSelectGroup("Today", e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                Select all
              </label>
            </div>

            <div className="space-y-3">
              {todayNotifications.map((item) => (
                <NotificationCard
                  key={item.id}
                  item={item}
                  isSelected={selectedIds.includes(item.id)}
                  onToggleSelect={() => handleToggleSelect(item.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Yesterday Group */}
        {yesterdayNotifications.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-800">Yesterday 18th November, 2022</h2>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGroupAllSelected("Yesterday 18th November, 2022")}
                  onChange={(e) => handleSelectGroup("Yesterday 18th November, 2022", e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                Select all
              </label>
            </div>

            <div className="space-y-3">
              {yesterdayNotifications.map((item) => (
                <NotificationCard
                  key={item.id}
                  item={item}
                  isSelected={selectedIds.includes(item.id)}
                  onToggleSelect={() => handleToggleSelect(item.id)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Sub-component for individual notification row
function NotificationCard({
  item,
  isSelected,
  onToggleSelect,
}: {
  item: NotificationItem;
  isSelected: boolean;
  onToggleSelect: () => void;
}) {
  return (
    <div
      className={`p-4 rounded-2xl transition-all flex items-center justify-between border ${
        item.isUnread
          ? "bg-sky-50/50 border-sky-100"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
        />
        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 relative">
          <Image
            src={item.avatar}
            alt="User"
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback icon placeholder
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs bg-slate-200">
            👤
          </div>
        </div>

        <Link href="/notifications/details" className="group">
          <p className="text-xs font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
            {item.message}
          </p>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
            {item.time}
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {item.isUnread && (
          <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0"></span>
        )}
        <button className="text-slate-400 hover:text-slate-600 p-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}