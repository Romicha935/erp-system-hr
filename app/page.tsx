// src/app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthSplitLayout from "@/app/components/auth/auth-split-layout";
import { Input } from "@/app/components/ui/input";

export default function RootLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // 1. Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Submit Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Perform authentication API call
    console.log({ email, password });
    
    // Simulate API delay, then navigate
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard"); // Successful login
    }, 1200);
  };

  return (
    <AuthSplitLayout
      // 1. Define the unique text for this page
      headerTitle="Please Sign In"
      headerSubtitle="Welcome back!!"
      submitButtonText="Sign In"
      isSubmitButtonLoading={loading}
      onSubmit={handleLogin}
      // Top right action link
      topActionText="Sign Up"
      topActionLink="/register"
    >
      {/* 2. Form Fields (Unique to this page) */}
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
        {/* Optional Password Visibility Toggle could go here */}
      </div>

      <div className="flex items-center justify-between -mt-3">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="rememberMe" 
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
          />
          <label htmlFor="rememberMe" className="text-sm font-medium text-slate-700">
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