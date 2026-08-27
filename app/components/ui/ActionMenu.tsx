// app/components/ui/ActionMenu.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoreVertical, LucideIcon } from "lucide-react";

export interface ActionMenuItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "default" | "danger";
}

interface ActionMenuProps {
  items: ActionMenuItem[];
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpward(spaceBelow < 160); // মেনু যদি নিচে জায়গা না থাকে, উপরে খুলবে
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={handleToggle}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 z-20 w-40 bg-white rounded-xl border border-slate-100 shadow-lg py-1.5 ${
            openUpward ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => {
                  setIsOpen(false);
                  item.onClick();
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-left cursor-pointer transition-colors ${
                  item.variant === "danger"
                    ? "text-rose-500 hover:bg-rose-50"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {Icon && <Icon size={14} />}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};