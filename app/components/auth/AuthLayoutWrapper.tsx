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
        <div className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <Image src="/logoo.png" alt="" width={40} height={40} />
            </div>
          </div>

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

      {/* RIGHT SIDE: Designed panel (no stock photo) */}
      <div className="hidden lg:block w-1/2 h-full fixed top-0 right-0 bottom-0 overflow-hidden bg-[#0B1120]">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-sky-500/25 blur-[110px] animate-[float_9s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-80px] left-[-60px] h-[380px] w-[380px] rounded-full bg-indigo-500/25 blur-[110px] animate-[float_11s_ease-in-out_infinite_reverse]" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-16 py-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/10">
              <Image src="/logoo.png" alt="" width={22} height={22} />
            </div>
            <span className="text-sm font-semibold text-white/80 tracking-wide">
              ERP System · HR Suite
            </span>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
              One place to run your entire workforce.
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Payroll, attendance, procurement, and staff records — kept in sync,
              without the spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-bold text-white">12+</p>
              <p className="mt-1 text-xs text-slate-400">Connected modules</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Real-time</p>
              <p className="mt-1 text-xs text-slate-400">Data sync</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Role-based</p>
              <p className="mt-1 text-xs text-slate-400">Access control</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </main>
  );
}