import { baseApi } from "../api/baseApi";

export type ProcurementStatus = "PENDING" | "APPROVED" | "REJECTED";
export type AttachmentType = "INVOICE" | "RECEIPT";

export interface ProcurementStaffSummary {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  officialEmail: string;
  role: string;
}

export interface Procurement {
  id: string;
  sn: string;
  item: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  status: ProcurementStatus;
  hasAttachment: boolean;
  attachmentType: AttachmentType | null;
  attachmentUrl: string | null;
  requestedById: string;
  sentToId: string;
  createdAt: string;
  updatedAt: string;
  requestedBy: ProcurementStaffSummary;
  sentTo: ProcurementStaffSummary;
}

export interface ProcurementListResponse {
  data: Procurement[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProcurementResponse {
  message: string;
  data: Procurement;
}

export interface GetProcurementsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProcurementStatus;
}

export interface CreateProcurementRequest {
  requestedById: string;
  sentToId: string;
  item: string;
  quantity: number;
  unitPrice: string | number;
  totalPrice: string | number;
  hasAttachment?: boolean;
  attachmentType?: AttachmentType;
  attachmentUrl?: string;
}

export const procurementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /procurement
    getProcurements: builder.query<
      ProcurementListResponse,
      GetProcurementsParams | void
    >({
      query: (params) => ({
        url: "/procurement",
        method: "GET",
        params: params || undefined,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({
                type: "Procurement" as const,
                id: item.id,
              })),
              {
                type: "Procurement" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "Procurement" as const,
                id: "LIST",
              },
            ],
    }),

    // GET /procurement/:id
    getProcurementById: builder.query<ProcurementResponse, string>({
      query: (id) => ({
        url: `/procurement/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, id) => [
        {
          type: "Procurement",
          id,
        },
      ],
    }),

    // POST /procurement
    createProcurement: builder.mutation<
      ProcurementResponse,
      CreateProcurementRequest
    >({
      query: (body) => ({
        url: "/procurement",
        method: "POST",
        body,
      }),

      invalidatesTags: [
        {
          type: "Procurement",
          id: "LIST",
        },
      ],
    }),

    // DELETE /procurement/:id
    deleteProcurement: builder.mutation<
      { message: string },
      string
    >({
      query: (id) => ({
        url: `/procurement/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, id) => [
        {
          type: "Procurement",
          id,
        },
        {
          type: "Procurement",
          id: "LIST",
        },
      ],
    }),

    // PATCH /procurement/:id/approve
    approveProcurement: builder.mutation<
      ProcurementResponse,
      string
    >({
      query: (id) => ({
        url: `/procurement/${id}/approve`,
        method: "PATCH",
      }),

      invalidatesTags: (_result, _error, id) => [
        {
          type: "Procurement",
          id,
        },
        {
          type: "Procurement",
          id: "LIST",
        },
      ],
    }),

    // PATCH /procurement/:id/reject
    rejectProcurement: builder.mutation<
      ProcurementResponse,
      string
    >({
      query: (id) => ({
        url: `/procurement/${id}/reject`,
        method: "PATCH",
      }),

      invalidatesTags: (_result, _error, id) => [
        {
          type: "Procurement",
          id,
        },
        {
          type: "Procurement",
          id: "LIST",
        },
      ],
    }),
  }),
});

export const {
  useGetProcurementsQuery,
  useGetProcurementByIdQuery,
  useCreateProcurementMutation,
  useDeleteProcurementMutation,
  useApproveProcurementMutation,
  useRejectProcurementMutation,
} = procurementApi;