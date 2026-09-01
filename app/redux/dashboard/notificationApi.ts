import { baseApi } from "../api/baseApi";

export interface Notification {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationGroup {
  group: string;
  items: Notification[];
}

export interface NotificationListResponse {
  data: NotificationGroup[];
  unreadCount: number;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  filter?: "all" | "unread";
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationListResponse, GetNotificationsParams | void>({
      query: (params) => ({
        url: "/notifications",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: [{ type: "Notification", id: "LIST" }],
    }),

    markNotificationAsRead: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),

    markAllNotificationsAsRead: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),

    deleteNotification: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),

    deleteAllNotifications: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/notifications/all",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
} = notificationApi;