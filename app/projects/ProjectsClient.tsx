"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectType } from "@/lib/content";

interface ProjectsClientProps {
  projects: ProjectType[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-16 border-b border-slate-200 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setActive(cat)}
            className={`px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] transition-all rounded ${
              active === cat
                ? "bg-blue-600 text-slate-900"
                : "bg-white/5 text-slate-600 hover:bg-white/10 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            id={`project-${project.id}`}
            className="group block border border-slate-200 bg-[#121212] rounded overflow-hidden hover:border-blue-500/50 transition-all"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-black/80 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase tracking-[0.06em] rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono uppercase tracking-[0.08em] mb-3">
                <span>{project.location}</span>
                <span>{project.year}</span>
              </div>

              <h3 className="font-display text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-6">
                {project.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-blue-400">
                  Read Case Study
                </span>
                <div className="w-8 h-8 flex items-center justify-center bg-white/5 group-hover:bg-blue-600 text-slate-900 transition-colors rounded">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
