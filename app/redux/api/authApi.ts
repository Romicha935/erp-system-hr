import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<{ message: string }, void>({
  query: () => ({
    url: "/auth/logout",
    method: "POST",
  }),
}),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;