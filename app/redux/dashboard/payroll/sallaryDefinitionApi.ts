import { baseApi } from "../../api/baseApi";

export interface StaffSummary {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
}

export interface SalaryDefinition {
  id: string;
  staffId: string;
  basicSalary: string;
  housingAllowance: string;
  transportAllowance: string;
  utilityAllowance: string;
  productivityAllowance: string;
  communicationAllowance: string;
  inconvenienceAllowance: string;
  tax: string;
  pension: string;
  deductions: string;
  grossSalary: string;
  netSalary: string;
  createdAt: string;
  updatedAt: string;
  staff: StaffSummary;
}

export interface SalaryDefinitionResponse {
  message: string;
  data: SalaryDefinition;
}

export interface SalaryDefinitionListResponse {
  message: string;
  data: SalaryDefinition[];
}

export interface CreateSalaryDefinitionRequest {
  staffId: string;
  basicSalary: string | number;
  housingAllowance: string | number;
  transportAllowance: string | number;
  utilityAllowance: string | number;
  productivityAllowance: string | number;
  communicationAllowance: string | number;
  inconvenienceAllowance: string | number;
  deductions: string| number;
  tax?: string | number;
  pension?: string | number;
}

export interface UpdateSalaryDefinitionRequest {
  id: string;
  data: Partial<CreateSalaryDefinitionRequest>;
}

export const salaryDefinitionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalaryDefinitions: builder.query<SalaryDefinitionListResponse, void>({
      query: () => ({
        url: "/salary-definition",
        method: "GET",
      }),
      providesTags: ["SalaryDefinition"],
    }),

    getSalaryDefinitionById: builder.query<SalaryDefinitionResponse, string>({
      query: (id) => ({
        url: `/salary-definition/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SalaryDefinition", id }],
    }),

    createSalaryDefinition: builder.mutation<SalaryDefinitionResponse, CreateSalaryDefinitionRequest>({
      query: (body) => ({
        url: "/salary-definition",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SalaryDefinition"],
    }),

    updateSalaryDefinition: builder.mutation<SalaryDefinitionResponse, UpdateSalaryDefinitionRequest>({
      query: (arg) => ({
        url: `/salary-definition/${arg.id}`,
        method: "PATCH",
        body: arg.data,
      }),
      invalidatesTags: (result, error, arg) => [
        "SalaryDefinition",
        { type: "SalaryDefinition", id: arg.id },
      ],
    }),

    deleteSalaryDefinition: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/salary-definition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SalaryDefinition"],
    }),
  }),
});

export const {
  useGetSalaryDefinitionsQuery,
  useGetSalaryDefinitionByIdQuery,
  useCreateSalaryDefinitionMutation,
  useUpdateSalaryDefinitionMutation,
  useDeleteSalaryDefinitionMutation,
} = salaryDefinitionApi;