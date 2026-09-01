"use client";

import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
  Notification,
} from "@/app/redux/dashboard/notificationApi";

export default function NotificationsPage() {
  const { data, isLoading } = useGetNotificationsQuery({ limit: 50 });
  const [markAllAsRead, { isLoading: isMarkingAll }] = useMarkAllNotificationsAsReadMutation();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const groups = data?.data ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success("All notifications marked as read");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to mark as read.");
    }
  };

  const handleCardClick = async (notification: Notification) => {
    if (!notification.isRead) {
      try {
        await markAsRead(notification.id).unwrap();
      } catch {
        // silent fail — not critical
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id).unwrap();
      toast.success("Notification deleted");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete.");
    }
  };

  const formatTime = (value: string) => {
    const date = new Date(value);
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}min ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}hr ago`;
    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay}day ago`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-16 animate-pulse" />
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900">
          Notifications <span className="font-semibold text-slate-700">({unreadCount} unread)</span>
        </h1>
        <button
          onClick={handleMarkAllAsRead}
          disabled={isMarkingAll || unreadCount === 0}
          className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isMarkingAll ? "Marking..." : "Mark All As Read"}
        </button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
        {groups.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs font-semibold">
            No notifications available.
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.group} className="space-y-4">
              <h2 className="text-xs font-bold text-slate-800">{group.group}</h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className={`p-4 rounded-2xl transition-all flex items-center justify-between border cursor-pointer ${
                      !item.isRead ? "bg-sky-50/50 border-sky-100" : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 flex items-center justify-center text-slate-400 font-bold text-xs">
                        👤
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{item.message}</p>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                          {formatTime(item.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {!item.isRead && <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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