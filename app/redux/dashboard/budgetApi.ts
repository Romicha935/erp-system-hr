import { baseApi } from "../api/baseApi";

export type BudgetStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface BudgetCreatorSummary {
  id: string;
  email: string;
  role: string;
}

export interface Budget {
  id: string;
  budgetNo: string;
  description: string;
  budgetedAmount: string;
  actualAmount: string | null;
  receivingOffice: string | null;
  status: BudgetStatus;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: BudgetCreatorSummary;
  variance: number | null;
  isPositiveVariance: boolean | null;
}

export interface BudgetListResponse {
  data: Budget[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BudgetResponse {
  data: Budget;
}

export interface CreateBudgetResponse {
  message: string;
  data: Budget;
}

export interface UpdateBudgetResponse {
  message: string;
  data: Budget;
}

export interface BudgetSummary {
  totalAnnualBudget: number;
  amountUsedYTD: number;
  totalBalance: number;
  percentUsed: number;
}

export interface BudgetSummaryResponse {
  data: BudgetSummary;
}

export interface GetBudgetsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: BudgetStatus;
}

export interface CreateBudgetRequest {
  budgetNo: string;
  description: string;
  budgetedAmount: number;
  receivingOffice?: string;
}

export interface UpdateBudgetRequest {
  id: string;
  data: Partial<{
    actualAmount: number;
    status: BudgetStatus;
  }>;
}

export const budgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query<BudgetListResponse, GetBudgetsParams | void>({
      query: (params) => ({
        url: "/budgets",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({ type: "Budget" as const, id: item.id })),
              { type: "Budget" as const, id: "LIST" },
            ]
          : [{ type: "Budget" as const, id: "LIST" }],
    }),

    getBudgetSummary: builder.query<BudgetSummaryResponse, void>({
      query: () => ({
        url: "/budgets/summary",
        method: "GET",
      }),
      providesTags: [{ type: "Budget", id: "SUMMARY" }],
    }),

    getBudgetById: builder.query<BudgetResponse, string>({
      query: (id) => ({
        url: `/budgets/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Budget", id }],
    }),

    createBudget: builder.mutation<CreateBudgetResponse, CreateBudgetRequest>({
      query: (body) => ({
        url: "/budgets",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Budget", id: "LIST" },
        { type: "Budget", id: "SUMMARY" },
      ],
    }),

    updateBudget: builder.mutation<UpdateBudgetResponse, UpdateBudgetRequest>({
      query: ({ id, data }) => ({
        url: `/budgets/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Budget", id },
        { type: "Budget", id: "LIST" },
        { type: "Budget", id: "SUMMARY" },
      ],
    }),

    deleteBudget: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/budgets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Budget", id },
        { type: "Budget", id: "LIST" },
        { type: "Budget", id: "SUMMARY" },
      ],
    }),
  }),
});

export const {
  useGetBudgetsQuery,
  useGetBudgetSummaryQuery,
  useGetBudgetByIdQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = budgetApi;