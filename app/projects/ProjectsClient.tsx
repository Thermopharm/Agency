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
      <div className="flex flex-wrap gap-2.5 mb-16 border-b border-slate-200/80 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setActive(cat)}
            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-[0.08em] transition-all rounded-xl ${
              active === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
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
            className="group block border border-slate-200/80 bg-white rounded-2xl overflow-hidden hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-md text-blue-600 border border-blue-100 text-[10px] font-extrabold uppercase tracking-[0.06em] rounded-full shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono font-bold uppercase tracking-[0.08em] mb-3">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-6">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-600">
                  Read Case Study
                </span>
                <div className="w-9 h-9 flex items-center justify-center bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all rounded-xl">
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
