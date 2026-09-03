// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Users,
  CreditCard,
  ShoppingCart,
  Receipt,
  FileText,
  Megaphone,
  Wrench,
  Truck,
  PieChart,
  PackageCheck,
  GraduationCap,
  Bell,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  ChevronRight,
  Sparkles,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react";

const modules = [
  { name: "Staff Management", desc: "Personal records, roles, and department assignments in one directory.", icon: Users },
  { name: "Payroll & Payslips", desc: "Run payroll, generate payslips, and manage salary definitions effortlessly.", icon: CreditCard },
  { name: "Procurement", desc: "Request, approve, and track purchases from raise to final receipt.", icon: ShoppingCart },
  { name: "Payment Vouchers", desc: "Verify and approve payments tied to official procurement requests.", icon: Receipt },
  { name: "Internal Memos", desc: "Send, receive, and act on internal memos with a clear approval trail.", icon: FileText },
  { name: "Circulars", desc: "Broadcast announcements to a specific department or the whole office.", icon: Megaphone },
  { name: "Maintenance", desc: "Schedule and track recurring equipment upkeep and servicing.", icon: Wrench },
  { name: "Logistics", desc: "Manage travel and logistics requests with beneficiary details.", icon: Truck },
  { name: "Office Budget", desc: "Track budgeted vs. actual spend, department by department.", icon: PieChart },
  { name: "Stocks & Inventory", desc: "Know what's in stock, what's assigned, and what's on the books.", icon: PackageCheck },
  { name: "Capacity Building", desc: "Plan corporate trainings and track employee completions.", icon: GraduationCap },
  { name: "Notifications Hub", desc: "Every approval, memo, and system update in a unified feed.", icon: Bell },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function LandingPage() {
  const directory = useReveal<HTMLDivElement>();
  const principlesRef = useReveal<HTMLDivElement>();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-500 selection:text-white antialiased font-sans">
      <style>{`
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .rise-1 { animation: riseIn 0.6s cubic-bezier(.16,1,.3,1) 0.05s both; }
        .rise-2 { animation: riseIn 0.6s cubic-bezier(.16,1,.3,1) 0.15s both; }
        .rise-3 { animation: riseIn 0.6s cubic-bezier(.16,1,.3,1) 0.25s both; }
        .rise-4 { animation: riseIn 0.6s cubic-bezier(.16,1,.3,1) 0.35s both; }
        .settle { animation: scaleUp 0.8s cubic-bezier(.16,1,.3,1) 0.20s both; }

        .reveal-group > * { opacity: 0; transform: translateY(16px); }
        .reveal-group.is-visible > * { animation: riseIn 0.6s cubic-bezier(.16,1,.3,1) both; }
        ${modules.map((_, i) => `.reveal-group.is-visible > *:nth-child(${i + 1}) { animation-delay: ${i * 0.04}s; }`).join("\n")}

        @media (prefers-reduced-motion: reduce) {
          .rise-1, .rise-2, .rise-3, .rise-4, .settle,
          .reveal-group.is-visible > * {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* FLOATING NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 transition-all duration-300">
        <header
          className={`max-w-7xl mx-auto px-6 py-1 rounded-full transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? "bg-white/80 backdrop-blur-md shadow-lg shadow-slate-900/5 border border-slate-200/80"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo Only Section */}
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center justify-center">
              <Image src="/logoo.png" alt="ERP Logo" width={64} height={64} className="object-contain" priority />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#modules" className="hover:text-slate-900 transition-colors">Modules</a>
            <a href="#why-us" className="hover:text-slate-900 transition-colors">Why ERP</a>
            <a href="#modules" className="hover:text-slate-900 transition-colors">Maintenance</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              Log in
            </Link>
          </div>
        </header>
      </div>

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-32 sm:pt-44 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="lg:col-span-7 text-center lg:text-left">
          <div className="rise-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-sky-700 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            Next-Gen Enterprise HR & Office ERP
          </div>

          <h1 className="rise-2 text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.1] tracking-tight text-slate-900">
            All your HR, operations & approvals in{" "}
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              one platform.
            </span>
          </h1>

          <p className="rise-3 mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Eliminate fragmented tools. Manage staff records, payroll, procurement, internal memos, logistics, and department budgets from a single secure workspace.
          </p>

          <div className="rise-4 mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto text-center text-sm font-semibold px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 hover:opacity-95 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Access Workspace
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#modules"
              className="w-full sm:w-auto text-center text-sm font-semibold px-7 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow"
            >
              Explore All Modules
            </a>
          </div>
        </div>

        {/* HERO WIDGET DEMO */}
        <div className="lg:col-span-5">
          <div className="settle bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60 p-6 sm:p-7 max-w-md mx-auto lg:ml-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Workspace</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-slate-500" /> Real-time
              </span>
            </div>

            <div className="py-5 space-y-3.5">
              {[
                { label: "Active Staff Directory", value: "248", icon: Users, color: "text-amber-600 bg-amber-50 border-amber-100" },
                { label: "Pending Approvals", value: "17", icon: CheckCircle2, color: "text-sky-600 bg-sky-50 border-sky-100" },
                { label: "Procurement Requests", value: "9", icon: ShoppingCart, color: "text-purple-600 bg-purple-50 border-purple-100" },
                { label: "Active Memos", value: "31", icon: FileText, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
              ].map((row) => {
                const IconComponent = row.icon;
                return (
                  <div key={row.label} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${row.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{row.label}</span>
                    </div>
                    <span className="text-base font-extrabold text-slate-900">{row.value}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">Weekly Activity Rate</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                  <BarChart3 className="w-3 h-3" /> +14.2%
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-12 pt-2">
                {[40, 65, 50, 80, 55, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-sky-500 to-indigo-600 opacity-85 hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES DIRECTORY */}
      <section id="modules" className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-2xl mb-16 text-center sm:text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
              Integrated Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-4 leading-tight">
              12 Power Modules. One Workspace.
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
              Every module reads and writes to a central database — keeping staff records, approvals, and logs synchronized in real time.
            </p>
          </div>

          <div
            ref={directory.ref}
            className={`reveal-group ${
              directory.visible ? "is-visible" : ""
            } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
          >
            {modules.map((mod) => {
              const IconComponent = mod.icon;
              return (
                <div
                  key={mod.name}
                  className="group relative bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 hover:border-sky-500/50 p-6 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-bold text-xl tracking-tight">{mod.name}</h3>
                    <p className="mt-2.5 text-sm text-slate-400 leading-relaxed font-normal">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-700/40 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-sky-400 transition-colors">
                    <span>Explore Module</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE PRINCIPLES */}
      <section id="why-us" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Why Modern ERP
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Built for how enterprise offices actually operate.
          </h2>
        </div>

        <div
          ref={principlesRef.ref}
          className={`reveal-group ${
            principlesRef.visible ? "is-visible" : ""
          } grid grid-cols-1 md:grid-cols-3 gap-8`}
        >
          {[
            {
              title: "Zero Email Chaos",
              body: "Procurement, internal memos, logistics, and payment vouchers pass through clear multi-level approval workflows with timestamped audit logs.",
              icon: ShieldCheck,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
            },
            {
              title: "Single Source of Truth",
              body: "Staff data feeds seamlessly into payroll, asset inventory, and training trackers, making duplicate data entries a thing of the past.",
              icon: Zap,
              color: "text-sky-600 bg-sky-50 border-sky-100",
            },
            {
              title: "Instant Oversight",
              body: "Real-time feeds and visual metric charts keep department heads and management informed without manually chasing status updates.",
              icon: TrendingUp,
              color: "text-indigo-600 bg-indigo-50 border-indigo-100",
            },
          ].map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 ${p.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">{p.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 min-w-0">
  <Image
    src="/logoo.png"
    alt="ERP System Logo"
    width={40}
    height={40}
    className="w-10 h-10 object-contain shrink-0"
  />

  <div className="min-w-0 leading-tight">
    <p className="text-sm font-bold text-slate-900 whitespace-nowrap">
      ERP System
    </p>
    <p className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
      HR Management
    </p>
  </div>
</div>

          <p className="text-xs text-slate-500 font-medium text-center">
            Enterprise Operations & HR Management. © {new Date().getFullYear()} All rights reserved.
          </p>

          <Link href="/login" className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1">
            Workspace Login <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </footer>
    </div>
  );
}