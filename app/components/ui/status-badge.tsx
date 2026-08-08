import { cn } from "@/app/lib/utils";
import React from "react";


interface StatusBadgeProps {
  status: "Pending" | "Approved" | "Rejected";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isPending = status === "Pending";
  const isApproved = status === "Approved";

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium inline-block",
        isPending && "text-amber-500 bg-amber-50",
        isApproved && "text-emerald-500 bg-emerald-50",
        status === "Rejected" && "text-rose-500 bg-rose-50"
      )}
    >
      {status}
    </span>
  );
};