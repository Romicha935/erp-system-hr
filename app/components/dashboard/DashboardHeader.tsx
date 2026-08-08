import { Bell } from "lucide-react";
import React from "react";

export const Header = () => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between sticky top-0 z-10 gap-4 mb-6 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Welcome, Mr. Otor John 👏
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Today is Saturday, 11th November 2022.
        </p>
      </div>

      {/* Right User Info */}
      <div className="flex items-center gap-4 self-end md:self-auto">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors cursor-pointer relative">
          <Bell />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 overflow-hidden border border-slate-200">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Otor"
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-800 leading-tight">Otor John</p>
            <p className="text-xs text-slate-400 font-medium">HR Office</p>
          </div>
        </div>
      </div>
    </header>
  );
};