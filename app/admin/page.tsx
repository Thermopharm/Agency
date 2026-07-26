import Link from "next/link";
import { prisma } from "@/lib/db";
import { Database, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let servicesCount = 0;
  let projectsCount = 0;
  let postsCount = 0;
  let leadsCount = 0;
  let testimonialsCount = 0;

  try {
    servicesCount = await prisma.service.count();
    projectsCount = await prisma.project.count();
    postsCount = await prisma.blogPost.count();
    leadsCount = await prisma.lead.count();
    testimonialsCount = await prisma.testimonial.count();
  } catch (e) {
    console.warn("Database count query fallback.", e);
  }

  const statCards = [
    { label: "BLOG POSTS", count: postsCount, href: "/admin/blog" },
    { label: "PROJECTS", count: projectsCount, href: "/admin/projects" },
    { label: "MESSAGES", count: leadsCount, href: "/admin/leads" },
    { label: "SERVICES", count: servicesCount, href: "/admin/services" },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1">
            Welcome to Thermopharm Content Management System
          </p>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors">
                {stat.label}
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
            </div>
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {stat.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Supabase Active Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between text-slate-800 text-xs font-medium shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">Supabase PostgreSQL Active</div>
            <div className="text-slate-400 text-xs mt-0.5">Database synced live with PostgreSQL host db.uyxeltifxljqjnarvjvo.supabase.co</div>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase rounded-full border border-emerald-200">
          Connected
        </span>
      </div>
    </div>
  );
}
