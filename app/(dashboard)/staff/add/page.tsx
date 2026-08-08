"use client";

import { StaffForm } from "@/app/components/dashboard/staff/StaffModal";
import { StaffFormData } from "@/app/types/staf";
import React from "react";


export default function AddStaffPage() {
  const handleAddStaff = (data: StaffFormData) => {
    console.log("Creating new staff:", data);
    // TODO: RTK Query or API Post call
  };

  return <StaffForm onSubmit={handleAddStaff} />;
}