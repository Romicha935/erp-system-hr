import { baseApi } from "../../api/baseApi";

export interface PayslipStaffSummary {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
}

export interface Payslip {
  id: string;
  staffId: string;
  month: number;
  year: number;
  basicSalary: string;
  housingAllowance: string;
  transportAllowance: string;
  utilityAllowance: string;
  productivityAllowance: string;
  communicationAllowance: string;
  inconvenienceAllowance: string;
  grossSalary: string;
  totalDeduction: string;
  tax: string;
  pension: string;
  deductions: string;
  netSalary: string;
  createdAt: string;
  updatedAt: string;
  staff: PayslipStaffSummary;
}

export interface PayslipResponse {
  message: string;
  data: Payslip;
}

export interface PayslipListResponse {
  message: string;
  data: Payslip[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface GetPayslipsParams {
  page?: number;
  limit?: number;
  staffId?: string;
  month?: number;
  year?: number;
}

export interface CreatePayslipRequest {
  staffId: string;
  month: number;
  year: number;
}

export interface UpdatePayslipRequest {
  id: string;
  data: Partial<{
    basicSalary: string | number;
    housingAllowance: string | number;
    transportAllowance: string | number;
    utilityAllowance: string | number;
    productivityAllowance: string | number;
    communicationAllowance: string | number;
    inconvenienceAllowance: string | number;
    tax: string | number;
    pension: string | number;
    deductions: string | number;
  }>;
}

export const payslipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayslips: builder.query<PayslipListResponse, GetPayslipsParams | void>({
      query: (params) => ({
        url: "/payslips",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({ type: "Payslip" as const, id: item.id })),
              { type: "Payslip" as const, id: "LIST" },
            ]
          : [{ type: "Payslip" as const, id: "LIST" }],
    }),

    getPayslipById: builder.query<PayslipResponse, string>({
      query: (id) => ({
        url: `/payslips/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Payslip", id }],
    }),

    createPayslip: builder.mutation<PayslipResponse, CreatePayslipRequest>({
      query: (body) => ({
        url: "/payslips",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Payslip", id: "LIST" }],
    }),

    updatePayslip: builder.mutation<PayslipResponse, UpdatePayslipRequest>({
      query: ({ id, data }) => ({
        url: `/payslips/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Payslip", id },
        { type: "Payslip", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPayslipsQuery,
  useGetPayslipByIdQuery,
  useCreatePayslipMutation,
  useUpdatePayslipMutation,
} = payslipApi;