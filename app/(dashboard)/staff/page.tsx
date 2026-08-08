"use client";

import { StaffFilterBar } from "@/app/components/dashboard/staff/StafFilter";
import { StaffTable } from "@/app/components/dashboard/staff/StafTable";
import React, { useState, useMemo } from "react";


const mockStaffData: Staff[] = [
  { id: "1", sn: "01", firstName: "Sandra", lastName: "Williams", gender: "Female", staffId: "0246AHR", phoneNumber: "08130000000", role: "Admin", designation: "Human Resources" },
  { id: "2", sn: "02", firstName: "Abubakar", lastName: "Ibrahim", gender: "Male", staffId: "0251ITO", phoneNumber: "07062000033", role: "I.T", designation: "Operations" },
  { id: "3", sn: "03", firstName: "Ikechukwu", lastName: "Ugbonna", gender: "Male", staffId: "0340ITO", phoneNumber: "08130000000", role: "I.T", designation: "Operations" },
  { id: "4", sn: "04", firstName: "Joshua", lastName: "Adewale", gender: "Male", staffId: "0146APM", phoneNumber: "07038126632", role: "Admin", designation: "Project Management" },
  { id: "5", sn: "05", firstName: "Fatimah", lastName: "Nasir", gender: "Female", staffId: "0226ACS", phoneNumber: "08130000000", role: "Admin", designation: "Customer Service" },
];

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Search and Filter Logic
  const filteredStaff = useMemo(() => {
    return mockStaffData.filter((staff) => {
      const matchesSearch =
        staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.staffId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole === "All" || staff.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [searchTerm, selectedRole]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(start, start + itemsPerPage);
  }, [filteredStaff, currentPage, itemsPerPage]);

  return (
    <div>
      <StaffFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        totalStaff={mockStaffData.length}
      />

      <StaffTable
        data={paginatedData}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
}