
"use client";

import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { StaffFormData } from "@/app/types/staf";
import { useGetStaffByIdQuery, useUpdateStaffMutation } from "@/app/redux/dashboard/staffApi";
import { StaffForm } from "@/app/components/dashboard/staff/StaffModal";

export default function EditStaffPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: staff, isLoading: isFetching } = useGetStaffByIdQuery(id);
  const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();

  const handleSubmit = async (data: StaffFormData) => {
    try {
      const { photo, ...payload } = data;
      await updateStaff({ id, data: payload }).unwrap();
      toast.success("Staff updated successfully!");
      router.push("/staff");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update staff. Please try again.");
    }
  };

  if (isFetching) {
    return <div className="py-16 text-center text-slate-400 text-sm">Loading staff details...</div>;
  }

  if (!staff) {
    return <div className="py-16 text-center text-red-500 text-sm">Staff not found.</div>;
  }

  return (
    <StaffForm
      initialValues={{
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        officialEmail: staff.officialEmail,
        phone: staff.phone,
        gender: staff.gender,
        role: staff.role,
        designation: staff.designation,
        staffId: staff.staffId,
        photo: null,
      }}
      onSubmit={handleSubmit}
      isLoading={isUpdating}
      isEditMode
    />
  );
}