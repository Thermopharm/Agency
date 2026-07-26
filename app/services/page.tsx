import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Wind, Shield, Layers, Zap, FlaskConical, Atom, CheckCircle2 } from "lucide-react";
import { getAllServices } from "@/lib/content";
import { generateSeoMetadata } from "@/lib/seo";
import FaqSection from "@/components/FaqSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSeoMetadata({
  title: "HVAC, Cleanroom & Pharmaceutical Engineering Services | Thermopharm",
  description:
    "Explore Thermopharm's full suite of engineering services: HVAC systems, cleanroom design, BIM modelling, BMS & electrical, pharmaceutical engineering, and chemical plant design.",
  slug: "services",
  keywords: ["HVAC services India", "cleanroom design services", "BIM MEP services", "pharmaceutical engineering"],
});

const iconMap: Record<string, React.ElementType> = {
  Wind, Shield, Layers, Zap, FlaskConical, Atom,
};

const servicesFaq = [
  {
    question: "Do you offer after-sales support and AMC?",
    answer: "Yes. We offer Annual Maintenance Contracts (AMC) for all systems we install. AMC packages include scheduled preventive maintenance, emergency call-out, spare parts management, and calibration of critical instruments.",
  },
  {
    question: "Can you take on only a portion of the project (e.g., just design or just commissioning)?",
    answer: "Yes. While our preferred mode is turnkey, we regularly engage as: (1) Design-only consultant, (2) Third-party commissioning agency, or (3) BIM modelling subcontractor.",
  },
  {
    question: "Do you handle projects outside of Maharashtra?",
    answer: "Yes. We have delivered projects across Gujarat, Telangana, Haryana, Rajasthan, and East Africa.",
  },
];

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-36 pb-24 border-b border-slate-200/80 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.08),rgba(255,255,255,0))]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-4 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              Our Turnkey Capabilities
            </span>
            <h1 className="font-display text-[clamp(40px,5.5vw,72px)] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Heavy-duty engineering <br />
              for <span className="text-blue-600">demanding projects.</span>
            </h1>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-normal">
              Every system we build is designed for maximum uptime, strict regulatory compliance, and lifetime energy efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="space-y-16">
            {services.map((svc, i) => {
              const Icon = iconMap[svc.icon] || Layers;
              return (
                <div
                  key={svc.id}
                  id={`service-${svc.id}`}
                  className="border-b border-slate-200/80 pb-16 last:border-0"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Image Column */}
                    <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm group bg-slate-100">
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {svc.standards.slice(0, 2).map((std) => (
                          <span key={std} className="px-3 py-1 bg-white/90 backdrop-blur-md text-blue-600 border border-blue-100 text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-sm">
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-xl shadow-sm">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-600">
                            0{i + 1} / SERVICE CATEGORY
                          </span>
                        </div>

                        <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
                          {svc.title}
                        </h2>

                        <p className="text-slate-600 text-base leading-relaxed mb-6">
                          {svc.fullDesc || svc.shortDesc}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          {svc.specs.slice(0, 4).map((spec) => (
                            <div key={spec} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Link
                          href={`/services/${svc.slug}`}
                          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.08em] hover:bg-blue-700 transition-all rounded-xl shadow-md shadow-blue-500/20"
                        >
                          Explore Technical Specifications
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={servicesFaq} title="Services — Frequently Asked Questions" />
    </div>
  );
}
