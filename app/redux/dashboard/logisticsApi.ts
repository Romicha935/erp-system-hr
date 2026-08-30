import { baseApi } from "../api/baseApi";

export type LogisticsStatus = "PENDING" | "APPROVED" | "REJECTED";
export type LogisticsActionType = "APPROVE" | "REJECT";

export interface LogisticsStaffSummary {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
}

export interface LogisticsBeneficiary {
  id: string;
  logisticsRequestId: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
}

export interface LogisticsRequest {
  id: string;
  title: string;
  purpose: string;
  amount: string;
  dateFrom: string;
  dateTo: string;
  status: LogisticsStatus;
  requestedById: string;
  sentToId: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
  requestedBy: LogisticsStaffSummary;
  sentTo: LogisticsStaffSummary;
  beneficiary: LogisticsBeneficiary;
}

export interface LogisticsListResponse {
  data: LogisticsRequest[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LogisticsResponse {
  data: LogisticsRequest;
}

export interface CreateLogisticsResponse {
  message: string;
  data: LogisticsRequest;
}

export interface LogisticsActionResponse {
  message: string;
  data: LogisticsRequest;
}

export interface GetLogisticsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: LogisticsStatus;
}

export interface CreateLogisticsRequest {
  title: string;
  purpose: string;
  amount: number;
  requestedById: string;
  sentToId: string;
  dateFrom: string;
  dateTo: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
}

export interface LogisticsActionRequest {
  id: string;
  action: LogisticsActionType;
  remarks?: string;
}

export const logisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLogistics: builder.query<LogisticsListResponse, GetLogisticsParams | void>({
      query: (params) => ({
        url: "/logistics",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({ type: "Logistics" as const, id: item.id })),
              { type: "Logistics" as const, id: "LIST" },
            ]
          : [{ type: "Logistics" as const, id: "LIST" }],
    }),

    getLogisticsById: builder.query<LogisticsResponse, string>({
      query: (id) => ({
        url: `/logistics/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Logistics", id }],
    }),

    createLogistics: builder.mutation<CreateLogisticsResponse, CreateLogisticsRequest>({
      query: (body) => ({
        url: "/logistics",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Logistics", id: "LIST" }],
    }),

    actionLogistics: builder.mutation<LogisticsActionResponse, LogisticsActionRequest>({
      query: ({ id, action, remarks }) => ({
        url: `/logistics/${id}/action`,
        method: "PATCH",
        body: { action, remarks },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Logistics", id },
        { type: "Logistics", id: "LIST" },
      ],
    }),

    deleteLogistics: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/logistics/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Logistics", id },
        { type: "Logistics", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetLogisticsQuery,
  useGetLogisticsByIdQuery,
  useCreateLogisticsMutation,
  useActionLogisticsMutation,
  useDeleteLogisticsMutation,
} = logisticsApi;