"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Factory, Loader2 } from "lucide-react";

interface Industry {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  specs: string;
  standards: string;
  status: string;
}

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    icon: "Factory",
    shortDesc: "",
    fullDesc: "",
    image: "/images/projects/project-1.png",
    status: "PUBLISHED",
  });

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

  const handleOpenModal = (ind?: Industry) => {
    if (ind) {
      setEditingId(ind.id);
      setFormData({
        title: ind.title,
        slug: ind.slug,
        icon: ind.icon || "Factory",
        shortDesc: ind.shortDesc,
        fullDesc: ind.fullDesc,
        image: ind.image || "/images/projects/project-1.png",
        status: ind.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        slug: "",
        icon: "Factory",
        shortDesc: "",
        fullDesc: "",
        image: "/images/projects/project-1.png",
        status: "PUBLISHED",
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/industries/${editingId}` : "/api/admin/industries";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        fetchIndustries();
      } else {
        alert("Failed to save industry");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving industry");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this industry?")) return;
    try {
      const res = await fetch(`/api/admin/industries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setIndustries((prev) => prev.filter((i) => i.id !== id));
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
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Target Industries
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1">
            {industries.length} total industries
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl text-xs tracking-wider transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Industry</span>
        </button>
      </div>

      {/* Industries List View */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : industries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
          <p className="text-base font-bold text-slate-700">No industries created yet</p>
          <p className="text-xs mt-1">Add target sectors served by Thermopharm.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Thumbnail */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100 flex items-center justify-center">
                  {ind.image ? (
                    <Image
                      src={ind.image}
                      alt={ind.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Factory className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <h3 className="font-bold text-sm md:text-base text-slate-900 truncate tracking-tight group-hover:text-blue-600 transition-colors">
                    {ind.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs mt-0.5 truncate">
                    <span>/industries/{ind.slug}</span>
                    <span>·</span>
                    <span className="truncate max-w-xs">{ind.shortDesc || "Industrial Sector"}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleOpenModal(ind)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(ind.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Industry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200/80 w-full max-w-xl rounded-3xl p-6 text-slate-800 shadow-2xl space-y-5">
            <h2 className="text-lg font-bold text-slate-900">
              {editingId ? "Edit Industry Sector" : "Add New Industry Sector"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  INDUSTRY TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Pharmaceutical & Biotech"
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  SLUG (URL PATH)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="pharmaceutical-biotech"
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 text-xs rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  SHORT SUMMARY *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="Brief 1-2 sentence overview for card view..."
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  FULL DESCRIPTION
                </label>
                <textarea
                  rows={4}
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  placeholder="Detailed specifications, compliance notes..."
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editingId ? "Save Changes" : "Create Industry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
