"use client";

import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { PersonalInfoTab } from "@/app/components/dashboard/settings/PersonalinfoTab";
import { SecurityTab } from "@/app/components/dashboard/settings/SecuirityTab";


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"personal" | "security">("personal");

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Manage your account information and security</p>
      </div>

      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit">
        <button
          onClick={() => setActiveTab("personal")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "personal"
              ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          <User size={14} />
          Personal Information
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "security"
              ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          <Lock size={14} />
          Security
        </button>
      </div>

      {activeTab === "personal" ? <PersonalInfoTab /> : <SecurityTab />}
    </div>
  );
}