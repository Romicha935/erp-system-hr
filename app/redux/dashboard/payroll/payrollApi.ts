import { baseApi } from "../../api/baseApi";

export type PayrollStatus = "DRAFT" | "PROCESSED" | "PAID";

export interface PayrollItemStaffSummary {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
}

export interface PayrollItem {
  id: string;
  payrollRunId: string;
  staffId: string;
  basicSalary: string;
  housingAllowance: string;
  transportAllowance: string;
  utilityAllowance: string;
  productivityAllowance: string;
  communicationAllowance: string;
  inconvenienceAllowance: string;
  grossSalary: string;
  tax: string;
  pension: string;
  deductions: string;
  netSalary: string;
  createdAt: string;
  updatedAt: string;
  staff?: PayrollItemStaffSummary;
}

export interface Payroll {
  id: string;
  paymentName: string;
  designation: string;
  month: number;
  year: number;
  status: PayrollStatus;
  createdAt: string;
  updatedAt: string;
  items: PayrollItem[];
}

export interface PayrollResponse {
  message: string;
  data: Payroll;
}

export interface PayrollListResponse {
  message: string;
  data: Payroll[];
}

export interface GetPayrollsParams {
  page?: number;
  limit?: number;
  month?: number;
  year?: number;
  status?: PayrollStatus;
}

export interface CreatePayrollRequest {
  paymentName: string;
  designation: string;
  month: number;
  year: number;
}

export interface UpdatePayrollRequest {
  id: string;
  data: Partial<{
    paymentName: string;
    designation: string;
    month: number;
    year: number;
    status: PayrollStatus;
  }>;
}

export const payrollApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayrolls: builder.query<PayrollListResponse, GetPayrollsParams | void>({
      query: (params) => ({
        url: "/payroll",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({ type: "Payroll" as const, id: item.id })),
              { type: "Payroll" as const, id: "LIST" },
            ]
          : [{ type: "Payroll" as const, id: "LIST" }],
    }),

    getPayrollById: builder.query<PayrollResponse, string>({
      query: (id) => ({
        url: `/payroll/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Payroll", id }],
    }),

    createPayroll: builder.mutation<PayrollResponse, CreatePayrollRequest>({
      query: (body) => ({
        url: "/payroll",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Payroll", id: "LIST" }],
    }),

    updatePayroll: builder.mutation<PayrollResponse, UpdatePayrollRequest>({
      query: ({ id, data }) => ({
        url: `/payroll/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Payroll", id },
        { type: "Payroll", id: "LIST" },
      ],
    }),

    deletePayroll: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/payroll/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Payroll", id },
        { type: "Payroll", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPayrollsQuery,
  useGetPayrollByIdQuery,
  useCreatePayrollMutation,
  useUpdatePayrollMutation,
  useDeletePayrollMutation,
} = payrollApi;