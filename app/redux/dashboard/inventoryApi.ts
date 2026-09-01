import { baseApi } from "../api/baseApi";

export type InventoryType = "STOCK" | "INVENTORY";
export type StatusType = "success" | "warning" | "danger";

export interface InventoryItem {
  id: string;
  type: InventoryType;
  productName: string;
  productId: string;
  category: string;
  qtyPurchased: number;
  unitPrice: string;
  supplier: string;
  imageUrl: string | null;
  quantityInStock: number | null;
  totalUnits: number | null;
  functioningUnits: number | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  status: string;
  statusType: StatusType;
}

export interface InventoryListResponse {
  data: InventoryItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface InventoryResponse {
  data: InventoryItem;
}

export interface CreateInventoryResponse {
  message: string;
  data: InventoryItem;
}

export interface UpdateInventoryResponse {
  message: string;
  data: InventoryItem;
}

export interface StockSummary {
  categories: number;
  totalItems: number;
  totalCost: number;
  lowInStock: number;
}

export interface InventorySummary {
  categories: number;
  totalItems: number;
  totalCost: number;
  suppliers: number;
}

export interface StockSummaryResponse {
  data: StockSummary;
}

export interface InventorySummaryResponse {
  data: InventorySummary;
}

export interface GetInventoryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: InventoryType;
  category?: string;
}

export interface CreateInventoryRequest {
  type: InventoryType;
  productName: string;
  productId: string;
  category: string;
  qtyPurchased: number;
  unitPrice: number;
  supplier: string;
  imageUrl?: string;
  quantityInStock?: number;
  totalUnits?: number;
  functioningUnits?: number;
}

export interface UpdateInventoryRequest {
  id: string;
  data: Partial<Omit<CreateInventoryRequest, "type">>;
}

export type CreateInventoryItemInput = FormData | CreateInventoryRequest;

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryItems: builder.query<InventoryListResponse, GetInventoryParams | void>({
      query: (params) => ({
        url: "/inventory",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({ type: "Inventory" as const, id: item.id })),
              { type: "Inventory" as const, id: "LIST" },
            ]
          : [{ type: "Inventory" as const, id: "LIST" }],
    }),

    getStockSummary: builder.query<StockSummaryResponse, void>({
      query: () => ({
        url: "/inventory/summary",
        method: "GET",
        params: { type: "STOCK" },
      }),
      providesTags: [{ type: "Inventory", id: "STOCK_SUMMARY" }],
    }),

    getInventorySummary: builder.query<InventorySummaryResponse, void>({
      query: () => ({
        url: "/inventory/summary",
        method: "GET",
        params: { type: "INVENTORY" },
      }),
      providesTags: [{ type: "Inventory", id: "INVENTORY_SUMMARY" }],
    }),

    getInventoryItemById: builder.query<InventoryResponse, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Inventory", id }],
    }),

    createInventoryItem: builder.mutation<CreateInventoryResponse, CreateInventoryItemInput>({
      query: (body) => ({
        url: "/inventory",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Inventory", id: "LIST" },
        { type: "Inventory", id: "STOCK_SUMMARY" },
        { type: "Inventory", id: "INVENTORY_SUMMARY" },
      ],
    }),

    updateInventoryItem: builder.mutation<UpdateInventoryResponse, UpdateInventoryRequest>({
      query: ({ id, data }) => ({
        url: `/inventory/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Inventory", id },
        { type: "Inventory", id: "LIST" },
        { type: "Inventory", id: "STOCK_SUMMARY" },
        { type: "Inventory", id: "INVENTORY_SUMMARY" },
      ],
    }),

    deleteInventoryItem: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Inventory", id },
        { type: "Inventory", id: "LIST" },
        { type: "Inventory", id: "STOCK_SUMMARY" },
        { type: "Inventory", id: "INVENTORY_SUMMARY" },
      ],
    }),
  }),
});

export const {
  useGetInventoryItemsQuery,
  useGetStockSummaryQuery,
  useGetInventorySummaryQuery,
  useGetInventoryItemByIdQuery,
  useCreateInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useDeleteInventoryItemMutation,
} = inventoryApi;



// import { baseApi } from "../api/baseApi";

// export type InventoryType = "STOCK" | "INVENTORY";
// export type StatusType = "success" | "warning" | "danger";

// export interface InventoryItem {
//   id: string;
//   type: InventoryType;
//   productName: string;
//   productId: string;
//   category: string;
//   qtyPurchased: number;
//   unitPrice: string;
//   supplier: string;
//   imageUrl: string | null;
//   quantityInStock: number | null;
//   totalUnits: number | null;
//   functioningUnits: number | null;
//   createdById: string;
//   createdAt: string;
//   updatedAt: string;
//   totalAmount: number;
//   status: string;
//   statusType: StatusType;
// }

// export interface InventoryListResponse {
//   data: InventoryItem[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//   };
// }

// export interface InventoryResponse {
//   data: InventoryItem;
// }

// export interface CreateInventoryResponse {
//   message: string;
//   data: InventoryItem;
// }

// export interface UpdateInventoryResponse {
//   message: string;
//   data: InventoryItem;
// }

// export interface StockSummary {
//   categories: number;
//   totalItems: number;
//   totalCost: number;
//   lowInStock: number;
// }

// export interface InventorySummary {
//   categories: number;
//   totalItems: number;
//   totalCost: number;
//   suppliers: number;
// }

// export interface StockSummaryResponse {
//   data: StockSummary;
// }

// export interface InventorySummaryResponse {
//   data: InventorySummary;
// }

// export interface GetInventoryParams {
//   page?: number;
//   limit?: number;
//   search?: string;
//   type?: InventoryType;
//   category?: string;
// }

// export interface CreateInventoryRequest {
//   type: InventoryType;
//   productName: string;
//   productId: string;
//   category: string;
//   qtyPurchased: number;
//   unitPrice: number;
//   supplier: string;
//   imageUrl?: string;
//   quantityInStock?: number;
//   totalUnits?: number;
//   functioningUnits?: number;
// }

// export interface UpdateInventoryRequest {
//   id: string;
//   data: Partial<Omit<CreateInventoryRequest, "type">>;
// }

// export const inventoryApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getInventoryItems: builder.query<InventoryListResponse, GetInventoryParams | void>({
//       query: (params) => ({
//         url: "/inventory",
//         method: "GET",
//         params: params || undefined,
//       }),
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.data.map((item) => ({ type: "Inventory" as const, id: item.id })),
//               { type: "Inventory" as const, id: "LIST" },
//             ]
//           : [{ type: "Inventory" as const, id: "LIST" }],
//     }),

//     getStockSummary: builder.query<StockSummaryResponse, void>({
//       query: () => ({
//         url: "/inventory/summary",
//         method: "GET",
//         params: { type: "STOCK" },
//       }),
//       providesTags: [{ type: "Inventory", id: "STOCK_SUMMARY" }],
//     }),

//     getInventorySummary: builder.query<InventorySummaryResponse, void>({
//       query: () => ({
//         url: "/inventory/summary",
//         method: "GET",
//         params: { type: "INVENTORY" },
//       }),
//       providesTags: [{ type: "Inventory", id: "INVENTORY_SUMMARY" }],
//     }),

//     getInventoryItemById: builder.query<InventoryResponse, string>({
//       query: (id) => ({
//         url: `/inventory/${id}`,
//         method: "GET",
//       }),
//       providesTags: (_result, _error, id) => [{ type: "Inventory", id }],
//     }),

//     createInventoryItem: builder.mutation<CreateInventoryResponse, CreateInventoryRequest>({
//       query: (body) => ({
//         url: "/inventory",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: [
//         { type: "Inventory", id: "LIST" },
//         { type: "Inventory", id: "STOCK_SUMMARY" },
//         { type: "Inventory", id: "INVENTORY_SUMMARY" },
//       ],
//     }),

//     updateInventoryItem: builder.mutation<UpdateInventoryResponse, UpdateInventoryRequest>({
//       query: ({ id, data }) => ({
//         url: `/inventory/${id}`,
//         method: "PATCH",
//         body: data,
//       }),
//       invalidatesTags: (_result, _error, { id }) => [
//         { type: "Inventory", id },
//         { type: "Inventory", id: "LIST" },
//         { type: "Inventory", id: "STOCK_SUMMARY" },
//         { type: "Inventory", id: "INVENTORY_SUMMARY" },
//       ],
//     }),

//     deleteInventoryItem: builder.mutation<{ message: string }, string>({
//       query: (id) => ({
//         url: `/inventory/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (_result, _error, id) => [
//         { type: "Inventory", id },
//         { type: "Inventory", id: "LIST" },
//         { type: "Inventory", id: "STOCK_SUMMARY" },
//         { type: "Inventory", id: "INVENTORY_SUMMARY" },
//       ],
//     }),
//   }),
// });

// export const {
//   useGetInventoryItemsQuery,
//   useGetStockSummaryQuery,
//   useGetInventorySummaryQuery,
//   useGetInventoryItemByIdQuery,
//   useCreateInventoryItemMutation,
//   useUpdateInventoryItemMutation,
//   useDeleteInventoryItemMutation,
// } = inventoryApi;