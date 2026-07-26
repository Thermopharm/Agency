"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, ArrowLeft, Loader2, Upload } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    shortDesc: string;
    fullDesc: string;
    icon: string;
    image: string;
    specs: string[];
    standards: string[];
    faq: FAQItem[];
    metaTitle: string;
    metaDesc: string;
    keywords: string;
    status: string;
  };
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDesc, setShortDesc] = useState(initialData?.shortDesc || "");
  const [fullDesc, setFullDesc] = useState(initialData?.fullDesc || "");
  const [icon, setIcon] = useState(initialData?.icon || "Layers");
  const [image, setImage] = useState(initialData?.image || "");
  const [status, setStatus] = useState(initialData?.status || "PUBLISHED");

  // Arrays
  const [specs, setSpecs] = useState<string[]>(initialData?.specs || []);
  const [standards, setStandards] = useState<string[]>(initialData?.standards || []);
  const [faq, setFaq] = useState<FAQItem[]>(initialData?.faq || []);

  // SEO
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.metaDesc || "");
  const [keywords, setKeywords] = useState(initialData?.keywords || "");

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
      shortDesc,
      fullDesc,
      icon,
      image,
      specs,
      standards,
      faq,
      metaTitle,
      metaDesc,
      keywords,
      status,
    };

    try {
      const url = initialData?.id
        ? `/api/admin/services/${initialData.id}`
        : "/api/admin/services";
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save service");

      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/services")}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 bg-white"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
              {initialData?.id ? "Edit Engineering Service" : "New Engineering Service"}
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              Manage service content, specifications, and SEO rules
            </p>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs tracking-wider transition-all shadow-sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Service</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left main forms */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-5">
            <h2 className="font-display text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Basic Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Service Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="e.g. Cleanroom HVAC Systems"
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
                placeholder="cleanroom-hvac-systems"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Short Description
              </label>
              <textarea
                required
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="A brief summary displayed on listings..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Description (Rich Content)
              </label>
              <textarea
                required
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                rows={8}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                placeholder="Supports detailed text descriptive paragraphs..."
              />
            </div>
          </div>

          {/* Dynamic Specifications list */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="font-display text-base font-bold text-gray-900">
                Specifications
              </h2>
              <button
                type="button"
                onClick={() => setSpecs([...specs, ""])}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Spec
              </button>
            </div>
            {specs.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No specifications added yet.</p>
            ) : (
              <div className="space-y-3">
                {specs.map((spec, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) => {
                        const newSpecs = [...specs];
                        newSpecs[i] = e.target.value;
                        setSpecs(newSpecs);
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                      placeholder="e.g. Temperature Control: ±1°C"
                    />
                    <button
                      type="button"
                      onClick={() => setSpecs(specs.filter((_, idx) => idx !== i))}
                      className="p-2 border border-gray-200 hover:border-red-500 hover:text-red-500 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Standards list */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="font-display text-base font-bold text-gray-900">
                Compliance & Standards
              </h2>
              <button
                type="button"
                onClick={() => setStandards([...standards, ""])}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Standard
              </button>
            </div>
            {standards.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No standards added yet.</p>
            ) : (
              <div className="space-y-3">
                {standards.map((std, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={std}
                      onChange={(e) => {
                        const newStds = [...standards];
                        newStds[i] = e.target.value;
                        setStandards(newStds);
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                      placeholder="e.g. ISO 14644-1 Class 5"
                    />
                    <button
                      type="button"
                      onClick={() => setStandards(standards.filter((_, idx) => idx !== i))}
                      className="p-2 border border-gray-200 hover:border-red-500 hover:text-red-500 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic FAQ list */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="font-display text-base font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <button
                type="button"
                onClick={() => setFaq([...faq, { question: "", answer: "" }])}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </button>
            </div>
            {faq.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No FAQs added yet.</p>
            ) : (
              <div className="space-y-4">
                {faq.map((item, i) => (
                  <div key={i} className="p-4 border border-gray-100 rounded-2xl space-y-3 relative bg-gray-50/50">
                    <button
                      type="button"
                      onClick={() => setFaq(faq.filter((_, idx) => idx !== i))}
                      className="absolute top-3 right-3 p-1.5 border border-gray-200 hover:border-red-500 hover:text-red-500 rounded-lg bg-white transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Question</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => {
                          const newFaq = [...faq];
                          newFaq[i].question = e.target.value;
                          setFaq(newFaq);
                        }}
                        className="w-full border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-white"
                        placeholder="e.g. What is ISO Class 5?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Answer</label>
                      <textarea
                        value={item.answer}
                        onChange={(e) => {
                          const newFaq = [...faq];
                          newFaq[i].answer = e.target.value;
                          setFaq(newFaq);
                        }}
                        rows={2}
                        className="w-full border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-white"
                        placeholder="Detailed answer content..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
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
                Icon (Lucide Class)
              </label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                placeholder="e.g. Layers, Thermometer, Shield"
              />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Keywords
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                placeholder="cleanroom, HVAC, engineering"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
