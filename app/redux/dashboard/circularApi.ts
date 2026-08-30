import { baseApi } from "../api/baseApi";

export type CircularFilterType = "SENT" | "RECEIVED";

export const CIRCULAR_GROUPS = [
  "Operations Staffs",
  "HR Staffs",
  "All Staff",
] as const;

export interface CircularSenderSummary {
  id: string;
  email: string;
  role: string;
}

export interface Circular {
  id: string;
  title: string;
  message: string;
  sentToGroup: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
  sender: CircularSenderSummary;
}

export interface CircularListResponse {
  data: Circular[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CircularResponse {
  data: Circular;
}

export interface CreateCircularResponse {
  message: string;
  data: Circular;
}

export interface GetCircularsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: CircularFilterType;
}

export interface CreateCircularRequest {
  title: string;
  message: string;
  sentToGroup: string;
}

export const circularApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCirculars: builder.query<CircularListResponse, GetCircularsParams | void>({
      query: (params) => ({
        url: "/circulars",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({ type: "Circular" as const, id: item.id })),
              { type: "Circular" as const, id: "LIST" },
            ]
          : [{ type: "Circular" as const, id: "LIST" }],
    }),

    getCircularById: builder.query<CircularResponse, string>({
      query: (id) => ({
        url: `/circulars/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Circular", id }],
    }),

    createCircular: builder.mutation<CreateCircularResponse, CreateCircularRequest>({
      query: (body) => ({
        url: "/circulars",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Circular", id: "LIST" }],
    }),

    deleteCircular: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/circulars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Circular", id },
        { type: "Circular", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCircularsQuery,
  useGetCircularByIdQuery,
  useCreateCircularMutation,
  useDeleteCircularMutation,
} = circularApi;