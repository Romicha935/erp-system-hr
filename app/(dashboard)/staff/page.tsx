"use client";

import { StaffFilterBar } from "@/app/components/dashboard/staff/StafFilter";
import { StaffTable } from "@/app/components/dashboard/staff/StafTable";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";

import React, { useState, useMemo } from "react";

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const { data, isLoading, isFetching, isError } = useGetStaffQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const allStaff = data?.data ?? [];


  const filteredStaff = useMemo(() => {
    return allStaff.filter((staff) => {
      const matchesSearch =
        staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.staffId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole === "All" || staff.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [allStaff, searchTerm, selectedRole]);

  if (isError) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-red-100 text-center text-red-500 text-sm">
        Failed to load staff data. Please try again.
      </div>
    );
  }

  return (
    <div>
      <StaffFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        totalStaff={data?.meta?.total ?? 0}
      />

      <StaffTable
        data={filteredStaff}
        currentPage={data?.meta?.page ?? currentPage}
        totalPages={data?.meta?.totalPages ?? 1}
        itemsPerPage={itemsPerPage}
        isLoading={isLoading || isFetching}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(limit) => {
          setItemsPerPage(limit);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}