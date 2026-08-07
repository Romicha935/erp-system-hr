"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayoutWrapper from "@/app/components/auth/AuthLayoutWrapper";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // সফল হলে লগইন পেজে যাবে
      router.push("/");
    }, 1200);
  };

  return (
    <AuthLayoutWrapper
      subtitle="Just a moment!!"
      title="Set New Password"
    >
      <form onSubmit={handleReset} className="flex flex-col gap-5 mt-6">
        <Input
          label="New Password"
          type="password"
          placeholder="•••••••••••••"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="•••••••••••••"
          required
        />

        <Button type="submit" isLoading={loading} className="w-full mt-2 cursor-pointer">
          Update Password
        </Button>
      </form>
    </AuthLayoutWrapper>
  );
}