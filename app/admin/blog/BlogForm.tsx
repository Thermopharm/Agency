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
  Check
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    faq: FAQItem[];
    metaTitle: string;
    metaDesc: string;
    status: string;
  };
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [imageAlt, setImageAlt] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "HVAC Engineering");
  const [author, setAuthor] = useState(initialData?.author || "Thermopharm Expert");
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split("T")[0]);
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 min read");
  const [status, setStatus] = useState(initialData?.status || "DRAFT");
  const [imageTab, setImageTab] = useState<"url" | "upload">("url");

  // Arrays
  const [faq, setFaq] = useState<FAQItem[]>(initialData?.faq || []);

  // SEO
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.metaDesc || "");

  // Auto-generate slug from title
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
    } catch (err: any) {
      alert(err.message || "Failed to upload image");
    }
  };

  // Insert helper
  const handleInsertSnippet = (snippet: string) => {
    setContent((prev) => prev + "\n" + snippet);
  };

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
      category,
      author,
      date,
      readTime,
      faq,
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
    <div className="space-y-6 pb-20 font-sans antialiased text-slate-800 max-w-6xl mx-auto">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all posts</span>
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

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => alert("AI Draft Assistant coming soon!")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold text-purple-700 transition-all shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Draft</span>
          </button>

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
            <span>Publish</span>
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
        {/* Left Form Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title */}
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
              placeholder="e.g. How Much Does It Cost to Build a Cleanroom Facility in India?"
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
                placeholder="cleanroom-facility-cost-india"
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

          {/* Excerpt */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              EXCERPT / SHORT SUMMARY
            </label>
            <textarea
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full bg-white border border-slate-200/80 rounded-2xl p-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
              placeholder="Discover how much it costs to build a cleanroom facility in India, including ISO standards, HVAC systems, and validation expenses..."
            />
          </div>

          {/* Insert Quick Snippets Bar */}
          <div className="flex items-center gap-2 bg-slate-100/70 p-2 rounded-xl text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2">
              INSERT:
            </span>
            <button
              type="button"
              onClick={() => handleInsertSnippet('\n<a href="/contact" class="inline-btn">Discuss Your Cleanroom Project</a>\n')}
              className="px-3 py-1 bg-white hover:bg-slate-200/80 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              CTA Button
            </button>
            <button
              type="button"
              onClick={() => handleInsertSnippet("\n---\n")}
              className="px-3 py-1 bg-white hover:bg-slate-200/80 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              Divider
            </button>
            <button
              type="button"
              onClick={() => handleInsertSnippet('\n<iframe src="https://youtube.com/embed/..." class="w-full aspect-video rounded-xl"></iframe>\n')}
              className="px-3 py-1 bg-white hover:bg-slate-200/80 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              Embed (YT / X)
            </button>
          </div>

          {/* Body Content with Rich Formatting Bar */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              CONTENT *
            </label>
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              {/* Rich Text Toolbar */}
              <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50/80 border-b border-slate-200/80 text-xs">
                <select className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs font-semibold text-slate-700">
                  <option>Normal</option>
                  <option>Heading 2</option>
                  <option>Heading 3</option>
                </select>
                <div className="h-4 w-px bg-slate-200 mx-1" />
                <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded text-slate-600 font-bold" title="Bold">
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded text-slate-600" title="Italic">
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded text-slate-600" title="Underline">
                  <Underline className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded text-slate-600" title="Strikethrough">
                  <Strikethrough className="w-3.5 h-3.5" />
                </button>
                <div className="h-4 w-px bg-slate-200 mx-1" />
                <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded text-slate-600" title="Quote">
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded text-slate-600" title="Code">
                  <Code className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded text-slate-600" title="List">
                  <List className="w-3.5 h-3.5" />
                </button>
                <div className="h-4 w-px bg-slate-200 mx-1" />
                <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded text-slate-600" title="Link">
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded text-slate-600" title="Image">
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                className="w-full p-5 text-sm font-sans text-slate-800 placeholder-slate-400 focus:outline-none"
                placeholder="Start writing your engineering article here..."
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar Panels (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cover Image Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              Cover Image
            </h3>

            {/* URL / Upload Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  imageTab === "url" ? "bg-black text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => setImageTab("upload")}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  imageTab === "upload" ? "bg-black text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
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
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-mono"
                placeholder="https://images.unsplash.com/..."
              />
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-black rounded-xl p-6 cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all">
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Choose Image File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}

            {/* Image Preview Box */}
            {image && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Cover Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-lg backdrop-blur-md transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Alt Text Input */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                COVER IMAGE ALT TEXT (FOR SEO)
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800"
                placeholder="e.g. Modern HVAC Cleanroom Facility Construction"
              />
            </div>
          </div>

          {/* SEO Settings Panel */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              SEO Settings
            </h3>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  META TITLE
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {metaTitle.length}/60 characters
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
                placeholder="e.g. Cleanroom Facility Construction Costs India"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  META DESCRIPTION
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  SEO Description (160 chars max)
                </span>
              </div>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium"
                placeholder="SEO Description (160 chars max)..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
