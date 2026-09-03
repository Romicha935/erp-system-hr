// src/components/auth/auth-split-layout.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthHeader from "@/app/components/auth/Authheader";
import { Button } from "@/app/components/ui/button";

interface AuthSplitLayoutProps {
  headerTitle: string;
  headerSubtitle: string;
  topActionText?: string;
  topActionLink?: string;
  children: React.ReactNode;
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
    <main className="min-h-screen w-full flex bg-slate-50/50 font-sans text-slate-900 antialiased">
      {/* 1. LEFT SIDE: Form & Interactive Area */}
      <div className="w-full lg:w-[50%] flex flex-col justify-between p-6 sm:p-10 lg:p-16 relative bg-white border-r border-slate-100">
        
        {/* Top Bar / Brand / Action Link */}
        <div className="flex items-center justify-between w-full z-10">
          {/* Top Right Switcher Button */}
          {topActionText && topActionLink && (
            <div className="ml-auto">
              <Link href={topActionLink}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-5 py-2 text-sm font-medium text-slate-700 bg-white border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all rounded-full shadow-xs"
                >
                  {topActionText}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Center Content Block */}
        <div className="w-full max-w-md mx-auto my-auto py-8 flex flex-col">
          <AuthHeader title={headerTitle} subtitle={headerSubtitle} />

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
            {/* Form Input Fields */}
            <div className="space-y-4">
              {children}
            </div>

            {/* Main Submit Action */}
            <div className="pt-2">
              <Button 
                type="submit" 
                size="lg" 
                isLoading={isSubmitButtonLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] cursor-pointer"
              >
                {submitButtonText}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
        </div>
      </div>

      {/* 2. RIGHT SIDE: Premium Hero Visual */}
      <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden bg-slate-950 items-center justify-center">
        {/* Background Image with Gradient Overlay */}
        <Image
          src="/loginImg.png"
          alt="Auth Banner"
          fill
          className="object-cover object-center opacity-85 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          priority
        />
        
        {/* Modern Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20" />

        {/* Subtle Decorative Glass Card overlay over the image */}
        <div className="relative z-10 max-w-lg p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-2xl space-y-3 m-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-300 uppercase bg-cyan-500/20 rounded-full border border-cyan-400/30">
            Enterprise Ready
          </span>
          <h3 className="text-2xl font-bold tracking-tight">
            Streamline your workflow with precision.
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Access robust analytics, manage protocols, and track operations effortlessly from a unified control panel.
          </p>
        </div>
      </div>
    </main>
  );
}