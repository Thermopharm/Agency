"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Edit2, Factory, Loader2, Sparkles, Globe } from "lucide-react";

interface Industry {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  specs: string[];
  standards: string[];
  status: string;
}

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const res = await fetch("/api/admin/industries");
      if (res.ok) {
        const data = await res.json();
        setIndustries(data);
      }
    } catch (e) {
      console.error("Failed to fetch industries:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this industry sector?")) return;
    try {
      const res = await fetch(`/api/admin/industries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setIndustries((prev) => prev.filter((i) => i.id !== id && i.slug !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Factory className="w-6 h-6 text-blue-600" />
            Manage Target Industries (GEO & SEO Ready)
          </h1>
          <p className="text-slate-500 text-xs font-medium mt-1">
            {industries.length} total sector pages with ISO standards, challenges, solutions & FAQ schemas
          </p>
        </div>

        <Link
          href="/admin/industries/new"
          className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl text-xs tracking-wider transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Industry Sector</span>
        </Link>
      </div>

      {/* Industries List View */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : industries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 shadow-xs">
          <Factory className="w-10 h-10 mx-auto text-slate-300 mb-3" />
          <p className="text-base font-bold text-slate-700">No industry sectors created yet</p>
          <p className="text-xs mt-1 text-slate-400">Add target engineering sectors served by Thermopharm.</p>
          <Link
            href="/admin/industries/new"
            className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-black text-white text-xs font-bold rounded-xl"
          >
            <Plus className="w-3.5 h-3.5" />
            Create First Industry Page
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {industries.map((ind) => (
            <div
              key={ind.id || ind.slug}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Thumbnail */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100 flex items-center justify-center">
                  {ind.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Factory className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm md:text-base text-slate-900 truncate tracking-tight group-hover:text-blue-600 transition-colors">
                      {ind.title}
                    </h3>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${
                        ind.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {ind.status || "PUBLISHED"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs mt-0.5 truncate">
                    <span>/industries/{ind.slug}</span>
                    <span>·</span>
                    <span className="truncate max-w-xs">{ind.shortDesc || "Industrial Sector"}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/industries/${ind.id || ind.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-bold text-slate-700 shadow-2xs transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit Sector</span>
                </Link>
                <button
                  onClick={() => handleDelete(ind.id || ind.slug)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete Industry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
