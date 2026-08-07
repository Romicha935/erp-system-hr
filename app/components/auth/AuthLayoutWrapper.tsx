import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

interface AuthLayoutWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  showSignUp?: boolean; 
}

export default function AuthLayoutWrapper({
  title,
  subtitle,
  children,
  showSignUp = false,
}: AuthLayoutWrapperProps) {
  return (
    <main className="min-h-screen w-full flex bg-white font-sans">
      {/* LEFT SIDE: Content and Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 sm:p-12 md:p-20">
        {/* Top Header: Logo & Sign Up Button */}
        <div className="flex items-center justify-between mb-24">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <Image src="/logo.png" alt="" width={40} height={40} />
             
            </div>
            <div>
              <span className="text-xl font-bold text-slate-800 tracking-tight block leading-none">
                UiUxOtor
              </span>
              <span className="text-xs text-slate-500 font-normal">ERP System</span>
            </div>
          </div>

          {/* Top-Right Button (Like "Sign Up" or "Login") */}
          {showSignUp ? (
            <Link href="/signup">
              <Button variant="outline" className="text-sm px-6 py-2 border-slate-300 rounded-full font-medium">
                Sign Up
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button variant="outline" className="text-sm px-6 py-2 border-slate-300 rounded-full font-medium">
                Log In
              </Button>
            </Link>
          )}
        </div>

        {/* Center Content: Title, Subtitle, Form */}
        <div className="w-full max-w-sm mx-auto my-auto flex-1 flex flex-col justify-center">
          <div className="mb-10 text-left">
            <p className="text-sm text-slate-500 mb-2 font-medium">{subtitle}</p>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
          </div>

          {children}
        </div>
      </div>

      {/* RIGHT SIDE: Full Image Banner */}
      <div className="hidden lg:flex w-1/2 h-full fixed top-0 right-0 bottom-0 overflow-hidden">
    <Image
  src="/loginImg.png"
  alt="Auth Banner"
  fill
  className="object-cover"
  priority
/>
      </div>
    </main>
  );
}