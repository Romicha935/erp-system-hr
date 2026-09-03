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
      <div className="flex items-center gap-2 mb-8">
        <Image 
          src="/logoo.png" 
          alt="UiUxOtor ERP Logo" 
          width={64} 
          height={64} 
          className="rounded-full"
        />
           <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">ERP System</p>
              <p className="text-[11px] font-medium text-slate-400">HR Management</p>
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