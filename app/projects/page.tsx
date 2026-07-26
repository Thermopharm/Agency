import type { Metadata } from "next";
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
    <div className="bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-slate-900 min-h-screen">
      {/* Dark Hero */}
      <section className="relative pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">
              Project Case Studies
            </p>
            <h1 className="font-display text-[clamp(38px,5.5vw,68px)] font-bold leading-[1.05] tracking-tight mb-6">
              Proven engineering <br />
              across <span className="text-blue-500">250+ installations.</span>
            </h1>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
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
