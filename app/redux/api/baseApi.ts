import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://ery-system-backend.onrender.com",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          headers: { Authorization: `Bearer ${refreshToken}` },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data as { accessToken: string; refreshToken: string };

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Staff",
    "TaxDefinition",
    "SalaryDefinition",
    "Procurement",
    "Payslip",
    "Payroll",
    "PaymentVoucher",
    "Memo",
    "Circular",
    "Maintenance",
    "Logistics",
    "Budget",
    "Inventory",
    "Notification",
    "Training",
    "Profile",
    "Leave",
    "Attendance",
    "Employee",
    "Department",
    "Designation",
    "Role",
    "Permission",
  ],
  endpoints: () => ({}),
});


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "api",

//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,

//     prepareHeaders: (headers) => {
  
//       const accessToken = localStorage.getItem("accessToken");

//       if (accessToken) {
//         headers.set("Authorization", `Bearer ${accessToken}`);
//       }

//       return headers;
//     },
//   }),

// tagTypes: ["Staff", "TaxDefinition", "SalaryDefinition", "Procurement", "Payslip", "Payroll","PaymentVoucher","Memo","Circular","Maintenance","Logistics","Budget","Inventory","Notification","Training","Profile","Leave","Attendance","Employee","Department","Designation","Role","Permission"],
//   endpoints: () => ({}),
// });