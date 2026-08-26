// app/components/dashboard/staff/StaffTable.tsx
"use client";

import React from "react";
import Link from "next/link";
import { DataTable, Column } from "@/app/components/ui/DataTable";
import { Staff } from "@/app/redux/dashboard/staffApi";


interface StaffTableProps {
  data: Staff[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  data,
  currentPage,
  totalPages,
  itemsPerPage,
  isLoading,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const columns: Column<Staff>[] = [
    { header: "S/N", accessor: (_row, i) => (currentPage - 1) * itemsPerPage + i + 1 },
    {  header: "Full Name",
    accessor: (row) => `${row.firstName} ${row.lastName}`, },
    { header: "Gender", accessor: (row) => row.gender?.toLowerCase(), className: "capitalize" },
    { header: "Staff ID", accessor: "staffId" },
    { header: "Phone", accessor: "phone" },
    { header: "Role", accessor: "role" },
    { header: "Designation", accessor: "designation" },
  ];

  return (
    <DataTable
      title="All Staff"
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyMessage="No staff members found."
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
      renderAction={(row) => (
        <Link
          href={`/staff/edit/${row.id}`}
          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline text-xs"
        >
          View more
        </Link>
      )}
    />
  );
};