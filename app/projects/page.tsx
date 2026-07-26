import type { Metadata } from "next";
import { FolderKanban } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo";
import ProjectsClient from "./ProjectsClient";
import { getAllProjects } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSeoMetadata({
  title: "Projects — Industrial HVAC & Cleanroom Case Studies | Thermopharm",
  description:
    "Browse Thermopharm's project portfolio: BSL-3 containment labs, pharmaceutical HVAC, solar panel cleanrooms, and hospital HVAC systems across India.",
  slug: "projects",
  keywords: ["cleanroom projects India", "pharmaceutical HVAC projects", "BSL-3 lab", "hospital HVAC"],
});

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-36 pb-24 border-b border-slate-200/80 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.08),rgba(255,255,255,0))]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-4 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              <FolderKanban className="w-4 h-4 text-blue-600" /> Project Case Studies
            </span>
            <h1 className="font-display text-[clamp(40px,5.5vw,72px)] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Proven engineering <br />
              across <span className="text-blue-600">250+ installations.</span>
            </h1>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-normal">
              Explore our landmark facility designs, cleanroom executions, and industrial HVAC commissions.
            </p>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ProjectsClient projects={projects} />
        </div>
      </section>
    </div>
  );
}
