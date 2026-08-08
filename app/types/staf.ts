export interface Staff {
  id: string;
  sn: string;
  firstName: string;
  lastName: string;
  email: string;
  officialEmail?: string;
  gender: "Male" | "Female" | "Other";
  staffId: string;
  phoneNumber: string;
  role: string;
  designation: string;
  avatarUrl?: string;
}

export interface StaffFormData {
  firstName: string;
  lastName: string;
  email: string;
  officialEmail: string;
  phoneNumber: string;
  gender: string;
  role: string;
  designation: string;
  staffId: string;
  photo?: File | null;
}