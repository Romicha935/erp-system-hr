"use client";

import { StaffForm } from "@/app/components/dashboard/staff/StaffModal";
import { StaffFormData } from "@/app/types/staf";
import React, { use } from "react";


const mockStaffList = [
  {
    id: "1",
    firstName: "Sandra",
    lastName: "Williams",
    email: "sandra.w@example.com",
    officialEmail: "sandra.w@company.com",
    phoneNumber: "08130000000",
    gender: "Female",
    role: "Admin",
    designation: "Human Resources",
    staffId: "0246AHR",
  },
  {
    id: "2",
    firstName: "Abubakar",
    lastName: "Ibrahim",
    email: "abubakar.i@example.com",
    officialEmail: "abubakar.i@company.com",
    phoneNumber: "07062000033",
    gender: "Male",
    role: "I.T",
    designation: "Operations",
    staffId: "0251ITO",
  },
];

export default function EditStaffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const staffData = mockStaffList.find((item) => item.id === id);

  const handleUpdateStaff = (formData: StaffFormData) => {
    console.log(`Updating staff with ID ${id}:`, formData);
    // TODO: RTK Query Mutation Call (e.g., useUpdateStaffMutation)
  };

  if (!staffData) {
    return (
      <div className="p-8 text-center text-slate-500">
        Staff record not found.
      </div>
    );
  }

  const initialValues: StaffFormData = {
    firstName: staffData.firstName,
    lastName: staffData.lastName,
    email: staffData.email,
    officialEmail: staffData.officialEmail,
    phoneNumber: staffData.phoneNumber,
    gender: staffData.gender,
    role: staffData.role,
    designation: staffData.designation,
    staffId: staffData.staffId,
    photo: null,
  };

  return (
    <StaffForm
      initialValues={initialValues}
      onSubmit={handleUpdateStaff}
      isEditMode={true}
    />
  );
}