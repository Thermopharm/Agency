"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { companyInfo, navLinks, services } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer on Admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo & Brand description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Thermopharm"
                width={160}
                height={42}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Thermopharm Pvt. Ltd. delivers WHO-GMP, USFDA, and ISO 14644 compliant HVAC and cleanroom engineering solutions for pharmaceutical, healthcare, and high-tech manufacturing across India.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={companyInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-linkedin"
                className="w-8 h-8 rounded bg-white/5 hover:bg-blue-600 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href={companyInfo.socialLinks.email}
                id="footer-email"
                className="w-8 h-8 rounded bg-white/5 hover:bg-blue-600 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                aria-label="Email"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-400 mb-4 text-[11px] uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 text-xs transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-600 hover:text-slate-900 text-xs transition-colors">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-slate-600 hover:text-slate-900 text-xs transition-colors">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-600 hover:text-slate-900 text-xs transition-colors">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/clients" className="text-slate-600 hover:text-slate-900 text-xs transition-colors">
                  Clients & Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 text-xs transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-slate-400 mb-4 text-[11px] uppercase tracking-widest">
              Core Solutions
            </h3>
            <ul className="space-y-2.5">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-slate-600 hover:text-slate-900 text-xs transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-slate-400 mb-4 text-[11px] uppercase tracking-widest">
              Head Office
            </h3>
            <div className="text-slate-600 text-xs leading-relaxed space-y-2.5">
              <p>{companyInfo.address}</p>
              <p>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-slate-900 transition-colors block font-mono">
                  {companyInfo.email}
                </a>
              </p>
              <p>
                <a href={`tel:${companyInfo.phone}`} className="hover:text-slate-900 transition-colors block font-mono">
                  {companyInfo.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 py-6 bg-[#040404]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-[11px]">
            © {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-slate-400 hover:text-slate-600 text-[11px] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-slate-600 text-[11px] transition-colors">
              Technical Consultation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
