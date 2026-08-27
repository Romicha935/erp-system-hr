import { baseApi } from "../../api/baseApi";



export interface TaxDefinition {
  id: string;
  taxType: string;
  percentage: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaxDefinitionResponse {
  message: string;
  data: TaxDefinition;
}

export interface TaxDefinitionListResponse {
  message: string;
  data: TaxDefinition[];
}

export interface CreateTaxDefinitionRequest {
  taxType: string;
  percentage:  number;
}

export interface UpdateTaxDefinitionRequest {
  id: string;
  data: Partial<CreateTaxDefinitionRequest>;
}

export const taxDefinitionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getTaxDefinitions: builder.query<TaxDefinitionListResponse, void>({
      query: () => ({
        url: "/tax-definition",
        method: "GET",
      }),
      providesTags: ["TaxDefinition"],
    }),

    getTaxDefinitionById: builder.query<TaxDefinitionResponse, string>({
      query: (id) => ({
        url: `/tax-definition/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "TaxDefinition", id }],
    }),

   
    createTaxDefinition: builder.mutation<
      TaxDefinitionResponse,
      CreateTaxDefinitionRequest
    >({
      query: (body) => ({
        url: "/tax-definition",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TaxDefinition"],
    }),

    updateTaxDefinition: builder.mutation<
      TaxDefinitionResponse,
      UpdateTaxDefinitionRequest
    >({
      query: ({ id, data }) => ({
        url: `/tax-definition/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "TaxDefinition",
        { type: "TaxDefinition", id },
      ],
    }),

  
    deleteTaxDefinition: builder.mutation<
      { message: string },
      string
    >({
      query: (id) => ({
        url: `/tax-definition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TaxDefinition"],
    }),
  }),
});

// Auto-generated hooks export
export const {
  useGetTaxDefinitionsQuery,
  useGetTaxDefinitionByIdQuery,
  useCreateTaxDefinitionMutation,
  useUpdateTaxDefinitionMutation,
  useDeleteTaxDefinitionMutation,
} = taxDefinitionApi;