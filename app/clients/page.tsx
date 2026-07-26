import Image from "next/image";
import Link from "next/link";
import { Building2, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { BorderBeamCard } from "@/components/ui/BorderBeamCard";

export const metadata = {
  title: "Our Clients & Partners | Thermopharm Pvt. Ltd.",
  description:
    "Trusted by leading pharmaceutical manufacturers, healthcare institutes, and industrial brands across India and global markets.",
};

const clientLogosList = [
  { name: "Hershey India", logo: "/images/clients/hershey-logo.png", industry: "Food & Dairy Processing" },
  { name: "Livguard Energy", logo: "/images/clients/livguard.png", industry: "Clean Energy & Storage" },
  { name: "Ammro Dairy", logo: "/images/clients/ammro-dairy.png", industry: "Dairy & Beverage" },
  { name: "AMIS Laboratories", logo: "/images/clients/amis.png", industry: "Pharmaceuticals" },
  { name: "KCPL Pharma", logo: "/images/clients/kcpl.png", industry: "Chemical & Active Ingredients" },
  { name: "Shah Brothers", logo: "/images/clients/shah-brothers.png", industry: "Industrial Engineering" },
  { name: "Suprima Lifesciences", logo: "/images/clients/suprima.png", industry: "Healthcare & Biotech" },
  { name: "VIP Pharma", logo: "/images/clients/vip-pharma.png", industry: "Formulations & Sterile Fill" },
];

const prestigiousClients = [
  { name: "AIIMS", title: "All India Institute of Medical Sciences", tag: "Healthcare & Research", location: "Ernakulam, Kerala" },
  { name: "NIPER", title: "National Institute of Pharmaceutical Education", tag: "Biomedical R&D", location: "Hyderabad & Kolkata" },
  { name: "Globela Pharma", title: "WHO-GMP Export Formulation Unit", tag: "Pharmaceuticals", location: "Surat, Gujarat" },
  { name: "IOL Chemicals", title: "Active Pharmaceutical Ingredients", tag: "API Manufacturing", location: "Ambala, Punjab" },
  { name: "Hanuchem Labs", title: "Sterile Injectables & Formulations", tag: "Pharma Cleanrooms", location: "Parwanoo, Himachal" },
  { name: "Suprima Cosmo Tech", title: "Precision Cleanroom Facilities", tag: "Industrial Cleanroom", location: "Ambernath, Mumbai" },
];

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Hero Header */}
      <section className="relative pt-36 pb-24 border-b border-slate-200/80 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.08),rgba(255,255,255,0))]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-4 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              <Building2 className="w-4 h-4 text-blue-600" /> Trusted Industrial Leadership
            </span>
            <h1 className="font-display text-[clamp(40px,5.5vw,72px)] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Engineering Partners <br />
              <span className="text-blue-600">Who Trust Us.</span>
            </h1>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed">
              From Fortune 500 multinationals to premier national research institutes, we power critical cleanroom and HVAC infrastructure across India.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Logo Grid */}
      <section className="py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold font-display text-slate-900">Client Portfolio</h2>
            <p className="text-sm text-slate-600 font-medium">
              Leading brands relying on Thermopharm for zero-audit-failure engineering execution.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {clientLogosList.map((client, i) => (
              <BorderBeamCard key={i}>
                <div className="bg-slate-50/70 hover:bg-white border border-slate-200/80 rounded-2xl p-8 h-48 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="relative w-36 h-20 mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-0.5">
                    {client.industry}
                  </span>
                </div>
              </BorderBeamCard>
            ))}
          </div>
        </div>
      </section>

      {/* Prestigious Institutes List */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold font-display text-slate-900 mb-2">Research & Institutional Clients</h2>
            <p className="text-sm text-slate-600 font-medium">Key national projects executed with stringent regulatory standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prestigiousClients.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-slate-300 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {item.tag}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono font-semibold">{item.location}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern High-Impact Call to Action Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-10 md:p-16 text-white shadow-xl">
            {/* Background Glowing Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-blue-100">
                <Sparkles className="w-4 h-4 text-amber-300" /> Engineering Partnership
              </span>

              <h2 className="text-3xl md:text-5xl font-extrabold font-display leading-tight tracking-tight">
                Ready to Elevate Your Facility Cleanroom Standards?
              </h2>

              <p className="text-blue-100 text-base md:text-lg leading-relaxed max-w-2xl font-normal">
                Get in touch with our lead HVAC and cleanroom engineers for technical consultations, DQ/IQ/OQ validation plans, and turnkey site surveys.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 hover:bg-slate-100 text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4 text-blue-700" />
                </Link>
                <a
                  href="tel:+916396633736"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-blue-800/40 hover:bg-blue-800/60 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl backdrop-blur-md transition-all"
                >
                  <span>Call +91 63 9663 3736</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
