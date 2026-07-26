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
  Globe,
  Tag,
  ShieldCheck,
  Building2,
  UserCheck,
  CheckCircle2,
  Video,
  Quote,
  Link2
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface GalleryItem {
  url: string;
  alt: string;
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
    imageAlt?: string;
    gallery?: GalleryItem[] | string;
    videoUrl?: string;
    description: string;
    challenge: string;
    solution: string;
    results: string[] | string;
    tags: string[] | string;
    faq: FAQItem[] | string;
    facilitySize?: string;
    industrySector?: string;
    complianceStandards?: string[] | string;
    technologiesUsed?: string[] | string;
    testimonialQuote?: string;
    testimonialAuthor?: string;
    relatedServices?: string[] | string;
    metaTitle?: string;
    metaDesc?: string;
    keywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
    robotsMeta?: string;
    publisher?: string;
    author?: string;
    status: string;
  };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"narrative" | "specs" | "media" | "trust" | "seo">("narrative");

  // Helper to safely parse JSON strings or return array
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

  // Form State - Basic & Narrative
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [location, setLocation] = useState(initialData?.location || "Mumbai, India");
  const [year, setYear] = useState(initialData?.year || new Date().getFullYear().toString());
  const [client, setClient] = useState(initialData?.client || "");
  const [category, setCategory] = useState(initialData?.category || "Cleanrooms");
  const [description, setDescription] = useState(initialData?.description || "");
  const [challenge, setChallenge] = useState(initialData?.challenge || "");
  const [solution, setSolution] = useState(initialData?.solution || "");
  const [status, setStatus] = useState(initialData?.status || "PUBLISHED");
  const [results, setResults] = useState<string[]>(safeParseArray(initialData?.results));
  const [tags, setTags] = useState<string[]>(safeParseArray(initialData?.tags));

  // Technical Specs Block
  const [facilitySize, setFacilitySize] = useState(initialData?.facilitySize || "45,000 sq. ft.");
  const [industrySector, setIndustrySector] = useState(initialData?.industrySector || "Oral Solid Dosage (OSD)");
  const [complianceStandards, setComplianceStandards] = useState<string[]>(
    safeParseArray(initialData?.complianceStandards).length > 0
      ? safeParseArray(initialData?.complianceStandards)
      : ["ISO 14644 Class 7", "cGMP", "US-FDA 21 CFR Part 11"]
  );
  const [technologiesUsed, setTechnologiesUsed] = useState<string[]>(
    safeParseArray(initialData?.technologiesUsed).length > 0
      ? safeParseArray(initialData?.technologiesUsed)
      : ["3D BIM Modeling", "Chilled Water Piping", "AHU & HEPA H14"]
  );

  // Visual Proof & Media
  const [image, setImage] = useState(initialData?.image || "");
  const [imageAlt, setImageAlt] = useState(initialData?.imageAlt || "3D BIM modeling for pharmaceutical HVAC Mumbai");
  const [gallery, setGallery] = useState<GalleryItem[]>(
    safeParseArray(initialData?.gallery).map((item) =>
      typeof item === "string" ? { url: item, alt: "Project gallery image" } : item
    )
  );
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newGalleryAlt, setNewGalleryAlt] = useState("");
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");

  // Trust & E-E-A-T
  const [testimonialQuote, setTestimonialQuote] = useState(initialData?.testimonialQuote || "");
  const [testimonialAuthor, setTestimonialAuthor] = useState(initialData?.testimonialAuthor || "");
  const [relatedServices, setRelatedServices] = useState<string[]>(
    safeParseArray(initialData?.relatedServices).length > 0
      ? safeParseArray(initialData?.relatedServices)
      : ["Cleanroom HVAC Systems", "BMS & Automation"]
  );
  const [newRelatedService, setNewRelatedService] = useState("");

  // SEO & Schema
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.metaDesc || "");
  const [keywords, setKeywords] = useState(initialData?.keywords || "");
  const [ogImage, setOgImage] = useState(initialData?.ogImage || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || "");
  const [robotsMeta, setRobotsMeta] = useState(initialData?.robotsMeta || "index, follow");
  const [publisher, setPublisher] = useState(initialData?.publisher || "Thermopharm Engineering");
  const [author, setAuthor] = useState(initialData?.author || "Ashish Jha - Founder & Director");

  // Word Count Helper across narrative fields
  const totalWords = (description + " " + challenge + " " + solution)
    .trim()
    .split(/\s+/).filter(Boolean).length;

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

  // Primary Image Upload
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

  // OG Image Upload
  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setOgImage(data.url);
    } catch (err: any) {
      alert(err.message || "Failed to upload OG image");
    }
  };

  // Gallery Upload
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
      setGallery([...gallery, { url: data.url, alt: title ? `${title} cleanroom HVAC installation` : "Case study photo" }]);
    } catch (err: any) {
      alert(err.message || "Failed to upload gallery image");
    }
  };

  // Form Submit
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
      imageAlt,
      gallery,
      videoUrl,
      description,
      challenge,
      solution,
      results,
      tags,
      faq: [],
      facilitySize,
      industrySector,
      complianceStandards,
      technologiesUsed,
      testimonialQuote,
      testimonialAuthor,
      relatedServices,
      metaTitle,
      metaDesc,
      keywords,
      ogImage,
      canonicalUrl,
      robotsMeta,
      publisher,
      author,
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
      if (!res.ok) throw new Error(data.error || "Failed to save case study project");

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-16">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all border border-slate-200 text-slate-700 bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
              {initialData?.id ? "Edit Case Study Project" : "New Case Study Project"}
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              High-Authority Engineering Case Study & Schema Builder
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
            <span>Save Case Study</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveTab("narrative")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === "narrative"
              ? "bg-black text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          1. Basic Details & Narrative
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
          2. Tech Specs & Quick Data
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("media")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === "media"
              ? "bg-black text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          3. Media Gallery & Alt Text
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("trust")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === "trust"
              ? "bg-black text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <Quote className="w-3.5 h-3.5" />
          4. Testimonial & Internal Links
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
          5. SEO, OG & CaseStudy Schema
        </button>
      </div>

      {/* TAB 1: BASIC DETAILS & NARRATIVE */}
      {activeTab === "narrative" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Basic Case Study Identification
            </h2>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Project Title *
                </label>
                <span className="text-[11px] text-slate-400">
                  Ideal Format: <code className="text-blue-600 font-mono">[Project Type] in [Location] | Thermopharm</code>
                </span>
              </div>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="e.g. OSD Block HVAC Overhaul | Sun Pharma Vadodara"
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
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono bg-slate-50 text-slate-600"
                placeholder="osd-block-hvac-overhaul-sun-pharma"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs"
                  placeholder="e.g. Vadodara, Gujarat, India"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Completion Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs"
                  placeholder="e.g. 2024"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium"
                  placeholder="e.g. Sun Pharmaceutical Industries"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold bg-white"
                >
                  <option value="Cleanrooms">Cleanrooms</option>
                  <option value="HVAC Systems">HVAC Systems</option>
                  <option value="Containment">Containment</option>
                  <option value="Water Systems">Water Systems</option>
                  <option value="Turnkey EPC">Turnkey EPC</option>
                </select>
              </div>
            </div>
          </div>

          {/* Project Narrative Content Engine */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Case Study Narrative (The Content Engine)
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Comprehensive engineering details for client authority</p>
              </div>
              <span
                className={`text-[11px] font-mono font-bold px-3 py-1 rounded-xl ${
                  totalWords >= 600
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                Word Count: {totalWords} (Aim for 600–1,000+ words for top Google ranking)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Executive Overview Description *
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs leading-relaxed"
                placeholder="High-level project summary highlighting facility scope and turnkey execution..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                The Engineering Challenge *
              </label>
              <textarea
                required
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                rows={5}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs leading-relaxed font-sans"
                placeholder="Detail site constraints, stringent humidity parameters (±2% RH), ambient heat loads, and regulatory audit deadlines..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                The Technical Solution & Architecture *
              </label>
              <textarea
                required
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                rows={6}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs leading-relaxed font-sans"
                placeholder="Explain the custom HVAC layout, 3D BIM clash detection, AHU staging, HEPA H14 filtration, and BMS integration..."
              />
            </div>

            {/* Key Results & Metrics */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Key Results & Quantifiable Metrics
                </label>
                <button
                  type="button"
                  onClick={() => setResults([...results, ""])}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Metric
                </button>
              </div>

              {results.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No key results added yet.</p>
              ) : (
                <div className="space-y-2">
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
                        className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold"
                        placeholder="e.g. Energy Savings: 22% Reduction | Validation Time: Reduced by 3 weeks"
                      />
                      <button
                        type="button"
                        onClick={() => setResults(results.filter((_, idx) => idx !== i))}
                        className="p-2 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TECHNICAL SPECS & QUICK DATA */}
      {activeTab === "specs" && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            Quick-Read Technical Specifications Block
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Facility Footprint / Size
              </label>
              <input
                type="text"
                value={facilitySize}
                onChange={(e) => setFacilitySize(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold"
                placeholder="e.g. 45,000 sq. ft. (4,180 m²)"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Industry Sector
              </label>
              <select
                value={industrySector}
                onChange={(e) => setIndustrySector(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold bg-white"
              >
                <option value="Oral Solid Dosage (OSD)">Oral Solid Dosage (OSD)</option>
                <option value="Vaccines & Injectables">Vaccines & Injectables</option>
                <option value="Biotechnology & Cell Culture">Biotechnology & Cell Culture</option>
                <option value="Healthcare & Hospital Cleanrooms">Healthcare & Hospital Cleanrooms</option>
                <option value="Medical Devices Class I-III">Medical Devices Class I-III</option>
                <option value="API & Fine Chemicals">API & Fine Chemicals</option>
              </select>
            </div>
          </div>

          {/* Compliance Standards Tags */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Compliance Standards Met
            </label>
            <div className="flex flex-wrap gap-2">
              {complianceStandards.map((std, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold rounded-xl"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {std}
                  <button
                    type="button"
                    onClick={() => setComplianceStandards(complianceStandards.filter((_, idx) => idx !== i))}
                    className="ml-1 text-purple-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Add Standard (e.g. ISO 14644 Class 5)..."
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val && !complianceStandards.includes(val)) {
                      setComplianceStandards([...complianceStandards, val]);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Key Technologies Used Tags */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Key Technologies & Equipment Staged
            </label>
            <div className="flex flex-wrap gap-2">
              {technologiesUsed.map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl"
                >
                  <Tag className="w-3 h-3" />
                  {tech}
                  <button
                    type="button"
                    onClick={() => setTechnologiesUsed(technologiesUsed.filter((_, idx) => idx !== i))}
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
                placeholder="Add Technology (e.g. VFD Smart Controls)..."
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val && !technologiesUsed.includes(val)) {
                      setTechnologiesUsed([...technologiesUsed, val]);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MEDIA GALLERY & ALT TEXT */}
      {activeTab === "media" && (
        <div className="space-y-6">
          {/* Primary Feature Image */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-600" />
              Primary Feature Image & Alt Text
            </h2>

            {image && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 max-w-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={imageAlt || "Feature image"} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Feature Image URL
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Image Alt Text (SEO Essential) *
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                  placeholder="e.g. 3D BIM modeling for pharmaceutical HVAC Mumbai"
                />
              </div>
            </div>

            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 rounded-2xl p-4 cursor-pointer transition-all max-w-xl">
              <Upload className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-700">Upload Feature Image File</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {/* Project Gallery */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-600" />
                Project Image Gallery ({gallery.length} Images)
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl p-3 bg-slate-50 space-y-2 relative group">
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Alt Text</label>
                    <input
                      type="text"
                      value={item.alt}
                      onChange={(e) => {
                        const newGal = [...gallery];
                        newGal[idx].alt = e.target.value;
                        setGallery(newGal);
                      }}
                      className="w-full border border-slate-200 rounded-lg px-2 py-1 text-[11px] bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-amber-600 hover:bg-amber-50/50 rounded-2xl p-3 cursor-pointer transition-all">
              <Upload className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-700">Upload Gallery Image</span>
              <input type="file" accept="image/*" onChange={handleGalleryUpload} className="hidden" />
            </label>
          </div>

          {/* Video Walkthrough */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Video className="w-4 h-4 text-red-600" />
              Video Walkthrough / BIM Flythrough URL (Optional)
            </h2>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono"
              placeholder="e.g. https://www.youtube.com/watch?v=EXAMPLE or Vimeo link"
            />
          </div>
        </div>
      )}

      {/* TAB 4: TESTIMONIAL & INTERNAL LINKS */}
      {activeTab === "trust" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Quote className="w-4 h-4 text-emerald-600" />
              Client Endorsement & E-E-A-T Proof
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Client Testimonial Quote
              </label>
              <textarea
                value={testimonialQuote}
                onChange={(e) => setTestimonialQuote(e.target.value)}
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs italic"
                placeholder="&quot;Thermopharm delivered our ISO Class 7 OSD cleanroom 2 weeks ahead of schedule with 100% USFDA audit compliance...&quot;"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Client Name & Designation
              </label>
              <input
                type="text"
                value={testimonialAuthor}
                onChange={(e) => setTestimonialAuthor(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold"
                placeholder="e.g. VP Engineering & Facilities, Sun Pharma"
              />
            </div>
          </div>

          {/* Internal Linking */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-blue-600" />
              Related Services (Passes SEO Link Equity to Core Pages)
            </h2>

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

      {/* TAB 5: SEO, OG & CASESTUDY SCHEMA */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                Google SERP Snippet Preview & Meta Settings
              </h2>
            </div>

            {/* Live Google SERP Snippet */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Google SERP Snippet Preview
              </span>
              <div className="text-sm font-semibold text-blue-700 truncate hover:underline cursor-pointer">
                {metaTitle ? `${metaTitle} | Thermopharm` : `${title || "Project Title"} | Thermopharm`}
              </div>
              <div className="text-[11px] font-mono text-emerald-700">
                https://thermopharm.in/projects/{slug || "case-study-slug"}
              </div>
              <div className="text-xs text-slate-600 line-clamp-2">
                {metaDesc || description || "Turnkey cleanroom HVAC engineering case study..."}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Meta Title (Format: &quot;[Project Type] in [Location] | Thermopharm&quot;)
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
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold"
                  placeholder="e.g. OSD Block HVAC Overhaul | Thermopharm Engineering"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Meta Description (0/155 chars - Soft CTA)
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
                  placeholder="Learn how we ensured cGMP compliance and 22% energy savings for Sun Pharma's OSD block..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Focus Keywords
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono"
                  placeholder="cleanroom HVAC case study, Sun Pharma HVAC, OSD cleanroom Mumbai"
                />
              </div>
            </div>
          </div>

          {/* Social Sharing Open Graph & Schema Controls */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-600" />
                Open Graph Social Sharing & CaseStudy Schema Settings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Open Graph (OG) Image URL (LinkedIn/Twitter preview)
                </label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono mb-2"
                  placeholder="https://..."
                />
                <label className="flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-purple-600 rounded-xl p-2 cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700">Upload OG Image</span>
                  <input type="file" accept="image/*" onChange={handleOgImageUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Advanced Canonical URL Override
                </label>
                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono"
                  placeholder="https://thermopharm.in/projects/canonical-slug"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Publisher (Schema.org Organization)
                </label>
                <input
                  type="text"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold bg-slate-50 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Search Engine Indexing Control
                </label>
                <select
                  value={robotsMeta}
                  onChange={(e) => setRobotsMeta(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold bg-white"
                >
                  <option value="index, follow">Allow Indexing & Following (DEFAULT)</option>
                  <option value="noindex, nofollow">Hide from Search Engines (NOINDEX)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
