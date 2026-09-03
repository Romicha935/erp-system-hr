"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ChevronDown, LogOut, Menu, Settings } from "lucide-react";
import { NotificationBell } from "../ui/NotificationBell";
import { ConfirmActionModal } from "../ui/ConfirmActionModal";
import { useGetMyProfileQuery } from "@/app/redux/dashboard/settingsApi";
import { useLogoutMutation } from "@/app/redux/api/authApi";
import { logout as logoutAction } from "@/app/redux/slices/authSlice";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { data } = useGetMyProfileQuery();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const profile = data?.data;

  const firstName = profile?.firstName ?? profile?.staff?.firstName ?? "User";
  const lastName = profile?.lastName ?? profile?.staff?.lastName ?? "";
  const role = profile?.role ?? "Staff";
  const department = profile?.staff?.designation ?? "HR Office";
  const avatar = profile?.profileImage ?? profile?.staff?.profileImage;

  const fullName = `${firstName} ${lastName}`.trim();

  const avatarUrl =
    avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConfirmLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch {

    } finally {
      dispatch(logoutAction());
      setIsLogoutModalOpen(false);
      toast.success("Logged out successfully");
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 z-40 h-[72px] bg-white border-b border-slate-200 rounded-md lg:mx-6 mb-6">
      <div className="h-full flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden shrink-0 p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-extrabold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
                Welcome, {firstName}
              </h1>
              <span className="text-lg sm:text-xl"></span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-slate-400 sm:text-xs">
              Today is {formattedDate}.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <NotificationBell />
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="group flex items-center gap-2 rounded-xl p-1.5 pr-2 transition-all duration-200 hover:bg-slate-50 sm:gap-3 sm:pr-3"
            >
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 sm:h-10 sm:w-10">
                <img src={avatarUrl} alt={`${fullName} avatar`} className="h-full w-full object-cover" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
              </div>

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

            {isProfileOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white">
                      <img src={avatarUrl} alt={`${fullName} avatar`} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">{fullName}</p>
                      <p className="truncate text-[11px] font-medium text-slate-400">{role}</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    href="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py- text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <Settings size={16} />
                    </span>
                    <span>Settings</span>
                  </Link>

                  <div className="" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl cursor-pointer px-3 py-2.5 text-xs font-semibold text-rose-500 transition-colors hover:bg-rose-50"
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

      <ConfirmActionModal
        isOpen={isLogoutModalOpen}
        title="Log out?"
        description="Are you sure you want to log out of your account?"
        confirmLabel="Yes, log out"
        cancelLabel="Cancel"
        icon={LogOut}
        iconColor="text-rose-500"
        iconBg="bg-rose-50"
        confirmColor="text-rose-500 hover:bg-rose-50"
        isLoading={isLoggingOut}
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </header>
  );
};