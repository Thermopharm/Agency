"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, companyInfo } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide Navbar completely on Admin Panel routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-slate-50/95 backdrop-blur-md border-b border-slate-200"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Thermopharm"
                width={150}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav — centered */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href} className="relative group">
                  {link.children ? (
                    <>
                      <button
                        className={cn(
                          "flex items-center gap-1 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors",
                          pathname?.startsWith(link.href)
                            ? "text-blue-500"
                            : "text-slate-700 hover:text-slate-900"
                        )}
                      >
                        {link.label}
                        <ChevronDown className="w-3 h-3 ml-0.5" />
                      </button>
                      {/* Dropdown */}
                      <div className="absolute top-full left-0 w-64 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                        <div className="bg-white border border-slate-200 p-1.5 shadow-2xl rounded">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-white/5 transition-colors rounded"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors",
                        pathname === link.href
                          ? "text-blue-500"
                          : "text-slate-700 hover:text-slate-900"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-slate-900 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-blue-500 transition-colors rounded"
              >
                Enquire Now
              </Link>
            </div>

            {/* Hamburger */}
            <button
              id="hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-900"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-full max-w-sm bg-slate-50 border-l border-slate-200 transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-8 pt-20">
            <nav className="space-y-0">
              {navLinks.map((link) => (
                <div key={link.href} className="border-b border-slate-200">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-3.5 text-base font-semibold uppercase tracking-[0.06em] transition-colors",
                      pathname === link.href
                        ? "text-blue-500"
                        : "text-slate-700 hover:text-slate-900"
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pb-3 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-1.5 pl-4 text-xs text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-8">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-slate-900 py-3.5 text-xs font-bold uppercase tracking-[0.08em] hover:bg-blue-500 transition-colors rounded"
              >
                Enquire Now
              </Link>
              <a
                href={`tel:${companyInfo.phone}`}
                className="block text-center mt-4 text-slate-500 text-xs hover:text-slate-900 transition-colors"
              >
                {companyInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
