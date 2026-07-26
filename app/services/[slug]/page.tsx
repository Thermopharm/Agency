import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getServiceBySlug, getAllServices } from "@/lib/content";
import { generateSeoMetadata } from "@/lib/seo";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const svc = await getServiceBySlug(params.slug);
  if (!svc) return {};
  return generateSeoMetadata({
    title: `${svc.title} | Thermopharm Engineering`,
    description: svc.shortDesc,
    slug: `services/${svc.slug}`,
    ogImage: svc.image,
    keywords: [svc.title, ...(svc.standards || [])],
  });
}

const serviceFaq = (title: string) => [
  {
    question: `What is the typical project timeline for ${title}?`,
    answer:
      "Project timelines vary by scope. For design-only engagements, we typically deliver in 6–10 weeks. For turnkey projects, 6–18 months depending on size and complexity. We provide a detailed Gantt chart at proposal stage.",
  },
  {
    question: `Does the ${title} solution include regulatory documentation?`,
    answer:
      "Yes. All our solutions include a complete documentation package: Design Qualification (DQ) report, Installation Qualification (IQ) protocol, Operational Qualification (OQ) protocol, and Performance Qualification (PQ) report.",
  },
  {
    question: "Do you provide AMC after project handover?",
    answer:
      "Yes. We offer Annual Maintenance Contracts (AMC) with scheduled preventive maintenance, emergency response within 24 hours, and calibration of critical instruments.",
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const svc = await getServiceBySlug(params.slug);
  if (!svc) notFound();

  const allServices = await getAllServices();
  const relatedServices = allServices.filter((s) => s.slug !== svc.slug).slice(0, 4);

  return (
    <>
      {/* Dark Hero */}
      <section className="relative pt-32 pb-24 bg-slate-50 text-slate-900 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs uppercase tracking-[0.1em] mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Capabilities
          </Link>
          <div className="flex flex-wrap gap-2 mb-6">
            {svc.standards.map((std) => (
              <span key={std} className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-medium uppercase tracking-[0.08em]">
                {std}
              </span>
            ))}
          </div>
          <h1 className="font-display text-[clamp(36px,5.5vw,68px)] font-bold leading-[1.05] tracking-tight mb-8">
            {svc.title}
          </h1>
          <p className="text-slate-500 text-lg lg:text-xl max-w-3xl leading-relaxed">
            {svc.shortDesc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 mb-12 border border-gray-200">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <h2 className="font-display text-2xl font-bold text-[#0a0a0a] mb-6">
                Overview & Methodology
              </h2>
              <p className="text-gray-600 leading-relaxed text-base mb-12 whitespace-pre-wrap">
                {svc.fullDesc}
              </p>

              <h2 className="font-display text-2xl font-bold text-[#0a0a0a] mb-6">
                Technical Capabilities & Scope
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {svc.specs.map((spec) => (
                  <div key={spec} className="flex items-start gap-3 p-5 bg-[#fafafa] border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm font-medium">{spec}</span>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-2xl font-bold text-[#0a0a0a] mb-6">
                Compliance Standards
              </h2>
              <div className="flex flex-wrap gap-2">
                {svc.standards.map((std) => (
                  <span key={std} className="px-4 py-2 border border-gray-200 text-gray-800 text-xs font-semibold uppercase tracking-[0.06em]">
                    {std}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Form Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div className="bg-slate-50 p-8 border border-slate-200 text-slate-900">
                  <h3 className="font-display text-xl font-bold mb-2">
                    Request Consultation
                  </h3>
                  <p className="text-slate-500 text-xs uppercase tracking-[0.08em] mb-6">
                    Connect with our lead HVAC engineers
                  </p>
                  <ContactForm darkMode />
                </div>

                <div className="border border-gray-200 p-6 bg-[#fafafa]">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-4">
                    Other Capabilities
                  </p>
                  <div className="space-y-2">
                    {relatedServices.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        className="block text-xs font-semibold uppercase tracking-[0.06em] text-gray-700 hover:text-blue-600 transition-colors py-1.5 border-b border-gray-200/60 last:border-0"
                      >
                        → {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={serviceFaq(svc.title)} title={`${svc.title} — FAQs`} />
    </>
  );
}
