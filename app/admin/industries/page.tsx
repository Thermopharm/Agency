"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Factory, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
            <Factory className="w-4 h-4" /> Management Portal
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Industries Sector Management</h1>
          <p className="text-sm text-gray-400 mt-1">
            Add, update, or remove target industry sectors served by Thermopharm.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-slate-900 text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded transition"
        >
          <Plus className="w-4 h-4" /> Add New Industry
        </button>
      </div>

      {/* List / Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : industries.length === 0 ? (
        <div className="text-center py-16 bg-[#121212] border border-slate-200 rounded-lg">
          <AlertCircle className="w-10 h-10 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-300 font-medium">No industries created yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                    {ind.slug}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                      ind.status === "PUBLISHED"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {ind.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{ind.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-3 mb-4">{ind.shortDesc}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenModal(ind)}
                  className="p-2 text-gray-400 hover:text-slate-900 hover:bg-white/5 rounded transition"
                  title="Edit Industry"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(ind.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition"
                  title="Delete Industry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white border border-white/15 w-full max-w-xl rounded-lg p-6 text-slate-900 space-y-5">
            <h2 className="text-xl font-bold">
              {editingId ? "Edit Industry Sector" : "Add New Industry Sector"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Industry Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Pharmaceutical & Biotech"
                  className="w-full bg-slate-50 border border-white/15 px-3 py-2 text-sm rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Slug (URL identifier)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. pharmaceutical-biotech"
                  className="w-full bg-slate-50 border border-white/15 px-3 py-2 text-sm rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Short Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="Brief 1-2 sentence overview for card view..."
                  className="w-full bg-slate-50 border border-white/15 px-3 py-2 text-sm rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={4}
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  placeholder="Detailed specifications, compliance notes..."
                  className="w-full bg-slate-50 border border-white/15 px-3 py-2 text-sm rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Image Path
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-slate-50 border border-white/15 px-3 py-2 text-sm rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-50 border border-white/15 px-3 py-2 text-sm rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-gray-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-slate-900 text-xs font-semibold uppercase tracking-wider rounded transition flex items-center gap-2"
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
