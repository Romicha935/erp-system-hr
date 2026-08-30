import { baseApi } from "../api/baseApi";

export type MemoStatus = "PENDING" | "APPROVED" | "REJECTED";
export type MemoActionType = "APPROVE" | "REJECT";
export type MemoFilterType = "SENT" | "RECEIVED";

export interface MemoUserSummary {
  id: string;
  email: string;
  role: string;
  staff?: {
    id: string;
    staffId: string;
    firstName: string;
    lastName: string;
    officialEmail: string;
  } | null;
}

export interface MemoStaffSummary {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Memo {
  id: string;
  title: string;
  message: string;
  senderId: string;
  receiverId: string;
  hasAttachment: boolean;
  attachmentType: string | null;
  attachmentUrl: string | null;
  action: string | null;
  remarks: string | null;
  status: MemoStatus;
  createdAt: string;
  updatedAt: string;
  sender: MemoUserSummary;
  receiver: MemoStaffSummary;
}

export interface MemoListResponse {
  data: Memo[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MemoResponse {
  data: Memo;
}

export interface CreateMemoResponse {
  message: string;
  data: Memo;
}

export interface GetMemosParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: MemoFilterType;
}

export interface CreateMemoRequest {
  title: string;
  message: string;
  receiverId: string;
  hasAttachment?: boolean;
  attachmentType?: string;
  attachmentUrl?: string;
  action?: string;
  remarks?: string;
}

export interface MemoActionRequest {
  id: string;
  action: MemoActionType;
  remarks?: string;
}

export interface MemoActionResponse {
  message: string;
  data: Memo;
}

export const memoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMemos: builder.query<MemoListResponse, GetMemosParams | void>({
      query: (params) => ({
        url: "/memos",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({ type: "Memo" as const, id: item.id })),
              { type: "Memo" as const, id: "LIST" },
            ]
          : [{ type: "Memo" as const, id: "LIST" }],
    }),

    getMemoById: builder.query<MemoResponse, string>({
      query: (id) => ({
        url: `/memos/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Memo", id }],
    }),

    createMemo: builder.mutation<CreateMemoResponse, CreateMemoRequest>({
      query: (body) => ({
        url: "/memos",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Memo", id: "LIST" }],
    }),

    actionMemo: builder.mutation<MemoActionResponse, MemoActionRequest>({
      query: ({ id, action, remarks }) => ({
        url: `/memos/${id}/action`,
        method: "POST",
        body: { action, remarks },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Memo", id },
        { type: "Memo", id: "LIST" },
      ],
    }),

    deleteMemo: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/memos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Memo", id },
        { type: "Memo", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetMemosQuery,
  useGetMemoByIdQuery,
  useCreateMemoMutation,
  useActionMemoMutation,
  useDeleteMemoMutation,
} = memoApi;