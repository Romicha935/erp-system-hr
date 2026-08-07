// src/components/auth/auth-split-layout.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthHeader from "@/app/components/auth/Authheader";
import { Button } from "@/app/components/ui/button";

interface AuthSplitLayoutProps {
  // Props for the Header part
  headerTitle: string;
  headerSubtitle: string;
  
  // Custom 'action' button (e.g., 'Sign Up' or 'Sign In')
  topActionText?: string;
  topActionLink?: string;
  
  // The specific form itself (LoginForm, OTPScreen, etc.)
  children: React.ReactNode; 
  
  // Main form submit button props
  submitButtonText: string;
  isSubmitButtonLoading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AuthSplitLayout({
  headerTitle,
  headerSubtitle,
  topActionText,
  topActionLink,
  children,
  submitButtonText,
  isSubmitButtonLoading,
  onSubmit,
}: AuthSplitLayoutProps) {
  return (
    <main className="min-h-screen w-full flex bg-white font-sans text-slate-800">
      {/* 1. LEFT SIDE: Content & Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col flex-1 p-6 sm:p-12 md:p-16 relative">
        
        {/* Top Right 'Action' Button (e.g., 'Sign Up') */}
        {topActionText && topActionLink && (
          <div className="absolute top-10 right-10 z-10 hidden sm:block">
            <Link href={topActionLink}>
              <Button variant="outline" size="lg" className="px-7 py-3 font-semibold text-blue-600 border-blue-200 cursor-pointer">
                {topActionText}
              </Button>
            </Link>
          </div>
        )}

        {/* Center the Content Block */}
        <div className="w-full max-w-lg mx-auto my-auto flex-col flex-1 pt-20 flex">
          
          {/* A. Reusable Header */}
          <AuthHeader title={headerTitle} subtitle={headerSubtitle} />

          {/* B. Dynamic Form Content (The 'FormFields' inside children) */}
          <form onSubmit={onSubmit} className="flex flex-col flex-1">
            <div className="flex flex-col gap-6 mb-8 flex-1">
              {children}
            </div>

            {/* C. Primary Submit Button */}
            <div className="mt-auto pt-6 w-full max-w-sm lg:max-w-md">
              <Button 
                type="submit" 
                size="lg" 
                isLoading={isSubmitButtonLoading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-700 font-bold text-white shadow-lg shadow-blue-500/30 cursor-pointer"
              >
                {submitButtonText}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. RIGHT SIDE: Reusable Image Area (Perfectly Aligned) */}
      <div className="hidden lg:block w-1/2 min-h-screen relative overflow-hidden">
      <Image
  src="/loginImg.png"
  alt="Auth Banner"
  fill
  className="object-cover"
  priority
/>
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>
    </main>
  );
}