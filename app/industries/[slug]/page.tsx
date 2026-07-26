import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Shield, ArrowLeft, AlertCircle, Sparkles, HelpCircle, Check } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { getIndustryBySlug } from "@/lib/content";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const industry = await getIndustryBySlug(params.slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle || `${industry.title} HVAC & Cleanroom Solutions | Thermopharm`,
    description: industry.metaDesc || industry.shortDesc,
    keywords: industry.focusKeyword ? [industry.focusKeyword] : [industry.title, "HVAC", "cleanroom", "cGMP"],
    alternates: industry.canonicalUrl ? { canonical: industry.canonicalUrl } : undefined,
    openGraph: {
      title: industry.metaTitle || industry.title,
      description: industry.metaDesc || industry.shortDesc,
      images: [industry.image || "/images/projects/project-1.png"],
    },
  };
}

export default async function DynamicIndustryPage({
  params,
}: {
  params: { slug: string };
}) {
  const industry = await getIndustryBySlug(params.slug);

  if (!industry) {
    notFound();
  }

  const specs: string[] = industry.specs || [];
  const standards: string[] = industry.standards || [];
  const challenges: string[] = industry.challenges || [];
  const solutions: string[] = industry.solutions || [];
  const faq = industry.faq || [];

  // Generate FAQ LD+JSON Schema for GEO/AEO
  const faqSchema =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 border-b border-slate-200/80 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Target Industries
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
              ENGINEERING SECTOR
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-slate-900 mb-6 leading-tight">
            {industry.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
            {industry.shortDesc}
          </p>

          {/* Standards Tags */}
          {standards.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-200/80">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mr-2">
                COMPLIANCE STANDARDS:
              </span>
              {standards.map((st, i) => (
                <span
                  key={i}
                  className="bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-2xs"
                >
                  {st}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Body (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Feature Image */}
            <div className="relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={industry.image || "/images/projects/project-1.png"}
                alt={industry.imageAlt || industry.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overview */}
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">
                Sector Overview & Regulatory Compliance
              </h2>
              <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                {industry.fullDesc}
              </p>
            </div>

            {/* Challenges vs Solutions Block */}
            {(challenges.length > 0 || solutions.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Challenges */}
                {challenges.length > 0 && (
                  <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-6 space-y-4">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Sector Engineering Challenges
                    </h3>
                    <ul className="space-y-2.5">
                      {challenges.map((ch, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-amber-950 font-semibold leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Solutions */}
                {solutions.length > 0 && (
                  <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-6 space-y-4">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Thermopharm Turnkey Solutions
                    </h3>
                    <ul className="space-y-2.5">
                      {solutions.map((sol, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-emerald-950 font-semibold leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Capabilities Grid */}
            {specs.length > 0 && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 space-y-4 shadow-2xs">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Shield className="w-5 h-5 text-blue-600" /> Technical Capabilities & Equipment Specs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specs.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold bg-white p-3 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Industry FAQ Section (AEO/GEO) */}
            {faq.length > 0 && (
              <div className="space-y-4 border-t border-slate-200 pt-10">
                <h3 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" /> Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {faq.map((item, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-2">
                      <h4 className="text-sm font-bold text-slate-900">{item.question}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Form (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl sticky top-28">
              <h3 className="text-xl font-bold font-display">Request Engineering Consultation</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Connect directly with Thermopharm HVAC cleanroom engineers to design solutions for your facility.
              </p>
              <ContactForm darkMode={true} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
