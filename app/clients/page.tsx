import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Building2, Award, ShieldCheck, ArrowRight } from "lucide-react";
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
  { name: "AIIMS", title: "All India Institute of Medical Sciences", tag: "Healthcare & Research" },
  { name: "NIPER", title: "National Institute of Pharmaceutical Education", tag: "Biomedical R&D" },
  { name: "Globela Pharma", title: "WHO-GMP Export Formulation Unit", tag: "Pharmaceuticals" },
  { name: "IOL Chemicals", title: "Active Pharmaceutical Ingredients", tag: "API Manufacturing" },
  { name: "Hanuchem Labs", title: "Sterile Injectables & Formulations", tag: "Pharma Cleanrooms" },
  { name: "Supra Cosmo Tech", title: "Precision Cleanroom Facilities", tag: "Industrial Cleanroom" },
];

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-slate-900">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" />
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-4">
            <Building2 className="w-4 h-4" /> Trusted Industrial Leadership
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-slate-900 mb-6">
            Engineering Partners <span className="text-blue-500 font-normal">Who Trust Us.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            From Fortune 500 multinationals to premier national research institutes, we power critical cleanroom and HVAC infrastructure across India.
          </p>
        </div>
      </section>

      {/* Featured Logo Grid */}
      <section className="py-24 border-b border-slate-200">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900">Client Portfolio</h2>
            <p className="text-sm text-slate-500">
              Leading brands relying on Thermopharm for zero-audit-failure engineering execution.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {clientLogosList.map((client, i) => (
              <BorderBeamCard key={i}>
                <div className="bg-white border border-slate-200 rounded-lg p-8 h-48 flex flex-col items-center justify-center text-center hover:border-blue-500/50 transition-all group">
                  <div className="relative w-36 h-20 mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-400 transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    {client.industry}
                  </span>
                </div>
              </BorderBeamCard>
            ))}
          </div>
        </div>
      </section>

      {/* Prestigious Institutes List */}
      <section className="py-20 bg-slate-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-2">Research & Institutional Clients</h2>
            <p className="text-sm text-slate-500">Key national projects executed with stringent regulatory standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prestigiousClients.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition group"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 block mb-2">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-950/20 border-t border-blue-500/20">
        <div className="container max-w-7xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold font-display text-slate-900">Ready to Elevate Your Facility Cleanroom Standards?</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Get in touch with our lead HVAC and cleanroom engineers for technical consultations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-slate-900 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
