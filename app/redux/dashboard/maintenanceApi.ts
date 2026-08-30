import { baseApi } from "../api/baseApi";

export type MaintenanceType = "RECURRING" | "ONE_TIME";
export type MaintenanceStatus = "PENDING" | "COMPLETED" | "OVERDUE";

export interface MaintenanceCreatorSummary {
  id: string;
  email: string;
  role: string;
}

export interface Maintenance {
  id: string;
  itemName: string;
  quantity: number;
  scheduledDate: string;
  maintenanceType: MaintenanceType;
  recurringOption: string | null;
  status: MaintenanceStatus;
  attachmentUrl: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: MaintenanceCreatorSummary;
}

export interface MaintenanceListResponse {
  data: Maintenance[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MaintenanceResponse {
  data: Maintenance;
}

export interface CreateMaintenanceResponse {
  message: string;
  data: Maintenance;
}

export interface UpdateMaintenanceResponse {
  message: string;
  data: Maintenance;
}

export interface GetMaintenancesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: MaintenanceStatus;
  month?: number;
  year?: number;
}

export interface CreateMaintenanceRequest {
  itemName: string;
  quantity: number;
  scheduledDate: string;
  maintenanceType: MaintenanceType;
  recurringOption?: string;
}

export interface UpdateMaintenanceRequest {
  id: string;
  data: Partial<{
    status: MaintenanceStatus;
    attachmentUrl: string;
  }>;
}

export const maintenanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMaintenances: builder.query<MaintenanceListResponse, GetMaintenancesParams | void>({
      query: (params) => ({
        url: "/maintenance",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({ type: "Maintenance" as const, id: item.id })),
              { type: "Maintenance" as const, id: "LIST" },
            ]
          : [{ type: "Maintenance" as const, id: "LIST" }],
    }),

    getMaintenanceById: builder.query<MaintenanceResponse, string>({
      query: (id) => ({
        url: `/maintenance/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Maintenance", id }],
    }),

    createMaintenance: builder.mutation<CreateMaintenanceResponse, CreateMaintenanceRequest>({
      query: (body) => ({
        url: "/maintenance",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Maintenance", id: "LIST" }],
    }),

    updateMaintenance: builder.mutation<UpdateMaintenanceResponse, UpdateMaintenanceRequest>({
      query: ({ id, data }) => ({
        url: `/maintenance/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Maintenance", id },
        { type: "Maintenance", id: "LIST" },
      ],
    }),

    deleteMaintenance: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/maintenance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Maintenance", id },
        { type: "Maintenance", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetMaintenancesQuery,
  useGetMaintenanceByIdQuery,
  useCreateMaintenanceMutation,
  useUpdateMaintenanceMutation,
  useDeleteMaintenanceMutation,
} = maintenanceApi;