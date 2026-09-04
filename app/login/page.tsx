/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import AuthSplitLayout from "@/app/components/auth/auth-split-layout";
import { Input } from "@/app/components/ui/input";
import { useLoginMutation } from "../redux/api/authApi";
import { setCredentials } from "../redux/slices/authSlice";

const DEMO_EMAIL = "admin@erp.com";
const DEMO_PASSWORD = "Admin@1234";

export default function RootLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );

      toast.success("Login successful!");

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);

      toast.error(
        error?.data?.message || "Invalid email or password"
      );
    }
  };

  const handleUseDemoCredentials = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <AuthSplitLayout
      headerTitle="Please Sign In"
      headerSubtitle="Welcome back!!"
      submitButtonText="Sign In"
      isSubmitButtonLoading={isLoading}
      onSubmit={handleLogin}
      topActionLink="/register"
    >
      <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
        <p className="text-xs font-semibold text-blue-900">Just browsing?</p>
        <p className="mt-0.5 text-xs text-blue-700">
          Use the demo admin account to explore the dashboard.
        </p>
        <button
          type="button"
          onClick={handleUseDemoCredentials}
          className="mt-2 text-xs font-semibold text-blue-700 underline hover:text-blue-800"
        >
          Fill demo credentials
        </button>
      </div>

      <Input
        label="Email address"
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="relative">
        <Input
          label="Password"
          type="password"
          placeholder="•••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between -mt-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />

          <label
            htmlFor="rememberMe"
            className="text-sm font-medium text-slate-700"
          >
            Remember me
          </label>
        </div>
      </div>
    </AuthSplitLayout>
  );
}