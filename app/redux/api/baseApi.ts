import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders: (headers) => {
  
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),

tagTypes: ["Staff", "TaxDefinition", "SalaryDefinition", "Procurement", "Payslip", "Payroll","PaymentVoucher","Memo"],
  endpoints: () => ({}),
});