"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Search, Plus, ChevronDown, UserCheck } from "lucide-react";

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
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-6 transition-all hover:shadow-md">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* 1. Search Input */}
        <div className="w-full lg:w-72">
          <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
            Search Staff
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            
              className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium"
            />
            <Search 
              size={18} 
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" 
            />
          </div>
        </div>

        {/* 2. Role Filter Dropdown */}
        <div className="w-full lg:w-56">
          <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
            Filter by Role
          </label>
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => onRoleChange(e.target.value)}
             
              className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium appearance-none cursor-pointer"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="HR">Human Resources</option>
              {/* <option value="STAFF">Staff</option> */}
            </select>
            <ChevronDown 
              size={16} 
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" 
            />
          </div>
        </div>

        {/* 3. Total Staff Count Card */}
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl self-start lg:self-end h-[42px]">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserCheck size={18} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider leading-none">Total Staff</p>
            <h3 className="text-base font-bold text-slate-900 leading-tight mt-0.5">{totalStaff}</h3>
          </div>
        </div>

        {/* 4. Add New Staff Button */}
        <div className="w-full lg:w-auto self-start lg:self-end">
          <Link href="/staff/add" className="block w-full">
            <Button className="w-full lg:w-auto px-5 py-2.5 h-[42px] bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2">
              <Plus size={18} />
              <span>Add New Staff</span>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};