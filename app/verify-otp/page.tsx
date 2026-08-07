// src/app/verify-otp/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthSplitLayout from "@/app/components/auth/auth-split-layout";
import { Input } from "@/app/components/ui/input";

export default function VerifyOTPPage() {
  const router = useRouter();
  
  // Form State
  const [otpCode, setOtpCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call, then go to Reset Password
    router.push("/reset-password"); 
  };

  return (
    <AuthSplitLayout
      headerTitle="Verify OTP Code"
      headerSubtitle="Enter the 4-digit code sent to your email."
      submitButtonText="Verify & Continue"
      onSubmit={handleSubmit}
    >
      {/* Form Field unique to this page */}
      <Input
        label="Verification Code (OTP)"
        type="text"
        placeholder="X X X X"
        className="text-center text-2xl font-bold tracking-[1em]"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
        required
        maxLength={4} // Example for 4 digits
      />
      
      {/* Optional: Add "Didn't receive code? Resend" logic below the input */}
    </AuthSplitLayout>
  );
}