"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Search } from "lucide-react";

interface StaffFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  totalStaff: number;
}

export const StaffFilterBar: React.FC<StaffFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  totalStaff,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-sm mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Search Input */}
      <div className="w-full lg:w-80">
        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
          Quick search a staff
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter search word"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all"
          />
          <span className="absolute right-3.5 top-3 text-slate-400"><Search size={16} /></span>
        </div>
      </div>

      {/* Total Count */}
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-bold text-slate-900 leading-tight">{totalStaff}</h3>
        <p className="text-xs text-slate-400 font-medium">Total number of staff</p>
      </div>

      {/* Role Filter */}
      <div className="w-full lg:w-60">
        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
          Filter staff
        </label>
        <select
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all text-slate-700 cursor-pointer"
        >
          <option value="All">All staff</option>
          <option value="Admin">Admin</option>
          <option value="I.T">I.T</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      {/* Add New Staff Button */}
      <div className="w-full lg:w-auto self-end lg:self-center">
        <Link href="/staff/add">
          <Button className="w-full lg:w-auto px-6 py-3">
            + Add New Staff
          </Button>
        </Link>
      </div>
    </div>
  );
};