"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { StaffFormData } from "@/app/types/staf";

interface StaffFormProps {
  initialValues?: StaffFormData;
  onSubmit: (data: StaffFormData) => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

export const StaffForm: React.FC<StaffFormProps> = ({
  initialValues,
  onSubmit,
  isLoading = false,
  isEditMode = false,
}) => {
  const [formData, setFormData] = useState<StaffFormData>(
    initialValues || {
      firstName: "",
      lastName: "",
      email: "",
      officialEmail: "",
      phone: "",
      gender: "MALE",
      role: "",
      designation: "",
      staffId: "",
      photo: null,
    }
  );

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be under 2MB");
      return;
    }

    setFormData({ ...formData, photo: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectClass =
    "w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer appearance-none";

  return (
    <div className="w-full mx-auto space-y-5">
  
     

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {isEditMode ? "Edit Staff Details" : "Add a New Staff"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isEditMode
              ? "Update the information below and save changes"
              : "Fill in the details to register a new staff member"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Photo Upload */}
            <div className="lg:col-span-4">
              <div className="flex flex-col items-center justify-center h-full p-6 border-2 border-dashed border-slate-400 rounded-2xl bg-slate-50/60 hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white ring-4 ring-white shadow-sm flex items-center justify-center border border-slate-200 overflow-hidden mb-4 group">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <Camera size={28} className="mx-auto mb-1" strokeWidth={1.5} />
                      <span className="text-[11px] font-medium">Upload photo</span>
                    </div>
                  )}

                  <label
                    htmlFor="photo-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <Upload size={20} className="text-white" />
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                <label
                  htmlFor="photo-upload"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  {previewImage ? "Change photo" : "Choose a file"}
                </label>
                <p className="text-[11px] text-slate-400 mt-2 text-center">
                  JPG, JPEG or PNG · Max 2MB
                </p>
              </div>
            </div>

            {/* Fields */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
              <Input
                label="First name"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <Input
                label="Last name"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
              <Input
                label="Email address"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Phone number"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />

              {/* Gender */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 cursor-pointer">Gender</label>
                <div className="relative">
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value as StaffFormData["gender"] })
                    }
                    className={selectClass}
                    required
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              {/* Role */}
             {/* Role */}
<div className="flex flex-col gap-1.5">
  <label className="text-xs font-semibold text-slate-700">Role</label>
  <div className="relative">
    <select
      value={formData.role}
      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      className={`${selectClass} ${!formData.role ? "text-slate-400 cursor-pointer" : ""}`}
      required
    >
      <option value="" disabled>
        Select role
      </option>
      <option value="ADMIN" className="text-slate-900">Admin</option>
      <option value="HR" className="text-slate-900">Human Resources</option>
      <option value="STAFF" className="text-slate-900">Staff</option>
    </select>
    <ChevronIcon />
  </div>
</div>

              {/* Designation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Designation</label>
                <div className="relative">
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className={`${selectClass} ${!formData.designation ? "text-slate-400 cursor-pointer" : ""}`}
                    required
                  >
                    <option value="" disabled>
                      Select designation
                    </option>
                    <option value="Operations" className="text-slate-900">Frontend Developer</option>
                    <option value="Management" className="text-slate-900">Backend Developer</option>
                    <option value="Customer Service" className="text-slate-900">UI/UX Designer</option>
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              <Input
                label="Staff ID"
                placeholder="Staff ID"
                value={formData.staffId}
                onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                required
              />
              <Input
                label="Official email"
                placeholder="Official email"
                value={formData.officialEmail}
                onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-6 border-t border-slate-100">
            <Link href="/staff" className="sm:w-auto">
              <Button type="button" variant="outline" className="w-full sm:w-auto px-6 py-2.5">
                Cancel
              </Button>
            </Link>
            <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto px-8 py-2.5">
              {isEditMode ? "Update Staff" : "Add Staff"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function ChevronIcon() {
  return (
    <svg
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}