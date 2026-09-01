
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { NotificationBell } from "../ui/NotificationBell";


interface HeaderProps {
  firstName?: string;
  lastName?: string;
  role?: string;
  department?: string;
  avatar?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  firstName = "User",
  lastName = "",
  role = "Staff",
  department = "HR Office",
  avatar,
  onLogout,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const fullName = `${firstName} ${lastName}`.trim();

  const avatarUrl =
    avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      fullName
    )}`;

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 z-40 h-[72px] bg-white border-b border-slate-200 mx-6 mb-6"> 
    <div className="h-full flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* ================= LEFT ================= */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Welcome, {firstName}
            </h1>

            <span className="text-lg sm:text-xl">👏</span>
          </div>

          <p className="mt-1 text-[11px] font-medium text-slate-400 sm:text-xs">
            Today is {formattedDate}.
          </p>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {/* Notification */}
          <NotificationBell />
          {/* Divider */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="group flex items-center gap-2 rounded-xl p-1.5 pr-2 transition-all duration-200 hover:bg-slate-50 sm:gap-3 sm:pr-3"
            >
              {/* Avatar */}
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 sm:h-10 sm:w-10">
                <img
                  src={avatarUrl}
                  alt={`${fullName} avatar`}
                  className="h-full w-full object-cover"
                />

                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
              </div>

              {/* User Info */}
              <div className="hidden min-w-0 text-left sm:block">
                <p className="max-w-[140px] truncate text-sm font-bold leading-tight text-slate-800">
                  {fullName}
                </p>

                <p className="mt-0.5 max-w-[140px] truncate text-[11px] font-medium text-slate-400">
                  {department || role}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`hidden text-slate-400 transition-transform duration-200 sm:block ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* ================= PROFILE DROPDOWN ================= */}
            {isProfileOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                {/* User Header */}
                <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white">
                      <img
                        src={avatarUrl}
                        alt={`${fullName} avatar`}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {fullName}
                      </p>

                      <p className="truncate text-[11px] font-medium text-slate-400">
                        {role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-2">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <User size={16} />
                    </span>

                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <Settings size={16} />
                    </span>

                    <span>Settings</span>
                  </Link>

                  <div className="my-1.5 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      onLogout?.();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-rose-500 transition-colors hover:bg-rose-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                      <LogOut size={16} />
                    </span>

                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
