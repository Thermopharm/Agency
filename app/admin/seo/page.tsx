"use client";

import { useState } from "react";
import { Globe, Copy, ExternalLink, Eye, Check, ShieldCheck, Cpu } from "lucide-react";

interface SeoFileItem {
  id: string;
  name: string;
  endpoint: string;
  description: string;
  aiEngine: string;
}

export default function AdminSeoPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [loadingPreview, setLoadingPreview] = useState(false);

  const files: SeoFileItem[] = [
    {
      id: "sitemap",
      name: "sitemap.xml",
      endpoint: "/api/sitemap.xml",
      description: "Instructs search engines (Google, Bing, Yahoo) on which pages to index.",
      aiEngine: "Googlebot, Bingbot, Yandex",
    },
    {
      id: "llms",
      name: "llms.txt",
      endpoint: "/api/llms.txt",
      description: "Provides a summarized layout of Thermopharm for AI search engines (Perplexity, ChatGPT, Claude).",
      aiEngine: "Perplexity, ChatGPT, Claude, Gemini",
    },
    {
      id: "llms-full",
      name: "llms-full.txt",
      endpoint: "/api/llms-full.txt",
      description: "Complete markdown mirror containing all articles, projects, and services for deep AI reasoning.",
      aiEngine: "GPT-4o, Claude 3.5, Gemini 1.5 Pro",
    },
    {
      id: "robots",
      name: "robots.txt",
      endpoint: "/api/robots.txt",
      description: "Defines crawler rules for search engines and AI scraper bots.",
      aiEngine: "All Crawlers & Indexers",
    },
  ];

  const handleCopy = (endpoint: string, id: string) => {
    const fullUrl = `${window.location.origin}${endpoint}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePreview = async (file: SeoFileItem) => {
    setLoadingPreview(true);
    setPreviewTitle(file.name);
    try {
      const res = await fetch(file.endpoint);
      const text = await res.text();
      setPreviewContent(text);
    } catch (e) {
      setPreviewContent("Failed to load preview.");
    } finally {
      setLoadingPreview(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
            SEO & AI Engine Manager
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1">
            Manage search engine index files and AI agent descriptors (AEO / GEO Engine).
          </p>
        </div>
      </div>

      {/* Dynamic Status Callout */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <Cpu className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            Dynamic indexing endpoints active
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              REAL-TIME
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Your search engine and AI crawl files are dynamically generated from the Supabase database. Google, Bing, ChatGPT, and Gemini access them in real-time.
          </p>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                  {file.name}
                </span>
                <span className="text-[10px] font-medium text-slate-400 font-mono">
                  {file.endpoint}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {file.description}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-4 pt-3 border-t border-slate-100">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Targets: {file.aiEngine}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => handlePreview(file)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Preview File
              </button>

              <button
                onClick={() => handleCopy(file.endpoint, file.id)}
                className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                title="Copy full URL"
              >
                {copiedId === file.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={file.endpoint}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-black hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Raw Preview Modal */}
      {previewTitle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-mono text-xs font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-700" /> Raw Preview: {previewTitle}
              </h3>
              <button
                onClick={() => {
                  setPreviewTitle("");
                  setPreviewContent(null);
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-1 bg-white border border-slate-200 rounded-lg"
              >
                Close ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto font-mono text-xs bg-slate-900 text-slate-100 leading-relaxed whitespace-pre-wrap flex-1">
              {loadingPreview ? "Fetching dynamic preview..." : previewContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
