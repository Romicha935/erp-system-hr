import { baseApi } from "../api/baseApi";

export interface StaffProfile {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  officialEmail: string | null;
  designation: string | null;
  profileImage: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  role: string;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  staff: StaffProfile | null;
}

export interface ProfileResponse {
  data: UserProfile;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<ProfileResponse, void>({
      query: () => ({ url: "/profile/me", method: "GET" }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
      query: (body) => ({ url: "/profile/me", method: "PATCH", body }),
      invalidatesTags: ["Profile"],
    }),

    changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
      query: (body) => ({ url: "/profile/me/password", method: "PATCH", body }),
    }),

    uploadProfilePhoto: builder.mutation<ProfileResponse, FormData>({
      query: (formData) => ({
        url: "/profile/me/photo",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadProfilePhotoMutation,
} = profileApi;