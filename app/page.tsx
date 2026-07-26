import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Award,
  Sparkles,
  CheckCircle2,
  Factory,
  Building2,
  Package,
  BookOpen,
  Calendar,
  User,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { products, clientLogos } from "@/lib/data";
import {
  getAllServices,
  getAllProjects,
  getAllIndustries,
  getAllBlogPosts,
} from "@/lib/content";
import { generateSeoMetadata } from "@/lib/seo";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeamCard } from "@/components/ui/BorderBeamCard";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";

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

const aboutImages = [
  { src: "/images/hero.jpg", alt: "HVAC systems installation" },
  { src: "/images/projects/project-2.png", alt: "Industrial HVAC rooftop" },
  { src: "/images/projects/project-3.png", alt: "Cleanroom facility" },
  { src: "/images/about-5.png", alt: "Engineering team at work" },
];

const tickerItems = [
  "WHO-GMP CERTIFIED CLEANROOMS",
  "ISO 14644 CLASS 5 TO CLASS 8",
  "DEW POINT CONTROL DOWN TO -40°C",
  "21 CFR PART 11 BMS AUDIT TRAIL",
  "ZERO AUDIT FAILURE GUARANTEE",
  "LOD 400 BIM MEP COORDINATION",
];

export default async function HomePage() {
  const [services, projects, industries, blogPosts] = await Promise.all([
    getAllServices(),
    getAllProjects(),
    getAllIndustries(),
    getAllBlogPosts(),
  ]);

  const topIndustries = industries.slice(0, 3);
  const topProjects = projects.slice(0, 3);
  const topProducts = products.slice(0, 3);
  const topBlogs = blogPosts.slice(0, 3);

  return (
    <div className="bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-36 pb-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/60">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-extrabold uppercase tracking-[0.18em] mb-6 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                WHO-GMP & ISO 14644 Compliant Engineering
              </div>

              <h1 className="font-display text-[clamp(44px,6.8vw,82px)] font-extrabold text-slate-900 leading-[1.02] tracking-tight mb-8">
                Precision <br />
                <span className="text-blue-600">Industrial HVAC</span> <br />
                & Cleanroom Systems.
              </h1>

              <p className="text-slate-600 text-lg lg:text-xl max-w-2xl leading-relaxed mb-10 font-normal">
                Engineering heavy-duty HVAC, cleanrooms, and automated facility controls for India&apos;s leading pharmaceutical, healthcare, and semiconductor manufacturers.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  id="hero-cta-quote"
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-blue-600 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 rounded-xl"
                >
                  Request Technical Proposal
                </Link>
                <Link
                  id="hero-cta-projects"
                  href="/projects"
                  className="inline-flex items-center gap-2.5 bg-white border border-slate-200/90 text-slate-800 px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:-translate-y-0.5 rounded-xl"
                >
                  View Case Studies
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Ticker Stats */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="grid grid-cols-2 gap-8 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-8 lg:pt-0 lg:pl-10 w-full">
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 flex items-baseline">
                    <NumberTicker value={250} suffix="+" />
                  </div>
                  <div className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em] mt-2">
                    Projects Delivered
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 flex items-baseline">
                    <NumberTicker value={18} suffix="+" />
                  </div>
                  <div className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em] mt-2">
                    Years Excellence
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-4xl lg:text-5xl font-display font-extrabold text-blue-600 flex items-baseline">
                    <NumberTicker value={100} suffix="%" />
                  </div>
                  <div className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em] mt-2">
                    Audit Success Rate
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 flex items-baseline">
                    <NumberTicker value={50} suffix="k m²" />
                  </div>
                  <div className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em] mt-2">
                    Cleanroom Space
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TEXT BAND ─────────────────── */}
      <section className="bg-white py-5 overflow-hidden border-y border-slate-200/80 relative shadow-sm">
        <div className="animate-marquee flex whitespace-nowrap gap-0 items-center">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center flex-shrink-0 px-8">
              <span className="text-slate-800 font-display text-sm md:text-base font-extrabold uppercase tracking-widest flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT SECTION ─────────────────────────────── */}
      <section className="py-28 bg-slate-50 text-slate-900 overflow-hidden border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-3">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 block">
                  Engineering Standard
                </span>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-display text-[clamp(26px,3.8vw,44px)] font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Thermopharm engineers <span className="text-blue-600">turnkey HVAC & cleanroom facilities</span> for high-load pharmaceutical, biotech, and industrial environments across India.
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <ScrollStagger className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {aboutImages.map((img, i) => (
              <ScrollStaggerItem key={i}>
                <div className="relative aspect-[4/5] overflow-hidden group border border-slate-200/80 rounded-2xl shadow-sm bg-white">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-xs font-bold uppercase tracking-wider">{img.alt}</p>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>

          <ScrollReveal direction="up" delay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16 items-center">
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] hover:bg-blue-700 transition-all shadow-md rounded-xl"
              >
                Discover Our History & Team
              </Link>
            </div>
            <p className="text-slate-600 text-base leading-relaxed">
              Every Thermopharm system is engineered for maximum uptime, maintaining precise laminar air flow, particulate filtration, and temperature controls under extreme industrial operating conditions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 1. SERVICES CAPABILITIES ─────────────────── */}
      <section className="py-28 bg-white text-slate-900 border-b border-slate-200/80" id="services">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up" className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-3 block">
                Turnkey Capabilities
              </span>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-slate-900 leading-[1.1] tracking-tight">
                High-performance industrial <br />
                engineering services.
              </h2>
            </div>
            <Link
              href="/services"
              id="view-all-services"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white text-blue-600 text-xs font-bold uppercase tracking-[0.08em] rounded-xl transition-all shadow-sm flex-shrink-0"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((svc, i) => (
              <ScrollStaggerItem key={svc.id}>
                <TiltCard>
                  <BorderBeamCard className="h-full">
                    <Link
                      href={`/services/${svc.slug}`}
                      id={`service-card-${i}`}
                      className="group block p-6 h-full flex flex-col justify-between bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div>
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 mb-6 border border-slate-200/80 rounded-xl">
                          <Image
                            src={svc.image}
                            alt={svc.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>

                        <span className="text-[11px] text-blue-600 font-mono font-bold uppercase tracking-widest block mb-2">
                          0{i + 1} / SERVICE
                        </span>

                        <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {svc.title}
                        </h3>

                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                          {svc.shortDesc}
                        </p>
                      </div>

                      <div className="flex justify-end pt-6">
                        <div className="w-10 h-10 bg-white border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white text-slate-700 flex items-center justify-center transition-all rounded-xl shadow-sm">
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

      {/* ── 2. INDUSTRIES SERVED (NEW PREVIEW) ─────────────────── */}
      <section className="py-28 bg-slate-50 text-slate-900 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up" className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Factory className="w-3.5 h-3.5 text-blue-600" /> Sectors We Engineering
              </span>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-slate-900 leading-[1.1] tracking-tight">
                Specialized compliance <br />
                for critical industries.
              </h2>
            </div>
            <Link
              href="/industries"
              id="view-all-industries"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-[0.08em] rounded-xl transition-all shadow-md flex-shrink-0"
            >
              <span>View All 5 Industry Sectors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topIndustries.map((ind) => (
              <ScrollStaggerItem key={ind.id}>
                <BorderBeamCard className="h-full">
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-8 h-full flex flex-col justify-between hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div>
                      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 bg-slate-100 border border-slate-200/80">
                        <Image
                          src={ind.image || "/images/projects/project-1.png"}
                          alt={ind.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 block mb-2">
                        {ind.slug.replace("-", " ")}
                      </span>

                      <h3 className="text-2xl font-bold font-display text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {ind.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                        {ind.shortDesc}
                      </p>

                      {ind.specs.length > 0 && (
                        <div className="space-y-2 pt-4 border-t border-slate-100">
                          {ind.specs.slice(0, 3).map((spec, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6">
                      <Link
                        href={`/industries/${ind.slug}`}
                        className="inline-flex items-center justify-between w-full py-3.5 px-5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all"
                      >
                        <span>Explore Sector Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </BorderBeamCard>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ── 3. FEATURED PROJECTS (NEW PREVIEW) ─────────────────── */}
      <section className="py-28 bg-white text-slate-900 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up" className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Building2 className="w-3.5 h-3.5 text-blue-600" /> Landmark Infrastructure
              </span>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-slate-900 leading-[1.1] tracking-tight">
                Featured engineering <br />
                case studies.
              </h2>
            </div>
            <Link
              href="/projects"
              id="view-all-projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-[0.08em] rounded-xl transition-all shadow-md flex-shrink-0"
            >
              <span>View All 14 Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topProjects.map((p) => (
              <ScrollStaggerItem key={p.id}>
                <BorderBeamCard className="h-full">
                  <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={p.image || "/images/projects/project-1.png"}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 border border-slate-200">
                          {p.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono font-bold uppercase tracking-wider mb-2">
                          <span>{p.client}</span>
                          <span>{p.location}</span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                          {p.title}
                        </h3>

                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4 font-normal">
                          {p.description}
                        </p>

                        {p.results && p.results.length > 0 && (
                          <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                              Key Result:
                            </span>
                            <p className="text-xs text-slate-700 font-medium truncate">
                              ✓ {p.results[0]}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                      >
                        <span>View Project Audit Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </BorderBeamCard>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ── 4. PRODUCTS CATALOG (NEW PREVIEW) ─────────────────── */}
      <section className="py-28 bg-slate-50 text-slate-900 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up" className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Package className="w-3.5 h-3.5 text-blue-600" /> Modular Components & Hardware
              </span>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-slate-900 leading-[1.1] tracking-tight">
                Precision cleanroom & <br />
                HVAC products.
              </h2>
            </div>
            <Link
              href="/products"
              id="view-all-products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-[0.08em] rounded-xl transition-all shadow-md flex-shrink-0"
            >
              <span>Explore Full Product Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topProducts.map((prod) => (
              <ScrollStaggerItem key={prod.id}>
                <BorderBeamCard className="h-full">
                  <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={prod.image}
                          alt={prod.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 border border-slate-200">
                          {prod.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                          {prod.manufacturer} Engineering
                        </span>

                        <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                          {prod.title}
                        </h3>

                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4 font-normal">
                          {prod.description}
                        </p>

                        {prod.specs && prod.specs.length > 0 && (
                          <div className="space-y-1.5 pt-3 border-t border-slate-100">
                            {prod.specs.slice(0, 2).map((spec, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                                <span className="truncate">{spec}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        href="/products"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                      >
                        <span>Request Datasheet</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </BorderBeamCard>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ── CLIENT LOGO MARQUEE ────────────────────────────────────────── */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10 text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 block">
            Trusted by Top Pharmaceutical & Industrial Organizations
          </span>
        </div>
        <div className="relative">
          <div className="animate-marquee flex whitespace-nowrap gap-16 items-center px-6">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, i) => (
              <div key={i} className="flex-shrink-0 h-12 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
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

      {/* ── 5. TECHNICAL JOURNAL / BLOG (NEW PREVIEW) ─────────────────── */}
      <section className="py-28 bg-slate-50 text-slate-900 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up" className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Technical Insights & Standards
              </span>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-slate-900 leading-[1.1] tracking-tight">
                Latest articles from our <br />
                lead engineers.
              </h2>
            </div>
            <Link
              href="/blog"
              id="view-all-blog"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-[0.08em] rounded-xl transition-all shadow-md flex-shrink-0"
            >
              <span>Explore Technical Journal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topBlogs.map((b) => (
              <ScrollStaggerItem key={b.id}>
                <BorderBeamCard className="h-full">
                  <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={b.image || "/images/projects/project-3.png"}
                          alt={b.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 border border-slate-200">
                          {b.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono mb-3">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-blue-600" /> {b.author}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-blue-600" /> {b.date}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                          {b.title}
                        </h3>

                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-normal">
                          {b.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        href={`/blog/${b.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                      >
                        <span>Read Technical Article</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </BorderBeamCard>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white text-slate-900 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up" className="text-center mb-16">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-3 block">
              Client Feedback
            </span>
            <h2 className="font-display text-[clamp(26px,3.5vw,40px)] font-bold text-slate-900 max-w-2xl mx-auto">
              Trusted by industry directors and quality assurance managers.
            </h2>
          </ScrollReveal>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── CONTACT & LEAD CAPTURE SECTION ─────────────────────────────── */}
      <section className="py-28 bg-slate-50 text-slate-900 border-t border-slate-200/80" id="contact">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-4 block">
                  Enquiry & Lead Consultation
                </span>
                <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.05] tracking-tight mb-6 text-slate-900">
                  Discuss your <br />
                  <span className="text-blue-600">engineering project.</span>
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Fill out your technical requirements below. Submissions are instantly received by our lead engineering team.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-200/80">
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>WHO-GMP, ISO 14644 & USFDA Compliant Designs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>24-Hour Preliminary Engineering Assessment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <Award className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Pan-India Project Execution & AMC Support</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 lg:p-10 border border-slate-200/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
