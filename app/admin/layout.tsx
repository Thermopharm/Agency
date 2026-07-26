"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Inbox,
  Briefcase,
  FileText,
  Factory,
  Layers,
  MessageSquare,
  Globe,
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If on login page, render children cleanly without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: BarChart2 },
    { label: "Inquiries", href: "/admin/leads", icon: Inbox },
    { label: "Projects", href: "/admin/projects", icon: Briefcase },
    { label: "Journal / Blog", href: "/admin/blog", icon: FileText },
    { label: "Industries", href: "/admin/industries", icon: Factory },
    { label: "Services", href: "/admin/services", icon: Layers },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "SEO Files", href: "/admin/seo", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row text-slate-800 antialiased font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 p-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black text-white font-bold text-xs flex items-center justify-center shadow-sm">
            <span className="text-[#a3e635]">T</span>
          </div>
          <h2 className="font-bold text-sm text-slate-900 tracking-tight leading-none">
            Thermopharm Admin
          </h2>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:flex fixed md:static inset-0 z-40 w-full md:w-64 bg-white border-r border-slate-200/80 flex-col justify-between flex-shrink-0 p-5 md:min-h-screen pt-20 md:pt-5`}
      >
        <div>
          {/* Top Brand Logo - Desktop Only */}
          <div className="hidden md:flex items-center gap-3 px-2 py-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-black text-white font-black text-xs flex items-center justify-center shadow-md">
              <span className="text-[#a3e635]">T</span>
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 tracking-tight leading-none">
                Thermopharm
              </h2>
              <span className="text-[10px] font-semibold text-slate-400">
                Admin Dashboard
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 space-y-3 border-t border-slate-100 mt-auto md:mt-0">
          <div className="bg-emerald-50/90 border border-emerald-200/70 px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-extrabold text-emerald-700 tracking-tight">
              Supabase DB Connected
            </span>
          </div>

          <form action="/api/admin/auth/logout" method="POST" className="w-full">
            <button
              type="submit"
              className="flex items-center gap-2.5 px-3.5 py-2.5 w-full rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl relative z-10">
        {children}
      </main>
    </div>
  );
}
