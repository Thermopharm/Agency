"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Star, Check } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  status: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    status: "PUBLISHED",
  });

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.content) return;

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          fetchTestimonials();
          resetForm();
        }
      } else {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          fetchTestimonials();
          resetForm();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      role: t.role,
      company: t.company || "",
      content: t.content,
      rating: t.rating || 5,
      status: t.status || "PUBLISHED",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", role: "", company: "", content: "", rating: 5, status: "PUBLISHED" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#0a0a0a]">Testimonials Management</h1>
          <p className="text-gray-500 text-xs mt-1">Manage client reviews and feedback displayed on the website</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 p-6 mb-8">
        <h2 className="font-display text-lg font-bold text-[#0a0a0a] mb-4">
          {editingId ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Dr. Vikram Patel"
                className="w-full px-3 py-2 border border-gray-300 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Role / Title *
              </label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Operations Director"
                className="w-full px-3 py-2 border border-gray-300 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Pharma Manufacturer"
                className="w-full px-3 py-2 border border-gray-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Feedback Content *
            </label>
            <textarea
              rows={3}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Thermopharm's engineering team delivered our facility on time..."
              className="w-full px-3 py-2 border border-gray-300 text-sm"
              required
            />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Rating (1-5)
              </label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="px-3 py-2 border border-gray-300 text-sm"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★</option>
                <option value={3}>3 Stars ★★★</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="px-3 py-2 border border-gray-300 text-sm"
              >
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>

            <div className="flex gap-2 items-end pt-5">
              <button
                type="submit"
                className="bg-blue-600 text-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-blue-700 transition-colors"
              >
                {editingId ? "Save Changes" : "Create Testimonial"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="py-12 text-center text-gray-400 text-sm">Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="p-8 text-center bg-white border border-gray-200 text-gray-500 text-sm">
          No custom testimonials added yet. Use the form above to add your first client review.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white border border-gray-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-[#0a0a0a] text-sm">{t.name}</h3>
                    <p className="text-xs text-gray-400">{t.role} {t.company ? `· ${t.company}` : ""}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      t.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="flex gap-1 text-yellow-400 text-xs mb-3">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-xs text-gray-600 italic leading-relaxed">&ldquo;{t.content}&rdquo;</p>
              </div>

              <div className="flex gap-2 justify-end pt-4 mt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(t)}
                  className="p-1.5 border border-gray-200 hover:bg-gray-100 text-gray-700"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 border border-red-200 hover:bg-red-50 text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
