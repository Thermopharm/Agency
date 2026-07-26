"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Globe,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Code2,
  Search,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  Bot
} from "lucide-react";

export default function AnalyticsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Analytics State
  const [gaId, setGaId] = useState("");
  const [gtmId, setGtmId] = useState("");
  const [searchConsoleVerification, setSearchConsoleVerification] = useState("");
  const [clarityId, setClarityId] = useState("");
  const [customHeadScripts, setCustomHeadScripts] = useState("");
  const [customBodyScripts, setCustomBodyScripts] = useState("");
  const [seoDefaultTitle, setSeoDefaultTitle] = useState("");
  const [seoDefaultDesc, setSeoDefaultDesc] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/analytics");
        if (res.ok) {
          const data = await res.json();
          setGaId(data.gaId || "");
          setGtmId(data.gtmId || "");
          setSearchConsoleVerification(data.searchConsoleVerification || "");
          setClarityId(data.clarityId || "");
          setCustomHeadScripts(data.customHeadScripts || "");
          setCustomBodyScripts(data.customBodyScripts || "");
          setSeoDefaultTitle(data.seoDefaultTitle || "Thermopharm — Industrial Cleanroom & HVAC Engineering");
          setSeoDefaultDesc(data.seoDefaultDesc || "Turnkey GMP-certified cleanroom & industrial HVAC engineering solutions across India.");
        }
      } catch (err) {
        console.error("Failed to fetch analytics settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gaId,
          gtmId,
          searchConsoleVerification,
          clarityId,
          customHeadScripts,
          customBodyScripts,
          seoDefaultTitle,
          seoDefaultDesc,
        }),
      });

      if (!res.ok) throw new Error("Failed to update analytics settings");
      setMessage({ type: "success", text: "Analytics & Tracking settings updated successfully! Live tracking is active." });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save settings." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500 font-semibold">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span>Loading Analytics Settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-extrabold uppercase tracking-widest rounded-full mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Post-Deployment SEO, GEO & Analytics Manager
          </div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Analytics & Tracking Tools
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
            Configure Google Analytics, GTM, Search Console, AEO/GEO structured data, and custom head/body tracking scripts.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 bg-black hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Analytics Configuration</span>
        </button>
      </div>

      {/* Alert Message */}
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Feature Badges Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Google Analytics 4</div>
            <div className="text-[11px] font-semibold text-slate-400">
              {gaId ? "Connected (" + gaId + ")" : "Not Configured"}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Tag Manager (GTM)</div>
            <div className="text-[11px] font-semibold text-slate-400">
              {gtmId ? "Active (" + gtmId + ")" : "Not Configured"}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Search Console</div>
            <div className="text-[11px] font-semibold text-slate-400">
              {searchConsoleVerification ? "Verified" : "Pending Tag"}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">AEO & GEO Optimization</div>
            <div className="text-[11px] font-semibold text-slate-400">Custom Head Injector Ready</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Major Tracking Providers */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Primary Analytics & Tag Providers
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Add your measurement IDs. Scripts will automatically load asynchronously across all website pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GA4 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Google Analytics 4 Measurement ID (GA4)
              </label>
              <input
                type="text"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                placeholder="e.g. G-ABC1234567"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Find this in your Google Analytics Admin &gt; Data Streams &gt; Measurement ID.
              </p>
            </div>

            {/* GTM */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Google Tag Manager ID (GTM)
              </label>
              <input
                type="text"
                value={gtmId}
                onChange={(e) => setGtmId(e.target.value)}
                placeholder="e.g. GTM-XXXXXXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Injects Google Tag Manager container script at top of head.
              </p>
            </div>

            {/* Google Search Console */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Google Search Console Verification
              </label>
              <input
                type="text"
                value={searchConsoleVerification}
                onChange={(e) => setSearchConsoleVerification(e.target.value)}
                placeholder='e.g. google-site-verification=XYZ... or HTML meta tag string'
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Meta tag token or full meta element for instant domain ownership verification.
              </p>
            </div>

            {/* Microsoft Clarity / Hotjar */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Microsoft Clarity / Heatmap ID
              </label>
              <input
                type="text"
                value={clarityId}
                onChange={(e) => setClarityId(e.target.value)}
                placeholder="e.g. abc123xyz"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Enables session recording and user click heatmaps.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Global SEO Defaults */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Global Fallback SEO Settings
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Fallback title and description used for search engines and social cards when page-specific SEO is not defined.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Global Default Title
              </label>
              <input
                type="text"
                value={seoDefaultTitle}
                onChange={(e) => setSeoDefaultTitle(e.target.value)}
                placeholder="Thermopharm — Industrial Cleanroom & HVAC Engineering"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Global Default Meta Description
              </label>
              <textarea
                rows={3}
                value={seoDefaultDesc}
                onChange={(e) => setSeoDefaultDesc(e.target.value)}
                placeholder="Turnkey GMP-certified cleanroom & industrial HVAC engineering solutions across India."
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-sans"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Advanced Code Injection (AEO, GEO, Custom Head & Body Scripts) */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Advanced Script Injector (SEO, AEO, GEO & Pixel Code)
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Inject custom HTML, JavaScript, Facebook Pixel, LinkedIn Insight, or AEO/GEO Schema.org JSON-LD scripts directly into the website.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Custom Head Scripts (&lt;head&gt; Injection)
                </label>
                <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                  Head Tag
                </span>
              </div>
              <textarea
                rows={6}
                value={customHeadScripts}
                onChange={(e) => setCustomHeadScripts(e.target.value)}
                placeholder={`<!-- Example: Custom AEO JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Thermopharm Pvt Ltd",
  "url": "https://thermopharm.in"
}
</script>`}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono bg-slate-900 text-slate-100 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Placed inside the &lt;head&gt; element. Perfect for JSON-LD schemas, Meta Pixels, and custom verification code.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Custom Body Scripts (&lt;body&gt; End Injection)
                </label>
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Body Tag
                </span>
              </div>
              <textarea
                rows={6}
                value={customBodyScripts}
                onChange={(e) => setCustomBodyScripts(e.target.value)}
                placeholder={`<!-- Example: Chat Widget or GTM Noscript -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>`}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono bg-slate-900 text-slate-100 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Placed right before the closing &lt;/body&gt; tag. Ideal for live chat widgets, tracking pixels, and noscript fallbacks.
              </p>
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Analytics Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
