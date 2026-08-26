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
  staffId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  officialEmail: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  role: string;
  designation: string;
  photo?: File | null;
}