"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
  Upload,
  Globe,
  X,
  Check,
  Factory,
  Pill,
  FlaskConical,
  Stethoscope,
  Cpu,
  Microscope,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Link2,
  ImageIcon
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface IndustryFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    shortDesc: string;
    fullDesc: string;
    icon: string;
    image: string;
    imageAlt?: string;
    specs: string[];
    standards: string[];
    challenges?: string[];
    solutions?: string[];
    relatedServices?: string[];
    relatedProjects?: string[];
    relatedArticles?: string[];
    metaTitle?: string;
    metaDesc?: string;
    focusKeyword?: string;
    canonicalUrl?: string;
    robotsMeta?: string;
    faq?: FAQItem[];
    status?: string;
  };
}

export default function IndustryForm({ initialData }: IndustryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Basic Details
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDesc, setShortDesc] = useState(initialData?.shortDesc || "");
  const [icon, setIcon] = useState(initialData?.icon || "Factory");
  const [status, setStatus] = useState(initialData?.status || "PUBLISHED");

  // 2. Content & Expertise
  const [fullDesc, setFullDesc] = useState(initialData?.fullDesc || "");
  const [standards, setStandards] = useState<string[]>(
    initialData?.standards || [
      "ISO 14644-1:2015",
      "cGMP (Good Manufacturing Practice)",
      "US-FDA 21 CFR Part 11",
      "EU GMP Annex 1"
    ]
  );
  const [challenges, setChallenges] = useState<string[]>(
    initialData?.challenges || [
      "Strict temperature & relative humidity control (45% ± 5%)",
      "Preventing airborne particulate & microbiological cross-contamination",
      "Maintaining continuous positive pressure cascades across cleanroom zones"
    ]
  );
  const [solutions, setSolutions] = useState<string[]>(
    initialData?.solutions || [
      "Custom AHU design with multi-stage HEPA H14 filtration",
      "Automated Building Management System (BMS) with audit trail logging",
      "Turnkey IQ/OQ/PQ validation & environmental monitoring"
    ]
  );
  const [specs, setSpecs] = useState<string[]>(
    initialData?.specs || ["ISO Class 5 to 8", "Custom Dehumidification", "Zero Contamination"]
  );

  // 3. Proof & Internal Linking (Topical Clusters)
  const [relatedServices, setRelatedServices] = useState<string[]>(
    initialData?.relatedServices || ["cleanroom-design", "hvac-systems", "bms-automation"]
  );
  const [relatedProjects, setRelatedProjects] = useState<string[]>(
    initialData?.relatedProjects || []
  );

  // 4. Media
  const [image, setImage] = useState(initialData?.image || "");
  const [imageAlt, setImageAlt] = useState(initialData?.imageAlt || initialData?.title || "");
  const [imageTab, setImageTab] = useState<"url" | "upload">("url");

  // 5. SEO & GEO Settings
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.metaDesc || "");
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focusKeyword || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || "");
  const [robotsMeta, setRobotsMeta] = useState(initialData?.robotsMeta || "index, follow");
  const [faq, setFaq] = useState<FAQItem[]>(initialData?.faq || []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData?.id) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
      setMetaTitle(`${val} HVAC & Cleanroom Solutions | Thermopharm`);
    }
  };

  const handleResetSlug = () => {
    setSlug(
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
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

  // Repeaters
  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[]) => {
    setter([...list, ""]);
  };
  const updateItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    idx: number,
    val: string
  ) => {
    const updated = [...list];
    updated[idx] = val;
    setter(updated);
  };
  const removeItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    idx: number
  ) => {
    setter(list.filter((_, i) => i !== idx));
  };

  // FAQ Handlers
  const addFaqItem = () => setFaq([...faq, { question: "", answer: "" }]);
  const removeFaqItem = (index: number) => setFaq(faq.filter((_, i) => i !== index));
  const updateFaqItem = (index: number, field: "question" | "answer", val: string) => {
    const updated = [...faq];
    updated[index][field] = val;
    setFaq(updated);
  };

  const handleSubmit = async (targetStatus: string) => {
    setLoading(true);
    setError(null);

    const payload = {
      title,
      slug,
      shortDesc,
      fullDesc,
      icon,
      image: image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      imageAlt: imageAlt || title,
      specs,
      standards,
      challenges,
      solutions,
      relatedServices,
      relatedProjects,
      metaTitle,
      metaDesc: metaDesc || shortDesc,
      focusKeyword,
      canonicalUrl,
      robotsMeta,
      faq,
      status: targetStatus,
    };

    try {
      const url = initialData?.id
        ? `/api/admin/industries/${initialData.id}`
        : "/api/admin/industries";
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save industry sector");

      router.push("/admin/industries");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 font-sans antialiased text-slate-800 max-w-6xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/industries"
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Industries</span>
          </Link>
          <span
            className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
              status === "PUBLISHED"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit("DRAFT")}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-2xs"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-slate-500" />}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit("PUBLISHED")}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-black hover:bg-slate-800 rounded-xl text-xs font-bold text-white transition-all shadow-sm"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5 text-emerald-400" />}
            <span>Publish Sector</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Columns (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* SECTION 1: BASIC DETAILS */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Factory className="w-4 h-4 text-blue-600" />
              1. Basic Industry Details
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                INDUSTRY TITLE *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. Pharmaceutical & Active Pharmaceutical Ingredients (API)"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                # URL SLUG
              </label>
              <div className="flex items-center bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
                <span className="px-3.5 py-2.5 bg-slate-50 text-slate-400 font-mono text-xs border-r border-slate-200">
                  /industries/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none"
                  placeholder="pharmaceutical-api"
                />
                <button
                  type="button"
                  onClick={handleResetSlug}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 border-l border-slate-200"
                >
                  Reset
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                SHORT SUMMARY * (FOR CARDS & SEARCH)
              </label>
              <textarea
                required
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                placeholder="Turnkey cleanrooms, sterile air distribution, and automated BMS for oral solid dosage & sterile API production..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                INDUSTRY ICON
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
              >
                <option value="Factory">Factory (Manufacturing & Engineering)</option>
                <option value="Pill">Pill (Pharmaceutical & Formulations)</option>
                <option value="FlaskConical">FlaskConical (Chemical & Biotech)</option>
                <option value="Stethoscope">Stethoscope (Hospital & Operating Theatres)</option>
                <option value="Cpu">Cpu (Semiconductor & Electronics)</option>
                <option value="Microscope">Microscope (R&D & Testing Labs)</option>
                <option value="ShieldCheck">ShieldCheck (Cleanroom Validation)</option>
              </select>
            </div>
          </div>

          {/* SECTION 2: CONTENT & EXPERTISE */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              2. Content & Sector Expertise
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                FULL DESCRIPTION (RICH OVERVIEW)
              </label>
              <textarea
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                rows={6}
                className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 leading-relaxed"
                placeholder="Detail the sector requirements, air filtration protocols, and engineering compliance..."
              />
            </div>

            {/* Compliance Standards Repeater */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  KEY COMPLIANCE STANDARDS (e.g. ISO 14644, cGMP, FDA)
                </label>
                <button
                  type="button"
                  onClick={() => addItem(setStandards, standards)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Standard
                </button>
              </div>
              {standards.map((st, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={st}
                    onChange={(e) => updateItem(setStandards, standards, idx, e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                    placeholder="e.g. ISO 14644-1 Class 5-8"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setStandards, standards, idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Common Challenges Repeater */}
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  COMMON INDUSTRY CHALLENGES
                </label>
                <button
                  type="button"
                  onClick={() => addItem(setChallenges, challenges)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Challenge
                </button>
              </div>
              {challenges.map((ch, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ch}
                    onChange={(e) => updateItem(setChallenges, challenges, idx, e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                    placeholder="e.g. Strict temperature/humidity control"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setChallenges, challenges, idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Solutions Repeater */}
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  OUR TAILORED SOLUTIONS
                </label>
                <button
                  type="button"
                  onClick={() => addItem(setSolutions, solutions)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Solution
                </button>
              </div>
              {solutions.map((sol, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sol}
                    onChange={(e) => updateItem(setSolutions, solutions, idx, e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                    placeholder="e.g. Custom AHU design with HEPA filtration"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setSolutions, solutions, idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: INDUSTRY FAQ (GEO & AEO) */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                Industry Specific FAQ (For Perplexity, Gemini & Google GEO)
              </h3>
              <button
                type="button"
                onClick={addFaqItem}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Q&A Pair
              </button>
            </div>

            {faq.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Q{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaqItem(idx)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateFaqItem(idx, "question", e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                  placeholder="Question (e.g. What is the required air change rate for pharmaceutical cleanrooms?)"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => updateFaqItem(idx, "answer", e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700"
                  placeholder="Answer..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Columns (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* SECTION 4: MEDIA */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              Hero Image
            </h3>
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  imageTab === "url" ? "bg-black text-white shadow-xs" : "text-slate-600"
                }`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => setImageTab("upload")}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  imageTab === "upload" ? "bg-black text-white shadow-xs" : "text-slate-600"
                }`}
              >
                Upload
              </button>
            </div>

            {imageTab === "url" ? (
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800"
                placeholder="https://images.unsplash.com/..."
              />
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer bg-slate-50/50 hover:bg-slate-50">
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Upload Image File</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}

            {image && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                placeholder="e.g. Pharmaceutical Cleanroom HVAC Installation"
              />
            </div>
          </div>

          {/* SECTION 3: PROOF & INTERNAL LINKING */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-blue-600" />
              3. Relational Internal Links
            </h3>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Related Service Slugs (Comma Separated)
              </label>
              <input
                type="text"
                value={relatedServices.join(", ")}
                onChange={(e) =>
                  setRelatedServices(e.target.value.split(",").map((s) => s.trim()))
                }
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800"
                placeholder="cleanroom-design, hvac-systems"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Related Project Slugs (Comma Separated)
              </label>
              <input
                type="text"
                value={relatedProjects.join(", ")}
                onChange={(e) =>
                  setRelatedProjects(e.target.value.split(",").map((s) => s.trim()))
                }
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800"
                placeholder="sun-pharma-hvac-overhaul"
              />
            </div>
          </div>

          {/* SECTION 5: SEO SETTINGS */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              5. SEO Settings
            </h3>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Focus Keyword
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                placeholder="pharmaceutical HVAC contractors India"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Meta Title ({metaTitle.length}/60)
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Meta Description (155 Chars)
              </label>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
