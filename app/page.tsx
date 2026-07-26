import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, Award, Sparkles, CheckCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { services, clientLogos } from "@/lib/data";
import { generateSeoMetadata } from "@/lib/seo";
import { SpotlightGrid } from "@/components/ui/SpotlightGrid";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeamCard } from "@/components/ui/BorderBeamCard";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = generateSeoMetadata({
  title: "Advanced HVAC & Cleanroom Engineering Solutions | Thermopharm",
  description:
    "Thermopharm Pvt. Ltd. — India's trusted partner for GMP-certified HVAC, cleanroom design, pharmaceutical facility engineering, BIM modelling, and BMS systems. Mumbai-based, pan-India delivery.",
  keywords: [
    "HVAC design Mumbai",
    "GMP cleanroom",
    "pharmaceutical engineering India",
    "cleanroom validation",
    "ISO 14644",
  ],
});

const testimonials = [
  {
    name: "Dr. Vikram Patel",
    role: "Operations Director",
    company: "Pharma Manufacturer",
    content: "Thermopharm's engineering team delivered our facility on time and within budget. Their HVAC systems have maintained perfect conditions through two monsoon seasons.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Quality Manager",
    company: "Biotech Facility",
    content: "The team managed the complete validation lifecycle, and we passed our WHO-GMP audit on the first attempt. Exceptional attention to regulatory detail.",
  },
];

const aboutImages = [
  { src: "/images/hero.jpg", alt: "HVAC systems installation" },
  { src: "/images/projects/project-2.png", alt: "Industrial HVAC rooftop" },
  { src: "/images/projects/project-3.png", alt: "Cleanroom facility" },
  { src: "/images/about-5.png", alt: "Engineering team at work" },
];

const equipmentCards = [
  { title: "HVAC Systems", image: "/images/projects/project-2.png", year: "Jul 2024", location: "Mumbai, India", scope: "Design & Installation" },
  { title: "Cleanroom Design", image: "/images/projects/project-3.png", year: "Mar 2024", location: "Aurangabad, India", scope: "Turnkey Execution" },
  { title: "BIM Modelling", image: "/images/projects/project-4.png", year: "Jan 2024", location: "Hyderabad, India", scope: "MEP Coordination" },
  { title: "BMS & Controls", image: "/images/bms.jpg", year: "Nov 2023", location: "Pan-India", scope: "Automation & Controls" },
  { title: "Pharmaceutical Engineering", image: "/images/projects/project-5.png", year: "Aug 2023", location: "Vadodara, India", scope: "Facility Design" },
  { title: "Chemical Plant", image: "/images/chiller.jpg", year: "Jun 2023", location: "Faridabad, India", scope: "Process Engineering" },
];

const tickerItems = [
  "WHO-GMP CERTIFIED CLEANROOMS",
  "ISO 14644 CLASS 5 TO CLASS 8",
  "DEW POINT CONTROL DOWN TO -40°C",
  "21 CFR PART 11 BMS AUDIT TRAIL",
  "ZERO AUDIT FAILURE GUARANTEE",
  "LOD 400 BIM MEP COORDINATION",
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO WITH SPOTLIGHT & GRID ───────────────────────────────────── */}
      <SpotlightGrid>
        <section className="relative min-h-screen flex items-end overflow-hidden pt-40 pb-20">
          {/* Hero background image with dark vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/projects/project-1.png"
              alt="Thermopharm engineering facility"
              fill
              priority
              className="object-cover opacity-25"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              {/* Left Headline & CTAs */}
              <div className="lg:col-span-8">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-semibold uppercase tracking-[0.15em] mb-6 rounded-full backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  WHO-GMP & ISO 14644 Compliant Engineering
                </div>

                <h1 className="font-display text-[clamp(42px,6.5vw,78px)] font-bold text-slate-900 leading-[0.98] tracking-tight mb-8">
                  Precision <br />
                  <span className="text-blue-500">Industrial HVAC</span> <br />
                  & Cleanroom Systems.
                </h1>

                <p className="text-slate-700 text-base lg:text-xl max-w-2xl leading-relaxed mb-10">
                  Engineering heavy-duty HVAC, cleanrooms, and automated facility controls for India&apos;s leading pharmaceutical, healthcare, and semiconductor manufacturers.
                </p>

                {/* Animated CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    id="hero-cta-quote"
                    href="/contact"
                    className="inline-flex items-center gap-2.5 bg-blue-600 text-slate-900 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 rounded"
                  >
                    Request Technical Proposal
                  </Link>
                  <Link
                    id="hero-cta-projects"
                    href="/projects"
                    className="inline-flex items-center gap-2.5 border border-slate-300 text-slate-900 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-white/10 hover:border-white/40 transition-all hover:-translate-y-0.5 rounded"
                  >
                    View Case Studies
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right: Number Ticker Stats */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <div className="grid grid-cols-2 gap-8 border-t lg:border-t-0 lg:border-l border-slate-200 pt-8 lg:pt-0 lg:pl-10">
                  <div>
                    <div className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 flex items-baseline">
                      <NumberTicker value={250} suffix="+" />
                    </div>
                    <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-[0.15em] mt-2">
                      Projects Delivered
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 flex items-baseline">
                      <NumberTicker value={18} suffix="+" />
                    </div>
                    <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-[0.15em] mt-2">
                      Years Excellence
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl lg:text-5xl font-display font-extrabold text-blue-500 flex items-baseline">
                      <NumberTicker value={100} suffix="%" />
                    </div>
                    <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-[0.15em] mt-2">
                      Audit Success Rate
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 flex items-baseline">
                      <NumberTicker value={50} suffix="k m²" />
                    </div>
                    <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-[0.15em] mt-2">
                      Cleanroom Space
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SpotlightGrid>

      {/* ── HIGH-CONTRAST MARQUEE TEXT BAND (IMAGE 4 FIX) ─────────────────── */}
      <section className="bg-[#050505] py-5 overflow-hidden border-y border-blue-500/20 relative shadow-2xl">
        <div className="animate-marquee flex whitespace-nowrap gap-0 items-center">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center flex-shrink-0 px-6">
              <span className="text-slate-900 font-display text-base md:text-lg font-bold uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#2563eb]" />
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT SECTION WITH SCROLL REVEAL ─────────────────────────────── */}
      <section className="py-28 bg-slate-100 text-slate-900 overflow-hidden border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  Engineering Standard
                </p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-display text-[clamp(26px,3.8vw,44px)] font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Thermopharm engineers <span className="text-blue-400">turnkey HVAC & cleanroom facilities</span> for high-load pharmaceutical, biotech, and industrial environments across India.
                </h2>
              </div>
            </div>
          </ScrollReveal>

          {/* 4 Image Grid with Hover Effects */}
          <ScrollStagger className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {aboutImages.map((img, i) => (
              <ScrollStaggerItem key={i}>
                <div className="relative aspect-[4/5] overflow-hidden group border border-slate-200 rounded">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-slate-900 text-xs font-semibold uppercase tracking-wider">{img.alt}</p>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>

          <ScrollReveal direction="up" delay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16 items-center">
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-blue-600 text-slate-900 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-blue-500 transition-colors rounded"
              >
                Discover Our History & Team
              </Link>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every Thermopharm system is engineered for maximum uptime, maintaining precise laminar air flow, particulate filtration, and temperature controls under extreme industrial operating conditions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── EQUIPMENT & CAPABILITIES WITH 3D TILT CARDS ─────────────────── */}
      <section className="py-28 bg-slate-50 text-slate-900" id="services">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up" className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-3">
                Turnkey Capabilities
              </p>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-slate-900 leading-[1.1] tracking-tight">
                High-performance industrial <br />
                equipment & systems.
              </h2>
            </div>
            <Link
              href="/services"
              id="view-all-services"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-blue-400 hover:gap-3 transition-all flex-shrink-0"
            >
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          {/* 6-Card Grid with Border Beam & Tilt */}
          <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentCards.map((card, i) => (
              <ScrollStaggerItem key={i}>
                <TiltCard>
                  <BorderBeamCard className="h-full">
                    <Link
                      href={`/services/${services[i]?.slug || "#"}`}
                      id={`equipment-card-${i}`}
                      className="group block p-6 h-full flex flex-col justify-between bg-white rounded border border-slate-200"
                    >
                      <div>
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-900 mb-6 border border-slate-200 rounded">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-[0.1em] mb-2 font-mono">
                          <span>{card.location}</span>
                          <span>{card.year}</span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-400 transition-colors">
                          {card.title}
                        </h3>

                        <p className="text-slate-500 text-xs uppercase tracking-[0.06em]">
                          Scope: {card.scope}
                        </p>
                      </div>

                      <div className="flex justify-end pt-6">
                        <div className="w-9 h-9 bg-white/5 group-hover:bg-blue-600 text-slate-900 flex items-center justify-center transition-colors rounded">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </BorderBeamCard>
                </TiltCard>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ── CLIENT LOGO MARQUEE ────────────────────────────────────────── */}
      <section className="py-20 bg-slate-100 text-slate-900 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
            Trusted by Top Pharmaceutical & Industrial Organizations
          </p>
        </div>
        <div className="relative">
          <div className="animate-marquee flex whitespace-nowrap gap-16 items-center px-6">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, i) => (
              <div key={i} className="flex-shrink-0 h-12 w-auto grayscale brightness-200 opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={45}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up" className="text-center mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-3">
              Client Feedback
            </p>
            <h2 className="font-display text-[clamp(26px,3.5vw,40px)] font-bold text-slate-900 max-w-2xl mx-auto">
              Trusted by industry directors and quality assurance managers.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <div className="bg-[#121212] border border-slate-200 p-8 h-full flex flex-col justify-between rounded">
                  <div>
                    <div className="flex gap-1 text-yellow-400 text-xs mb-4">
                      ★★★★★
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                    <div className="w-10 h-10 bg-blue-600 text-slate-900 font-bold text-sm flex items-center justify-center rounded">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{t.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT & LEAD CAPTURE SECTION ─────────────────────────────── */}
      <section className="py-28 bg-[#070707] text-slate-900" id="contact">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">
                  Enquiry & Lead Consultation
                </p>
                <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.05] tracking-tight mb-6">
                  Discuss your <br />
                  <span className="text-blue-400">engineering project.</span>
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Fill out your technical requirements below. Submissions are instantly received by our lead engineering team.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>WHO-GMP, ISO 14644 & USFDA Compliant Designs</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>24-Hour Preliminary Engineering Assessment</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Pan-India Project Execution & AMC Support</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 lg:p-10 border border-slate-200 rounded">
              <ContactForm darkMode />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
