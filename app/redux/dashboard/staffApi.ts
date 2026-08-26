import { baseApi } from "../api/baseApi";


export interface Staff {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  officialEmail: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  profileImage?: string | null;
  role: string;
  designation: string;
  createdAt: string;
  updatedAt: string;
}

export interface StaffListResponse {
  data: Staff[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateStaffRequest {
  staffId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  officialEmail: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  profileImage?: string;
  role: string;
  designation: string;
}

export interface UpdateStaffRequest {
  id: string;
  data: Partial<CreateStaffRequest>;
}

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /staff
    getStaff: builder.query<
      StaffListResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "/staff",
        method: "GET",
        params: params || undefined,
      }),

      providesTags: ["Staff"],
    }),

    // GET /staff/:id
    getStaffById: builder.query<Staff, string>({
      query: (id) => ({
        url: `/staff/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, id) => [
        { type: "Staff", id },
      ],
    }),

    // POST /staff
  // POST /staff
createStaff: builder.mutation<Staff, FormData | CreateStaffRequest>({
  query: (body) => ({
    url: "/staff",
    method: "POST",
    body,
  }),
  invalidatesTags: ["Staff"],
}),

    // PATCH /staff/:id
    updateStaff: builder.mutation<Staff, UpdateStaffRequest>({
      query: ({ id, data }) => ({
        url: `/staff/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "Staff",
        { type: "Staff", id },
      ],
    }),

    // DELETE /staff/:id
    deleteStaff: builder.mutation<
      { message: string },
      string
    >({
      query: (id) => ({
        url: `/staff/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useGetStaffByIdQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApi;