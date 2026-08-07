// src/app/forgot-password/page.tsx
"use client";

import { useRouter } from "next/navigation";
import AuthSplitLayout from "@/app/components/auth/auth-split-layout";
import { Input } from "@/app/components/ui/input";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call, then go to OTP
    router.push("/verify-otp"); 
  };

  return (
    <AuthSplitLayout
      // Unique text for this page
      headerTitle="Forgot Password?"
      headerSubtitle="No worries! It happens."
      submitButtonText="Send Verification Code"
      onSubmit={handleSubmit}
      // Top right action link (back to login)
      topActionText="Sign In"
      topActionLink="/"
    >
      {/* Form Field unique to this page */}
      <Input
        label="Your registered email address"
        type="email"
        placeholder="Enter your email"
        required
      />
    </AuthSplitLayout>
  );
}