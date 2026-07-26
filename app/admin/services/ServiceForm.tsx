"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
  Upload,
  FileText,
  Image as ImageIcon,
  Layers,
  Globe,
  Tag,
  ShieldCheck,
  Building2,
  UserCheck,
  CheckCircle2,
  HelpCircle,
  Link2
} from "lucide-react";

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
    gallery?: string[] | string;
    brochureUrl?: string;
    specs: string[] | string;
    standards: string[] | string;
    faq: FAQItem[] | string;
    industriesServed?: string[] | string;
    serviceLocations?: string;
    relatedServices?: string[] | string;
    metaTitle?: string;
    metaDesc?: string;
    keywords?: string;
    canonicalUrl?: string;
    robotsMeta?: string;
    publisher?: string;
    author?: string;
    status: string;
  };
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "specs" | "categorization" | "seo">("basic");

  // Helper function to safely parse JSON strings or return array
  const safeParseArray = (val: any): any[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDesc, setShortDesc] = useState(initialData?.shortDesc || "");
  const [fullDesc, setFullDesc] = useState(initialData?.fullDesc || "");
  const [icon, setIcon] = useState(initialData?.icon || "Layers");
  const [image, setImage] = useState(initialData?.image || "");
  const [status, setStatus] = useState(initialData?.status || "PUBLISHED");

  // Media & Downloads
  const [gallery, setGallery] = useState<string[]>(safeParseArray(initialData?.gallery));
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [brochureUrl, setBrochureUrl] = useState(initialData?.brochureUrl || "");

  // Specs, Standards, FAQ
  const [specs, setSpecs] = useState<string[]>(safeParseArray(initialData?.specs));
  const [standards, setStandards] = useState<string[]>(safeParseArray(initialData?.standards));
  const [faq, setFaq] = useState<FAQItem[]>(safeParseArray(initialData?.faq));

  // Categorization & Linking
  const [industriesServed, setIndustriesServed] = useState<string[]>(
    safeParseArray(initialData?.industriesServed).length > 0
      ? safeParseArray(initialData?.industriesServed)
      : ["Pharmaceuticals", "Biotechnology", "Healthcare & Hospitals"]
  );
  const [serviceLocations, setServiceLocations] = useState(
    initialData?.serviceLocations || "Mumbai, Maharashtra, Hyderabad, Pan-India"
  );
  const [relatedServices, setRelatedServices] = useState<string[]>(safeParseArray(initialData?.relatedServices));
  const [newRelatedService, setNewRelatedService] = useState("");

  // Advanced SEO & Schema
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.metaDesc || "");
  const [keywords, setKeywords] = useState(initialData?.keywords || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || "");
  const [robotsMeta, setRobotsMeta] = useState(initialData?.robotsMeta || "index, follow");
  const [publisher, setPublisher] = useState(initialData?.publisher || "Thermopharm Engineering");
  const [author, setAuthor] = useState(initialData?.author || "Ashish Jha - Founder & Director");

  // Word count calculator
  const wordCount = fullDesc.trim() ? fullDesc.trim().split(/\s+/).length : 0;

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

  // Main Feature Image Upload Handler
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

  // Gallery Image Upload Handler
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setGallery([...gallery, data.url]);
    } catch (err: any) {
      alert(err.message || "Failed to upload gallery image");
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
      gallery,
      brochureUrl,
      specs,
      standards,
      faq,
      industriesServed,
      serviceLocations,
      relatedServices,
      metaTitle,
      metaDesc,
      keywords,
      canonicalUrl,
      robotsMeta,
      publisher,
      author,
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
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-16">
      {/* Top Header Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/services")}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all border border-slate-200 text-slate-700 bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
              {initialData?.id ? "Edit Engineering Service" : "New Engineering Service"}
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              Comprehensive Service & Technical SEO Manager
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold bg-slate-50 text-slate-800"
          >
            <option value="PUBLISHED">🟢 Published</option>
            <option value="DRAFT">🟡 Draft</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Service</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveTab("basic")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === "basic"
              ? "bg-black text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          1. Basic Details & Downloads
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === "specs"
              ? "bg-black text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          2. Tech Specs & Compliance
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("categorization")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === "categorization"
              ? "bg-black text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          3. Industries & Related Services
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === "seo"
              ? "bg-black text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          4. SEO, Schema & Author Settings
        </button>
      </div>

      {/* TAB 1: BASIC DETAILS & DOWNLOADS */}
      {activeTab === "basic" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Service Information
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Service Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="e.g. Turnkey GMP Cleanroom Engineering"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Slug (URL Path) *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 text-slate-600 font-mono"
                placeholder="turnkey-gmp-cleanroom-engineering"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Short Description *
              </label>
              <textarea
                required
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="A high-impact 2-line summary shown on homepage & service cards..."
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Full Description (Rich Technical Overview) *
                </label>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    wordCount >= 300
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  Word Count: {wordCount} (Aim for 300+ words for top SEO ranking)
                </span>
              </div>
              <textarea
                required
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                rows={10}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs leading-relaxed focus:ring-2 focus:ring-blue-600 focus:outline-none font-sans"
                placeholder="Detailed engineering descriptions, airflow dynamics, HVAC specifications, and GMP compliance details..."
              />
            </div>
          </div>

          {/* Media & Downloads Column */}
          <div className="space-y-6">
            {/* Feature Image */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                Primary Feature Image
              </h2>

              {image && (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Feature preview" className="w-full h-full object-cover" />
                </div>
              )}

              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                placeholder="Image URL or upload file below"
              />

              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 rounded-2xl p-3 cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Upload Feature Image</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            {/* Service Gallery */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  Service Gallery (Multiple Images)
                </span>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                  {gallery.length} Images
                </span>
              </h2>

              <div className="grid grid-cols-2 gap-2">
                {gallery.map((url, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono"
                  placeholder="Paste Image URL..."
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newGalleryUrl.trim()) {
                      setGallery([...gallery, newGalleryUrl.trim()]);
                      setNewGalleryUrl("");
                    }
                  }}
                  className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
                >
                  Add
                </button>
              </div>

              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-amber-600 hover:bg-amber-50/50 rounded-2xl p-2.5 cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Upload Gallery Image</span>
                <input type="file" accept="image/*" onChange={handleGalleryUpload} className="hidden" />
              </label>
            </div>

            {/* Resource Downloads (Datasheet / Brochure PDF) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Engineering Datasheet / Brochure (PDF)
              </h2>
              <input
                type="text"
                value={brochureUrl}
                onChange={(e) => setBrochureUrl(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                placeholder="e.g. /docs/cleanroom-hvac-datasheet.pdf"
              />
              <p className="text-[11px] text-slate-400">
                Direct PDF download link for technical clients, facility engineers, and auditors.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TECH SPECS & COMPLIANCE */}
      {activeTab === "specs" && (
        <div className="space-y-6">
          {/* Dynamic Specifications list */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-slate-900">
                  Engineering Specifications
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Define technical parameters (e.g. Temperature, ACH, HEPA efficiency)</p>
              </div>
              <button
                type="button"
                onClick={() => setSpecs([...specs, ""])}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl hover:bg-blue-100"
              >
                <Plus className="w-3.5 h-3.5" /> Add Spec Line
              </button>
            </div>
            {specs.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No specifications added yet. Click &quot;Add Spec Line&quot; to begin.</p>
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
                      className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono"
                      placeholder="e.g. Temperature Control: 21°C ± 1°C | Air Changes: 60 to 90 ACH"
                    />
                    <button
                      type="button"
                      onClick={() => setSpecs(specs.filter((_, idx) => idx !== i))}
                      className="p-2 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Standards list */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-slate-900">
                  Compliance & Governance Standards
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Regulatory standards met by this service</p>
              </div>
              <button
                type="button"
                onClick={() => setStandards([...standards, ""])}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl hover:bg-emerald-100"
              >
                <Plus className="w-3.5 h-3.5" /> Add Standard
              </button>
            </div>
            {standards.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No regulatory standards added yet.</p>
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
                      className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono"
                      placeholder="e.g. WHO-GMP Certified | ISO 14644-1 Class 5 | USFDA 21 CFR Part 11"
                    />
                    <button
                      type="button"
                      onClick={() => setStandards(standards.filter((_, idx) => idx !== i))}
                      className="p-2 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic FAQ list */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-slate-900">
                  Service FAQs (Generates FAQPage Schema Markup)
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Structured Q&A for Google rich snippet search visibility</p>
              </div>
              <button
                type="button"
                onClick={() => setFaq([...faq, { question: "", answer: "" }])}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl hover:bg-purple-100"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ Item
              </button>
            </div>
            {faq.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No FAQs added yet.</p>
            ) : (
              <div className="space-y-4">
                {faq.map((item, i) => (
                  <div key={i} className="p-4 border border-slate-200 rounded-2xl space-y-3 relative bg-slate-50/60">
                    <button
                      type="button"
                      onClick={() => setFaq(faq.filter((_, idx) => idx !== i))}
                      className="absolute top-3 right-3 p-1.5 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-xl bg-white transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Question</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => {
                          const newFaq = [...faq];
                          newFaq[i].question = e.target.value;
                          setFaq(newFaq);
                        }}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold bg-white"
                        placeholder="e.g. What ISO Cleanroom Class is required for injectable manufacturing?"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Answer</label>
                      <textarea
                        value={item.answer}
                        onChange={(e) => {
                          const newFaq = [...faq];
                          newFaq[i].answer = e.target.value;
                          setFaq(newFaq);
                        }}
                        rows={2}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white"
                        placeholder="Injectable fill lines require ISO Class 5 (Grade A) laminar flow environment with HEPA H14 filtration..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CATEGORIZATION & LINKING */}
      {activeTab === "categorization" && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            Industries Served, Service Areas & Internal Linking
          </h2>

          {/* Industries Served Tags */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Target Industries Served
            </label>
            <div className="flex flex-wrap gap-2">
              {industriesServed.map((ind, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl"
                >
                  <Tag className="w-3 h-3" />
                  {ind}
                  <button
                    type="button"
                    onClick={() => setIndustriesServed(industriesServed.filter((_, idx) => idx !== i))}
                    className="ml-1 text-blue-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                id="add-industry-input"
                placeholder="Add Industry (e.g. Semiconductor Manufacturing)..."
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val && !industriesServed.includes(val)) {
                      setIndustriesServed([...industriesServed, val]);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Service Location / Area */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Service Locations / Target Geographies (Local SEO)
            </label>
            <input
              type="text"
              value={serviceLocations}
              onChange={(e) => setServiceLocations(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium"
              placeholder="e.g. Mumbai, Navi Mumbai, Thane, Pune, Gujarat, Hyderabad, Pan-India"
            />
            <p className="text-[11px] text-slate-400">
              Crucial for local search indexing (e.g., &quot;Cleanroom HVAC installation in Mumbai&quot;).
            </p>
          </div>

          {/* Related Services for Internal Linking */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Related Services (Builds Internal Link Equity)
            </label>
            <div className="flex flex-wrap gap-2">
              {relatedServices.map((rel, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200"
                >
                  <Link2 className="w-3 h-3 text-slate-400" />
                  {rel}
                  <button
                    type="button"
                    onClick={() => setRelatedServices(relatedServices.filter((_, i) => i !== idx))}
                    className="ml-1 text-slate-400 hover:text-red-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                value={newRelatedService}
                onChange={(e) => setNewRelatedService(e.target.value)}
                placeholder="e.g. BMS & Environmental Automation"
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (newRelatedService.trim()) {
                    setRelatedServices([...relatedServices, newRelatedService.trim()]);
                    setNewRelatedService("");
                  }
                }}
                className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ADVANCED SEO, SCHEMA & AUTHOR SETTINGS */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          {/* Author & Publisher Section */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                1. Author & Publisher Schema Markup Settings
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Fixes &quot;Publisher: Missing&quot; errors in SEO tools and verifies technical authorship for Google E-E-A-T.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Publisher Name (Global Entity)
                </label>
                <input
                  type="text"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold bg-slate-50 text-slate-800"
                  placeholder="Thermopharm Engineering"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Default: Thermopharm Engineering (Injected into Schema.org organization markup).
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Author / Subject Matter Expert
                </label>
                <select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold bg-white text-slate-800"
                >
                  <option value="Ashish Jha - Founder & Director">Ashish Jha - Founder & Director @ Thermopharm</option>
                  <option value="Sudip Yadav - Design Manager">Sudip Yadav - Design Manager</option>
                  <option value="Khushbu Jha - Director">Khushbu Jha - Director</option>
                  <option value="Thermopharm HVAC Engineering Team">Thermopharm HVAC Engineering Team</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Establishes domain authority and technical credibility for search engine audits.
                </p>
              </div>
            </div>
          </div>

          {/* Meta Tags & SERP Preview */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                2. Meta Tags & Google SERP Preview
              </h2>
            </div>

            {/* Google SERP Snippet Preview Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Google SERP Snippet Preview
              </span>
              <div className="text-sm font-semibold text-blue-700 truncate hover:underline cursor-pointer">
                {metaTitle ? `${metaTitle} | Thermopharm Pvt. Ltd.` : `${title || "Service Title"} | Thermopharm Pvt. Ltd.`}
              </div>
              <div className="text-[11px] font-mono text-emerald-700">
                https://thermopharm.in/services/{slug || "service-slug"}
              </div>
              <div className="text-xs text-slate-600 line-clamp-2">
                {metaDesc || shortDesc || "GMP cleanroom and industrial HVAC engineering solutions..."}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Meta Title (Max 60 chars)
                  </label>
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      metaTitle.length > 60 ? "text-amber-600" : "text-slate-400"
                    }`}
                  >
                    {metaTitle.length}/60 characters
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs"
                  placeholder="e.g. Turnkey GMP Cleanroom Engineering Mumbai"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Note: &quot; | Thermopharm Pvt. Ltd.&quot; is automatically appended by site code. Keep primary keywords within first 50 characters.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Meta Description (Max 155 chars)
                  </label>
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      metaDesc.length > 155 ? "text-amber-600" : "text-slate-400"
                    }`}
                  >
                    {metaDesc.length}/155 characters
                  </span>
                </div>
                <textarea
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs"
                  placeholder="ISO 14644 and WHO-GMP compliant cleanroom HVAC engineering solutions in India..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Keywords (Comma Separated)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono"
                  placeholder="cleanroom HVAC, pharmaceutical engineering, ISO 14644, Mumbai cleanroom"
                />
              </div>
            </div>
          </div>

          {/* Canonical URL & Robots Control */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                3. Canonical URL & Robots Meta Controls
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Advanced Canonical URL (Optional Override)
                </label>
                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono"
                  placeholder="https://thermopharm.in/services/canonical-slug"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Prevents duplicate content penalties if multiple similar services are created.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Search Engine Indexing Control (X-Robots-Tag)
                </label>
                <select
                  value={robotsMeta}
                  onChange={(e) => setRobotsMeta(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold bg-white text-slate-800"
                >
                  <option value="index, follow">Allow Indexing & Following (DEFAULT)</option>
                  <option value="noindex, nofollow">Hide from Search Engines (NOINDEX, NOFOLLOW)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Use &quot;NOINDEX&quot; when drafting or prototyping new service pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
