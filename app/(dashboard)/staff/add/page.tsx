/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { StaffFormData } from "@/app/types/staf";
import { useCreateStaffMutation } from "@/app/redux/dashboard/staffApi";
import { StaffForm } from "@/app/components/dashboard/staff/StaffModal";

export default function AddStaffPage() {
  const router = useRouter();
  const [createStaff, { isLoading }] = useCreateStaffMutation();

  const handleSubmit = async (data: StaffFormData) => {
    try {
      const { photo, ...payload } = data; 
      await createStaff(payload).unwrap();
      toast.success("Staff added successfully! ");
      router.push("/staff");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add staff. Please try again.");
    }
  };

  return <StaffForm onSubmit={handleSubmit} isLoading={isLoading} />;
} 