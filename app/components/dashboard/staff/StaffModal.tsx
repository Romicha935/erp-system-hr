"use client";

import React, { useState } from "react";
import Link from "next/link";
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
      phoneNumber: "",
      gender: "",
      role: "",
      designation: "",
      staffId: "",
      photo: null,
    }
  );

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/staff" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline">
        ← Back
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">
          {isEditMode ? "Edit Staff Details" : "Add a New Staff"}
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Photo Upload Area */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <div className="relative w-36 h-36 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden mb-4">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-slate-400 p-2">
                  <span className="text-3xl block mb-1">📷</span>
                  <span className="text-xs font-semibold">Upload photo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-xs font-medium text-slate-500">Allowed format</p>
            <p className="text-xs text-slate-400">JPG, JPEG, and PNG</p>
            <p className="text-xs text-slate-400 mt-2">Max file size: 2MB</p>
          </div>

          {/* Input Fields */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />

            {/* Select Gender */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <Input
              label="Phone number 2"
              placeholder="Enter phone number"
            />

            {/* Select Role */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                required
              >
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="I.T">I.T</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>

            {/* Select Designation */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Designation</label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                required
              >
                <option value="">Select designation</option>
                <option value="Operations">Operations</option>
                <option value="Management">Management</option>
                <option value="Customer Service">Customer Service</option>
              </select>
            </div>

            <Input
              label="Staff ID"
              placeholder="Staff ID"
              value={formData.staffId}
              onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
            />
            <Input
              label="Official email"
              placeholder="Official Email"
              value={formData.officialEmail}
              onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
            />

            <div className="sm:col-span-2 mt-4">
              <Button type="submit" isLoading={isLoading} className="w-full py-3">
                {isEditMode ? "Update Staff" : "Add Staff"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};