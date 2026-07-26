"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
  Upload,
  Sparkles,
  Globe,
  X,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Quote,
  Code,
  List,
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
  Award,
  HelpCircle,
  Video,
  FileText,
  ShieldCheck,
  Tag,
  Zap,
  Layout,
  Table as TableIcon,
  AlertTriangle,
  Lightbulb,
  FileSpreadsheet
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ResourceItem {
  title: string;
  url: string;
  type: string;
}

interface GalleryItem {
  url: string;
  alt: string;
  caption: string;
}

interface BlogFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    imageAlt?: string;
    category: string;
    author: string;
    authorCredentials?: string;
    technicalReviewer?: string;
    date: string;
    lastUpdated?: string;
    readTime: string;
    faq: FAQItem[];
    keyTakeaways?: string[];
    techSpecs?: { key: string; value: string }[];
    tableData?: { headers: string[]; rows: string[][] };
    calloutBoxes?: { type: string; title: string; text: string }[];
    videoUrl?: string;
    videoTranscript?: string;
    downloadableResources?: ResourceItem[];
    gallery?: GalleryItem[];
    schemaType?: string;
    focusKeyword?: string;
    secondaryKeywords?: string;
    ogImage?: string;
    twitterCard?: string;
    canonicalUrl?: string;
    robotsMeta?: string;
    relatedServices?: string[];
    relatedProjects?: string[];
    relatedArticles?: string[];
    ctaText?: string;
    ctaLink?: string;
    ctaStyle?: string;
    disclaimerText?: string;
    sources?: string[];
    industryTags?: string[];
    standardsMentioned?: string[];
    metaTitle: string;
    metaDesc: string;
    status: string;
  };
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"eeat" | "geo" | "seo" | "quality" | "compliance">("eeat");

  // Basic Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [imageAlt, setImageAlt] = useState(initialData?.imageAlt || initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "HVAC Engineering");
  const [imageTab, setImageTab] = useState<"url" | "upload">("url");

  // 1. Author & E-E-A-T Section
  const [author, setAuthor] = useState(initialData?.author || "Ashish Jha");
  const [authorCredentials, setAuthorCredentials] = useState(
    initialData?.authorCredentials || "Senior HVAC Cleanroom Specialist (15+ Yrs)"
  );
  const [technicalReviewer, setTechnicalReviewer] = useState(
    initialData?.technicalReviewer || "Thermopharm Quality & Compliance Board"
  );
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split("T")[0]);
  const [lastUpdated, setLastUpdated] = useState(
    initialData?.lastUpdated || new Date().toISOString().split("T")[0]
  );
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 min read");

  // Auto calculate word count & reading time
  const [wordCount, setWordCount] = useState(0);
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    setWordCount(words);
    const mins = Math.max(1, Math.ceil(words / 200));
    setReadTime(`${mins} min read`);
  }, [content]);

  // 2. Content Structure Enhancers (AEO & GEO)
  const [faq, setFaq] = useState<FAQItem[]>(initialData?.faq || []);
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>(
    initialData?.keyTakeaways || [
      "ISO 14644-1 Class 5-8 compliance is mandatory for sterile pharmaceutical HVAC.",
      "AHU selection directly impacts power efficiency and relative humidity control (45±5%).",
      "Regular HEPA filter integrity testing (DOP/PAO) prevents batch contamination."
    ]
  );
  const [techSpecs, setTechSpecs] = useState<{ key: string; value: string }[]>(
    initialData?.techSpecs || [
      { key: "ISO Cleanroom Class", value: "Class 5 to Class 8 (Grade A to D)" },
      { key: "Air Change Rate (ACPH)", value: "20 to 60 ACPH" },
      { key: "Relative Humidity (RH)", value: "45% ± 5%" },
      { key: "Filter Efficiency", value: "HEPA H14 (99.995% @ 0.3µm)" }
    ]
  );

  // 3. SEO & Schema Fields
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.metaDesc || "");
  const [schemaType, setSchemaType] = useState(initialData?.schemaType || "BlogPosting");
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focusKeyword || "");
  const [secondaryKeywords, setSecondaryKeywords] = useState(initialData?.secondaryKeywords || "");
  const [ogImage, setOgImage] = useState(initialData?.ogImage || "");
  const [twitterCard, setTwitterCard] = useState(initialData?.twitterCard || "summary_large_image");
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || "");
  const [robotsMeta, setRobotsMeta] = useState(initialData?.robotsMeta || "index, follow");
  const [relatedServices, setRelatedServices] = useState<string[]>(
    initialData?.relatedServices || ["hvac-systems", "cleanroom-design"]
  );
  const [relatedProjects, setRelatedProjects] = useState<string[]>(
    initialData?.relatedProjects || []
  );

  // 4. Content Quality Boosters
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [videoTranscript, setVideoTranscript] = useState(initialData?.videoTranscript || "");
  const [downloadableResources, setDownloadableResources] = useState<ResourceItem[]>(
    initialData?.downloadableResources || []
  );

  // 5. Engagement & Conversion
  const [ctaText, setCtaText] = useState(
    initialData?.ctaText || "Request a Custom Cleanroom Engineering Audit"
  );
  const [ctaLink, setCtaLink] = useState(initialData?.ctaLink || "/contact");
  const [ctaStyle, setCtaStyle] = useState(initialData?.ctaStyle || "button");

  // 6. Compliance & Trust
  const [disclaimerText, setDisclaimerText] = useState(
    initialData?.disclaimerText ||
      "This technical guide is published for engineering and pharmaceutical facility design references in accordance with ISO 14644 and WHO-GMP guidelines."
  );
  const [sources, setSources] = useState<string[]>(
    initialData?.sources || [
      "ISO 14644-1:2015 Cleanrooms and Associated Controlled Environments",
      "WHO TRS 961 Annex 2: GMP for HVAC Systems for Pharmaceutical Products",
      "US-FDA 21 CFR Part 11 Electronic Records"
    ]
  );
  const [industryTags, setIndustryTags] = useState<string[]>(
    initialData?.industryTags || ["Pharma Cleanrooms", "Biotech", "HVAC Design", "GMP Compliance"]
  );

  const [status, setStatus] = useState(initialData?.status || "DRAFT");

  // Auto-generate slug & meta title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData?.id) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
      setMetaTitle(val.slice(0, 60));
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
      if (!ogImage) setOgImage(data.url);
    } catch (err: any) {
      alert(err.message || "Failed to upload image");
    }
  };

  // Snippet Insertion
  const handleInsertSnippet = (snippet: string) => {
    setContent((prev) => prev + "\n\n" + snippet);
  };

  // Handlers for FAQ
  const addFaqItem = () => setFaq([...faq, { question: "", answer: "" }]);
  const removeFaqItem = (index: number) => setFaq(faq.filter((_, i) => i !== index));
  const updateFaqItem = (index: number, field: "question" | "answer", val: string) => {
    const updated = [...faq];
    updated[index][field] = val;
    setFaq(updated);
  };

  // Handlers for Key Takeaways
  const addTakeaway = () => setKeyTakeaways([...keyTakeaways, ""]);
  const updateTakeaway = (idx: number, val: string) => {
    const updated = [...keyTakeaways];
    updated[idx] = val;
    setKeyTakeaways(updated);
  };
  const removeTakeaway = (idx: number) => setKeyTakeaways(keyTakeaways.filter((_, i) => i !== idx));

  // Handlers for Tech Specs
  const addTechSpec = () => setTechSpecs([...techSpecs, { key: "", value: "" }]);
  const updateTechSpec = (idx: number, field: "key" | "value", val: string) => {
    const updated = [...techSpecs];
    updated[idx][field] = val;
    setTechSpecs(updated);
  };
  const removeTechSpec = (idx: number) => setTechSpecs(techSpecs.filter((_, i) => i !== idx));

  // Submit Handler
  const handleSubmit = async (targetStatus: string) => {
    setLoading(true);
    setError(null);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      image,
      imageAlt,
      category,
      author,
      authorCredentials,
      technicalReviewer,
      date,
      lastUpdated,
      readTime,
      faq,
      keyTakeaways,
      techSpecs,
      videoUrl,
      videoTranscript,
      downloadableResources,
      schemaType,
      focusKeyword,
      secondaryKeywords,
      ogImage: ogImage || image,
      twitterCard,
      canonicalUrl,
      robotsMeta,
      relatedServices,
      relatedProjects,
      ctaText,
      ctaLink,
      ctaStyle,
      disclaimerText,
      sources,
      industryTags,
      metaTitle,
      metaDesc,
      status: targetStatus,
    };

    try {
      const url = initialData?.id
        ? `/api/admin/blog/${initialData.id}`
        : "/api/admin/blog";
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save blog post");

      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 font-sans antialiased text-slate-800 max-w-7xl mx-auto">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
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
          <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-600">
            <span>{wordCount} words</span>
            <span>·</span>
            <span className={wordCount >= 1000 ? "text-emerald-600 font-bold" : "text-amber-600"}>
              {wordCount >= 1000 ? "1000+ Target Met ✅" : "Aim for 1000+ words"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
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
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Primary Form (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Article Title */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              ARTICLE TITLE *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-white border border-slate-200/80 rounded-2xl px-5 py-4 text-base font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
              placeholder="e.g. ISO 14644 Cleanroom Classification & HVAC Validation Guide"
            />
          </div>

          {/* URL Slug */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              # URL SLUG
            </label>
            <div className="flex items-center bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              <span className="px-4 py-3 bg-slate-50 text-slate-400 font-mono text-xs border-r border-slate-200/80">
                URL: /blog/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 px-4 py-3 text-xs font-mono text-slate-800 focus:outline-none bg-transparent"
                placeholder="iso-14644-cleanroom-hvac-guide"
              />
              <button
                type="button"
                onClick={handleResetSlug}
                className="px-4 py-3 text-xs font-semibold text-slate-500 hover:text-slate-900 border-l border-slate-200/80 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Excerpt / Summary */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              EXCERPT / SHORT SUMMARY (FOR CARDS & GEO SNIPPETS)
            </label>
            <textarea
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full bg-white border border-slate-200/80 rounded-2xl p-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
              placeholder="Comprehensive guide to cleanroom HVAC design, ISO 14644 particle limits, air change rates (ACPH), and WHO-GMP compliance..."
            />
          </div>

          {/* 1. Author & E-E-A-T Section */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              1. Author & E-E-A-T (Google Search Quality & Authority)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Author Name *
                </label>
                <select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="Ashish Jha">Ashish Jha (Founder & Director)</option>
                  <option value="Sudip Yadav">Sudip Yadav (Senior Design Engineer)</option>
                  <option value="Thermopharm HVAC Team">Thermopharm HVAC Engineering Team</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Author Credentials
                </label>
                <input
                  type="text"
                  value={authorCredentials}
                  onChange={(e) => setAuthorCredentials(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
                  placeholder="e.g. Senior HVAC Engineer, 15+ years exp"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Technical Reviewer
                </label>
                <input
                  type="text"
                  value={technicalReviewer}
                  onChange={(e) => setTechnicalReviewer(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
                  placeholder="e.g. Quality Assurance & GMP Audit Board"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Last Updated Date
                  </label>
                  <input
                    type="date"
                    value={lastUpdated}
                    onChange={(e) => setLastUpdated(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Component Snippets Insertion Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              INSERT RICH CONTENT BLOCKS INTO EDITOR:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  handleInsertSnippet(
                    `<div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-xl my-6">\n<h4 class="font-bold text-blue-900 text-sm">💡 Key Takeaway</h4>\n<p class="text-xs text-blue-800 mt-1">ISO Class 5 cleanrooms require HEPA H14 filters operating at 0.45 m/s air velocity.</p>\n</div>`
                  )
                }
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold text-blue-700 transition-colors"
              >
                💡 Key Takeaway Box
              </button>
              <button
                type="button"
                onClick={() =>
                  handleInsertSnippet(
                    `<div class="bg-amber-50 border border-amber-200 p-4 rounded-xl my-6">\n<h4 class="font-bold text-amber-900 text-sm">⚠️ Important Compliance Note</h4>\n<p class="text-xs text-amber-800 mt-1">FDA 21 CFR Part 11 requires validated electronic temperature & humidity logging.</p>\n</div>`
                  )
                }
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs font-bold text-amber-800 transition-colors"
              >
                ⚠️ Warning / Note
              </button>
              <button
                type="button"
                onClick={() =>
                  handleInsertSnippet(
                    `<table class="w-full border-collapse border border-slate-200 my-6 text-xs">\n<thead><tr class="bg-slate-100"><th class="border border-slate-200 p-2">ISO Class</th><th class="border border-slate-200 p-2">Max Particles (>=0.5µm)</th><th class="border border-slate-200 p-2">ACPH</th></tr></thead>\n<tbody><tr><td class="border p-2">ISO 5</td><td class="border p-2">3,520</td><td class="border p-2">240 - 480</td></tr><tr><td class="border p-2">ISO 7</td><td class="border p-2">352,000</td><td class="border p-2">30 - 60</td></tr></tbody>\n</table>`
                  )
                }
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition-colors"
              >
                📊 Comparison Table
              </button>
              <button
                type="button"
                onClick={() =>
                  handleInsertSnippet(
                    `<div class="bg-emerald-600 text-white p-6 rounded-2xl my-8 text-center shadow-lg">\n<h3 class="text-lg font-bold">Need ISO Cleanroom Engineering?</h3>\n<p class="text-xs text-emerald-100 mt-1">Talk to our HVAC specialists today for turn-key design & validation.</p>\n<a href="/contact" class="inline-block mt-4 px-6 py-2.5 bg-white text-emerald-800 font-bold text-xs rounded-xl hover:bg-emerald-50">Request Consultation</a>\n</div>`
                  )
                }
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 transition-colors"
              >
                🎯 Engineering CTA Banner
              </button>
            </div>
          </div>

          {/* Main Article Content Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                ARTICLE BODY CONTENT (HTML / MARKDOWN) *
              </label>
              <span className="text-xs font-mono text-slate-500">
                {readTime}
              </span>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={18}
                className="w-full p-5 text-sm font-sans text-slate-800 placeholder-slate-400 focus:outline-none leading-relaxed"
                placeholder="Write your 1000+ word engineering guide here..."
              />
            </div>
          </div>

          {/* Navigation Accordion Tabs for Enhanced GEO / AEO Sections */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("geo")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === "geo" ? "bg-black text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>2. GEO & AEO (AI Answers)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("quality")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === "quality" ? "bg-black text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>4. Media & Video SEO</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("compliance")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === "compliance" ? "bg-black text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>6. Standards & Compliance</span>
              </button>
            </div>

            {/* TAB: GEO & AEO (Key Takeaways, FAQs, Tech Specs) */}
            {activeTab === "geo" && (
              <div className="space-y-6">
                {/* Key Takeaways */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Key Takeaways (For AI Engines like Perplexity & ChatGPT)
                    </label>
                    <button
                      type="button"
                      onClick={addTakeaway}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Takeaway
                    </button>
                  </div>
                  {keyTakeaways.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateTakeaway(idx, e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
                        placeholder="Bullet point key insight..."
                      />
                      <button
                        type="button"
                        onClick={() => removeTakeaway(idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* FAQ Builder */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      FAQ Section (Generates FAQPage JSON-LD Schema)
                    </label>
                    <button
                      type="button"
                      onClick={addFaqItem}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add FAQ Pair
                    </button>
                  </div>
                  {faq.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl space-y-2">
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
                        placeholder="e.g. What is the required air change rate for ISO Class 7?"
                      />
                      <textarea
                        value={item.answer}
                        onChange={(e) => updateFaqItem(idx, "answer", e.target.value)}
                        rows={2}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700"
                        placeholder="ISO Class 7 cleanrooms require 30 to 60 air changes per hour..."
                      />
                    </div>
                  ))}
                </div>

                {/* Structured Tech Specs */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Technical Specifications Box
                    </label>
                    <button
                      type="button"
                      onClick={addTechSpec}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Spec Pair
                    </button>
                  </div>
                  {techSpecs.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl">
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) => updateTechSpec(idx, "key", e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                        placeholder="Spec Name (e.g. RH Level)"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => updateTechSpec(idx, "value", e.target.value)}
                          className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                          placeholder="Value (e.g. 45% ± 5%)"
                        />
                        <button
                          type="button"
                          onClick={() => removeTechSpec(idx)}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Media & Video SEO */}
            {activeTab === "quality" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    YouTube / Vimeo Walkthrough Video URL
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Video Transcript (Boosts Video Indexing & Search Rankings)
                  </label>
                  <textarea
                    value={videoTranscript}
                    onChange={(e) => setVideoTranscript(e.target.value)}
                    rows={4}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800"
                    placeholder="Paste video transcript text here..."
                  />
                </div>
              </div>
            )}

            {/* TAB: Standards & Compliance */}
            {activeTab === "compliance" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Engineering Regulatory Disclaimer
                  </label>
                  <textarea
                    value={disclaimerText}
                    onChange={(e) => setDisclaimerText(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800"
                    placeholder="Engineering disclaimer..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Industry Tags & Sector Classification
                  </label>
                  <input
                    type="text"
                    value={industryTags.join(", ")}
                    onChange={(e) =>
                      setIndustryTags(e.target.value.split(",").map((s) => s.trim()))
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                    placeholder="Pharma Cleanrooms, Biotech, HVAC Design"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Panels (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cover Image */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              Cover Feature Image
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
                <span className="text-xs font-bold text-slate-700">Upload Cover File</span>
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
                placeholder="Image description for SEO"
              />
            </div>
          </div>

          {/* 3. Advanced SEO & Schema Accordion */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              3. Advanced SEO & Schema
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Schema Type (JSON-LD)
              </label>
              <select
                value={schemaType}
                onChange={(e) => setSchemaType(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value="BlogPosting">BlogPosting</option>
                <option value="Article">Article</option>
                <option value="TechArticle">TechArticle (Engineering Spec)</option>
                <option value="FAQPage">FAQPage</option>
                <option value="HowTo">HowTo Guide</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Primary Focus Keyword
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                placeholder="e.g. Cleanroom HVAC Cost India"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Secondary Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={secondaryKeywords}
                onChange={(e) => setSecondaryKeywords(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                placeholder="ISO 14644, HEPA filter, ACPH calculation"
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
                Meta Description (160 Chars)
              </label>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Robots Meta Tag
              </label>
              <select
                value={robotsMeta}
                onChange={(e) => setRobotsMeta(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value="index, follow">index, follow (Default - Allow Indexing)</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
          </div>

          {/* 5. Engagement & CTA Settings */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              5. Lead CTA Builder
            </h3>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                placeholder="Request Cleanroom Consultation"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                CTA Destination Link
              </label>
              <input
                type="text"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800"
                placeholder="/contact"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
