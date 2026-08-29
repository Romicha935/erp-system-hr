
import { baseApi } from "../api/baseApi";

export type PaymentVoucherStatus =
  | "PENDING"
  | "VERIFIED"
  | "APPROVED"
  | "REJECTED";

interface StaffInfo {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  officialEmail: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  profileImage: string | null;
  role: string;
  designation: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentVoucher {
  id: string;
  procurementId: string;
  vatPercentage: string;
  vatAmount: string;
  grossAmount: string;

  initiatedById: string;
  verifiedById: string | null;
  approvedById: string | null;

  remarks: string;
  createdAt: string;
  updatedAt: string;

  status: PaymentVoucherStatus;

  procurement: {
    id: string;
    sn: string;
    item: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    status: string;
    hasAttachment: boolean;
    attachmentType: string | null;
    attachmentUrl: string | null;
    requestedById: string;
    sentToId: string;
    createdAt: string;
    updatedAt: string;
    requestedBy: StaffInfo;
    sentTo: StaffInfo;
  };

  initiatedBy: {
    id: string;
    email: string;
    role: string;
  };

  verifiedBy: {
    id: string;
    email: string;
    role: string;
  } | null;

  approvedBy: {
    id: string;
    email: string;
    role: string;
  } | null;

  beneficiary: {
    id: string;
    paymentVoucherId: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}

export interface PaymentVoucherListResponse {
  data: PaymentVoucher[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreatePaymentVoucherRequest {
  procurementId: string;
  vatPercentage: number;
  initiatedById: string;
  remarks?: string;
  beneficiary: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}

export interface PaymentVoucherResponse {
  message: string;
  data: PaymentVoucher;
}

export interface PaymentVoucherActionResponse {
  message: string;
  data: PaymentVoucher;
}

export interface RejectPaymentVoucherRequest {
  id: string;
  remarks: string;
}

export const paymentVoucherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /payment-voucher
    getPaymentVouchers: builder.query<
      PaymentVoucherListResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "/payment-voucher",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["PaymentVoucher"],
    }),

    // POST /payment-voucher
    createPaymentVoucher: builder.mutation<
      PaymentVoucherResponse,
      CreatePaymentVoucherRequest
    >({
      query: (body) => ({
        url: "/payment-voucher",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PaymentVoucher"],
    }),

    // PATCH /payment-voucher/:id/verify
    verifyPaymentVoucher: builder.mutation<
      PaymentVoucherActionResponse,
      string
    >({
      query: (id) => ({
        url: `/payment-voucher/${id}/verify`,
        method: "PATCH",
      }),
      invalidatesTags: ["PaymentVoucher"],
    }),

    // PATCH /payment-voucher/:id/approve
    approvePaymentVoucher: builder.mutation<
      PaymentVoucherActionResponse,
      string
    >({
      query: (id) => ({
        url: `/payment-voucher/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["PaymentVoucher"],
    }),

    // PATCH /payment-voucher/:id/reject
    rejectPaymentVoucher: builder.mutation<
      PaymentVoucherActionResponse,
      RejectPaymentVoucherRequest
    >({
      query: ({ id, remarks }) => ({
        url: `/payment-voucher/${id}/reject`,
        method: "PATCH",
        body: {
          remarks,
        },
      }),
      invalidatesTags: ["PaymentVoucher"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetPaymentVouchersQuery,
  useCreatePaymentVoucherMutation,
  useVerifyPaymentVoucherMutation,
  useApprovePaymentVoucherMutation,
  useRejectPaymentVoucherMutation,
} = paymentVoucherApi;

