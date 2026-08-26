"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import AuthSplitLayout from "@/app/components/auth/auth-split-layout";
import { Input } from "@/app/components/ui/input";
import { useLoginMutation } from "./redux/api/authApi";
import { setCredentials } from "./redux/slices/authSlice";



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

      // Save login credentials in Redux
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

  return (
    <AuthSplitLayout
      headerTitle="Please Sign In"
      headerSubtitle="Welcome back!!"
      submitButtonText="Sign In"
      isSubmitButtonLoading={isLoading}
      onSubmit={handleLogin}
      topActionText="Sign Up"
      topActionLink="/register"
    >
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

        <Link
          href="/forgot-password"
          className="text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline"
        >
          I forgot my password
        </Link>
      </div>
    </AuthSplitLayout>
  );
}