"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, ArrowLeft, Loader2, Upload } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ProjectFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    location: string;
    year: string;
    client: string;
    category: string;
    image: string;
    description: string;
    challenge: string;
    solution: string;
    results: string[];
    tags: string[];
    faq: FAQItem[];
    metaTitle: string;
    metaDesc: string;
    status: string;
  };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [year, setYear] = useState(initialData?.year || "");
  const [client, setClient] = useState(initialData?.client || "");
  const [category, setCategory] = useState(initialData?.category || "Cleanrooms");
  const [image, setImage] = useState(initialData?.image || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [challenge, setChallenge] = useState(initialData?.challenge || "");
  const [solution, setSolution] = useState(initialData?.solution || "");
  const [status, setStatus] = useState(initialData?.status || "PUBLISHED");

  // Arrays
  const [results, setResults] = useState<string[]>(initialData?.results || []);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [faq, setFaq] = useState<FAQItem[]>(initialData?.faq || []);

  // SEO
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.metaDesc || "");

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData?.id) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImage(data.url);
    } catch (err: any) {
      alert(err.message || "Failed to upload image");
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      slug,
      location,
      year,
      client,
      category,
      image,
      description,
      challenge,
      solution,
      results,
      tags,
      faq,
      metaTitle,
      metaDesc,
      status,
    };

    try {
      const url = initialData?.id
        ? `/api/admin/projects/${initialData.id}`
        : "/api/admin/projects";
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project");

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            {initialData?.id ? "Edit Project" : "New Project"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/20 text-slate-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Project
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-5">
            <h2 className="font-display text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Project Case Study Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Project Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="e.g. 10,000 SQFT Vaccine Facility Cleanroom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Slug (URL Path)
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-500"
                placeholder="vaccine-facility-cleanroom"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  placeholder="e.g. Ahmedabad, India"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  placeholder="e.g. 2024"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Client Name
                </label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  placeholder="e.g. Pharma Corp Ltd."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white"
                >
                  <option value="Cleanrooms">Cleanrooms</option>
                  <option value="HVAC Systems">HVAC Systems</option>
                  <option value="Containment">Containment</option>
                  <option value="Water Systems">Water Systems</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Overview Description
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                placeholder="A high-level project summary..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                The Challenge
              </label>
              <textarea
                required
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono"
                placeholder="Describe constraints, high humidity, temperature issues..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                The Solution
              </label>
              <textarea
                required
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono"
                placeholder="Describe engineering setup, specific HVAC components..."
              />
            </div>
          </div>

          {/* Results list */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="font-display text-base font-bold text-gray-900">
                Key Results & Metrics
              </h2>
              <button
                type="button"
                onClick={() => setResults([...results, ""])}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Result
              </button>
            </div>
            {results.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No metrics added yet.</p>
            ) : (
              <div className="space-y-3">
                {results.map((res, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={res}
                      onChange={(e) => {
                        const newResults = [...results];
                        newResults[i] = e.target.value;
                        setResults(newResults);
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                      placeholder="e.g. 100% compliance with WHO guidelines"
                    />
                    <button
                      type="button"
                      onClick={() => setResults(results.filter((_, idx) => idx !== i))}
                      className="p-2 border border-gray-200 hover:border-red-500 hover:text-red-500 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Status & Media */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-5">
            <h2 className="font-display text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Status & Media
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Publish Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Feature Image
              </label>
              {image && (
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs"
                  placeholder="Image URL or upload below"
                />
              </div>
              <label className="mt-2.5 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-blue-600 hover:bg-blue-50/50 rounded-xl p-4 cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-semibold text-gray-600">Upload Image File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* SEO fields */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-5">
            <h2 className="font-display text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              SEO Optimization
            </h2>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <span className={`text-xs ${metaTitle.length > 60 ? "text-amber-600" : "text-gray-400"}`}>
                  {metaTitle.length}/60
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                placeholder="Ideal length: 50-60 chars"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <span className={`text-xs ${metaDesc.length > 155 ? "text-amber-600" : "text-gray-400"}`}>
                  {metaDesc.length}/155
                </span>
              </div>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                placeholder="Ideal length: 120-155 chars"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
