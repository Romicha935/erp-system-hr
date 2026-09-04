// app/(dashboard)/payments/[id]/page.tsx
"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import {
  useGetPaymentVouchersQuery,
  useVerifyPaymentVoucherMutation,
  useApprovePaymentVoucherMutation,
  useRejectPaymentVoucherMutation,
} from "@/app/redux/dashboard/paymentVoucherApi";

const statusStyle: Record<string, string> = {
  PENDING: "text-amber-500 bg-amber-50",
  VERIFIED: "text-sky-600 bg-sky-50",
  APPROVED: "text-emerald-600 bg-emerald-50",
  REJECTED: "text-rose-600 bg-rose-50",
};

export default function PaymentVoucherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading } = useGetPaymentVouchersQuery({ limit: 200 });
  const [verifyPaymentVoucher, { isLoading: isVerifying }] = useVerifyPaymentVoucherMutation();
  const [approvePaymentVoucher, { isLoading: isApproving }] = useApprovePaymentVoucherMutation();
  const [rejectPaymentVoucher, { isLoading: isRejecting }] = useRejectPaymentVoucherMutation();

  const voucher = data?.data.find((v) => v.id === id);

  const formatCurrency = (value: string) =>
    `₦${parseFloat(value).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  const handleVerify = async () => {
    try {
      await verifyPaymentVoucher(id).unwrap();
      toast.success("Voucher verified successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to verify voucher.");
    }
  };

  const handleApprove = async () => {
    try {
      await approvePaymentVoucher(id).unwrap();
      toast.success("Voucher approved successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve voucher.");
    }
  };

  const handleReject = async () => {
    const remarks = window.prompt("Enter rejection remarks:");
    if (!remarks) return;

    try {
      await rejectPaymentVoucher({ id, remarks }).unwrap();
      toast.success("Voucher rejected");
      router.push("/payments");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject voucher.");
    }
  };

  if (isLoading) {
    return <div className="py-16 text-center text-slate-400 text-sm">Loading...</div>;
  }

  if (!voucher) {
    return <div className="py-16 text-center text-rose-500 text-sm">Payment voucher not found.</div>;
  }

  const isSubmitting = isVerifying || isApproving || isRejecting;
  const isPending = voucher.status === "PENDING";
  const isVerified = voucher.status === "VERIFIED";

  return (
    <div className="space-y-6 w-full pb-10">
      <Link
        href="/payments"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to All Vouchers
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Payment Voucher Details</h1>
          <span className={`text-xs px-4 py-1.5 font-bold rounded-full ${statusStyle[voucher.status]}`}>
            {voucher.status}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">Procurement Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <p className="text-slate-400 font-semibold">Item</p>
              <p className="text-slate-800 font-medium mt-0.5">{voucher.procurement.item}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Quantity</p>
              <p className="text-slate-800 font-medium mt-0.5">{voucher.procurement.quantity}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Unit Price</p>
              <p className="text-slate-800 font-medium mt-0.5">{formatCurrency(voucher.procurement.unitPrice)}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Total Price</p>
              <p className="text-slate-800 font-medium mt-0.5">{formatCurrency(voucher.procurement.totalPrice)}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Requested By</p>
              <p className="text-slate-800 font-medium mt-0.5">
                {voucher.procurement.requestedBy.firstName} {voucher.procurement.requestedBy.lastName}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Sent To</p>
              <p className="text-slate-800 font-medium mt-0.5">
                {voucher.procurement.sentTo.firstName} {voucher.procurement.sentTo.lastName}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Date</p>
              <p className="text-slate-800 font-medium mt-0.5">{formatDate(voucher.createdAt)}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">VAT & Amount</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-sky-50 rounded-xl border border-sky-100 text-xs">
            <div>
              <p className="text-sky-600 font-semibold">VAT Percentage</p>
              <p className="text-slate-800 font-bold mt-0.5">{voucher.vatPercentage}%</p>
            </div>
            <div>
              <p className="text-sky-600 font-semibold">VAT Amount</p>
              <p className="text-slate-800 font-bold mt-0.5">{formatCurrency(voucher.vatAmount)}</p>
            </div>
            <div>
              <p className="text-sky-600 font-semibold">Gross Amount</p>
              <p className="text-slate-900 font-extrabold mt-0.5">{formatCurrency(voucher.grossAmount)}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">Beneficiary Payment Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <p className="text-slate-400 font-semibold">Account Name</p>
              <p className="text-slate-800 font-medium mt-0.5">{voucher.beneficiary.accountName}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Account Number</p>
              <p className="text-slate-800 font-medium mt-0.5">{voucher.beneficiary.accountNumber}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Bank Name</p>
              <p className="text-slate-800 font-medium mt-0.5">{voucher.beneficiary.bankName}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">Memo Activities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <p className="text-slate-400 font-semibold">Initiated By</p>
              <p className="text-slate-800 font-medium mt-0.5">{voucher.initiatedBy.email}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Verified By</p>
              <p className="text-slate-800 font-medium mt-0.5">
                {voucher.verifiedBy ? voucher.verifiedBy.email : "—"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Approved By</p>
              <p className="text-slate-800 font-medium mt-0.5">
                {voucher.approvedBy ? voucher.approvedBy.email : "—"}
              </p>
            </div>
          </div>
        </div>

        {voucher.remarks && (
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs">
            <p className="text-amber-600 font-semibold mb-1">Remarks</p>
            <p className="text-slate-700">{voucher.remarks}</p>
          </div>
        )}

        {(isPending || isVerified) && (
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-100">
            {isPending && (
              <button
                onClick={handleVerify}
                disabled={isSubmitting}
                className="px-8 py-2.5 bg-sky-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </button>
            )}
            {isVerified && (
              <button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="px-8 py-2.5 bg-emerald-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isApproving ? "Approving..." : "Approve"}
              </button>
            )}
            <button
              onClick={handleReject}
              disabled={isSubmitting}
              className="px-8 py-2.5 border border-rose-500 text-rose-500 font-semibold text-xs rounded-md cursor-pointer hover:bg-rose-50 transition-colors disabled:opacity-50"
            >
              {isRejecting ? "Rejecting..." : "Reject"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}