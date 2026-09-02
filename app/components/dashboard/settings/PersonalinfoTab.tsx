"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Camera, Upload } from "lucide-react";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useUploadProfilePhotoMutation,
} from "@/app/redux/dashboard/settingsApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export const PersonalInfoTab: React.FC = () => {
  const { data, isLoading } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadPhoto, { isLoading: isUploading }] = useUploadProfilePhotoMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (data?.data) {
      const profile = data.data;
      setEmail(profile.email);
      setFirstName(profile.firstName ?? profile.staff?.firstName ?? "");
      setLastName(profile.lastName ?? profile.staff?.lastName ?? "");
      setPhone(profile.staff?.phone ?? "");
    }
  }, [data]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      await uploadPhoto(formData).unwrap();
      toast.success("Profile picture updated");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload photo.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ firstName, lastName, email, phone }).unwrap();
      toast.success("Profile updated successfully! 🎉");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <div className="h-40 bg-slate-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  const profile = data?.data;
  const hasStaff = !!profile?.staff;
  const profileImage = profile?.profileImage ?? profile?.staff?.profileImage;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
        <p className="text-xs text-slate-400 mt-1">Update your photo and personal details</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full bg-slate-100 ring-4 ring-white shadow-sm border border-slate-200 overflow-hidden group shrink-0">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <Camera size={22} />
              </div>
            )}
            <label
              htmlFor="photo-upload"
              className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            >
              <Upload size={18} className="text-white" />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handlePhotoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isUploading}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {isUploading ? "Uploading..." : "Profile photo"}
            </p>
            <p className="text-xs text-slate-400 mt-1">JPG, JPEG or PNG. Max 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className={labelClass}>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
              placeholder="Enter last name"
            />
          </div>
          <div>
            <label className={labelClass}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className={labelClass}>Phone number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              disabled={!hasStaff}
              placeholder={hasStaff ? "Enter phone number" : "Not available"}
            />
          </div>
        </div>

        {profile?.staff && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <p className="text-slate-400 font-semibold">Staff ID</p>
              <p className="text-slate-800 font-bold mt-0.5">{profile.staff.staffId}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Designation</p>
              <p className="text-slate-800 font-bold mt-0.5">{profile.staff.designation ?? "—"}</p>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isUpdating}
            className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-sm rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};