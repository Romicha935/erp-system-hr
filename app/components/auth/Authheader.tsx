// src/components/auth/auth-header.tsx
import Image from "next/image";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col gap-1.5 mb-10">
      {/* 1. Logo & Brand */}
      <div className="flex items-center gap-3.5 mb-8">
        <Image 
          src="/logo.png" // Put your logo image here
          alt="UiUxOtor ERP Logo" 
          width={40} 
          height={40} 
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            UiUxOtor
          </span>
          <span className="text-[11px] uppercase text-slate-500 font-semibold tracking-wider -mt-0.5">
            ERP System
          </span>
        </div>
      </div>

      {/* 2. Welcome/Action Text */}
      <div className="flex flex-col gap-1">
        <span className="text-sm text-slate-500 font-medium tracking-tight">
          {subtitle}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tightest">
          {title}
        </h1>
      </div>
    </div>
  );
}