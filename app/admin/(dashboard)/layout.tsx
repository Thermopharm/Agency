"use client";

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
  Database,
} from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between flex-shrink-0 p-5 min-h-screen">
        <div>
          {/* Top Brand Logo */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-black text-white font-bold text-xs flex items-center justify-center shadow-sm">
              T
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 tracking-tight leading-none">
                Thermopharm
              </h2>
              <span className="text-[10px] font-semibold text-slate-400">Admin Dashboard</span>
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 space-y-3 border-t border-slate-100">
          <div className="bg-amber-50/80 border border-amber-200/70 px-3.5 py-2.5 rounded-xl flex items-center gap-2.5">
            <Database className="w-4 h-4 text-amber-600" />
            <span className="text-[11px] font-bold text-amber-800">Local Storage Mode</span>
          </div>

          <form action="/api/admin/auth/logout" method="POST" className="w-full">
            <button
              type="submit"
              className="flex items-center gap-2.5 px-3.5 py-2.5 w-full rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
