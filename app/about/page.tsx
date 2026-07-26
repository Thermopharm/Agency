import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Award, Target, Compass } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import { companyInfo, team } from "@/lib/data";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "About Thermopharm — Heavy-Duty Engineering & Cleanroom Experts",
  description:
    "Learn about Thermopharm Pvt. Ltd. — our story, mission, values, and the expert team behind India's premier HVAC and cleanroom engineering solutions.",
  slug: "about",
  keywords: ["about Thermopharm", "HVAC engineering company Mumbai", "GMP certified engineers"],
});

const timeline = [
  { year: "2018", title: "Foundation", desc: "Thermopharm was incorporated in Mumbai, specializing in specialized pharmaceutical HVAC design." },
  { year: "2020", title: "Cleanroom Expansion", desc: "Expanded turnkey capabilities into modular cleanroom construction and BSL-3 laboratory design." },
  { year: "2022", title: "BIM & Automation", desc: "Integrated LOD 400 BIM workflow and IoT-based BMS controls into every major industrial project." },
  { year: "2024+", title: "Pan-India Leader", desc: "Delivered 250+ projects with zero FDA/GMP audit failures, expanding footprint across South Asia & Africa." },
];

const aboutFaq = [
  {
    question: "When was Thermopharm founded?",
    answer: "Thermopharm Pvt. Ltd. was incorporated in 2018 and has since grown into a trusted engineering partner for pharmaceutical, healthcare, and industrial clients across India.",
  },
  {
    question: "Which professional bodies is Thermopharm a member of?",
    answer: "Our engineers are active members of ISHRAE (Indian Society of Heating, Refrigerating and Air Conditioning Engineers) and ASHRAE.",
  },
  {
    question: "Does Thermopharm work outside of India?",
    answer: "Yes. We have executed overseas projects in East Africa and provide remote engineering consultancy services to clients in the Middle East.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-slate-900 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">
              About Thermopharm
            </p>
            <h1 className="font-display text-[clamp(38px,5.5vw,68px)] font-bold leading-[1.05] tracking-tight mb-6">
              Engineering excellence <br />
              for <span className="text-blue-500">critical environments.</span>
            </h1>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
              We are a specialized engineering firm dedicated to designing and building heavy-duty HVAC,
              cleanroom, and pharmaceutical systems that perform flawlessly under extreme industrial demands.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Stats Section */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-3">
                Our Foundation
              </p>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold text-slate-900 leading-[1.15] mb-6">
                Built on deep technical knowledge & regulatory mastery.
              </h2>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Founded in 2018, Thermopharm emerged with a single vision: to bridge the gap between heavy industrial engineering and strict pharmaceutical compliance standards.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                From sterile fill-finish cleanrooms to high-capacity industrial chillers, our solutions are built to withstand rigorous continuous operation without compromise.
              </p>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-slate-900 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-blue-500 transition-colors rounded"
              >
                Work With Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="relative aspect-[4/3] overflow-hidden rounded border border-slate-200 bg-black">
                  <Image
                    src="/images/about-1.jpeg"
                    alt="Facility engineering"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded border border-slate-200 bg-black">
                  <Image
                    src="/images/about-2.jpeg"
                    alt="Cleanroom installation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-8 bg-[#121212] border border-slate-200 rounded">
                {companyInfo.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-3xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-[0.1em] mt-1 font-mono">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Banner */}
      <section className="py-24 bg-[#070707] text-slate-900 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-[#121212] border border-slate-200 rounded">
              <Target className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="font-display text-2xl font-bold mb-4 text-slate-900">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                To be South Asia&apos;s most reliable engineering authority for critical facility infrastructure — recognized for zero audit failures, sustainable energy optimization, and unmatched technical execution.
              </p>
            </div>

            <div className="p-10 bg-[#121212] border border-slate-200 rounded">
              <Compass className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="font-display text-2xl font-bold mb-4 text-slate-900">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                To engineer turnkey HVAC, cleanroom, and control solutions that exceed WHO-GMP, FDA, and ISO standards, ensuring our partners achieve uninterrupted production and absolute peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-3">
              Growth Journey
            </p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold text-slate-900">
              Milestones along the way.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, i) => (
              <div key={i} className="p-8 bg-[#121212] border border-slate-200 rounded relative">
                <span className="font-display text-4xl font-extrabold text-blue-400 block mb-4">
                  {item.year}
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-3">
                Expertise
              </p>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold text-slate-900">
                Engineering Leadership
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-[#121212] border border-slate-200 rounded overflow-hidden group">
                <div className="relative aspect-[4/4] overflow-hidden bg-black">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.08em] mt-1 mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection faqs={aboutFaq} title="Frequently Asked Questions" />
    </div>
  );
}
