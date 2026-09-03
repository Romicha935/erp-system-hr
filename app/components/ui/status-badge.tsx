import { cn } from "@/app/lib/utils";
import React from "react";

interface StatusBadgeProps {
  status: "PENDING" | "APPROVED" | "REJECTED" | "VERIFIED";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusLabel = {
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    VERIFIED: "Verified",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium inline-block",
        status === "PENDING" && "text-amber-500 bg-amber-50",
        status === "APPROVED" && "text-emerald-500 bg-emerald-50",
        status === "REJECTED" && "text-rose-500 bg-rose-50",
        status === "VERIFIED" && "text-blue-500 bg-blue-50",
      )}
    >
      {statusLabel[status]}
    </span>
  );
};