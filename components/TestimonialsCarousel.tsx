"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating?: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Dr. Vikram Patel",
    role: "Operations Director",
    company: "Pharma Manufacturer",
    content: "Thermopharm's engineering team delivered our facility on time and within budget. Their HVAC systems have maintained perfect conditions through two monsoon seasons.",
    rating: 5,
  },
  {
    name: "Sneha Kulkarni",
    role: "Quality Manager",
    company: "Biotech Facility",
    content: "The team managed the complete validation lifecycle, and we passed our WHO-GMP audit on the first attempt. Exceptional attention to regulatory detail.",
    rating: 5,
  },
  {
    name: "Rajesh Sharma",
    role: "Facility Head",
    company: "IOL Chemicals",
    content: "Outstanding cleanroom HVAC design and BMS implementation. The air turnover rates and differential pressure controls are rock solid.",
    rating: 5,
  },
  {
    name: "Amitabh Sen",
    role: "VP Engineering",
    company: "AIMS Ernakulam",
    content: "Precision thermal management and HEPA filtration setup. Thermopharm exceeded our standards for clinical environments.",
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch("/api/admin/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch (e) {
        // Fallback to default
      }
    }
    loadTestimonials();
  }, []);

  // Auto transition every 5 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4">
      {/* Testimonials Cards Grid / Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {testimonials.map((t, index) => {
          const isVisible =
            index === activeIndex || index === (activeIndex + 1) % testimonials.length;

          return (
            <div
              key={t.id || index}
              className={`bg-slate-50 border border-slate-200/80 p-8 flex flex-col justify-between rounded-2xl shadow-sm hover:bg-white hover:shadow-md transition-all duration-500 transform ${
                isVisible ? "opacity-100 scale-100 block" : "hidden md:hidden"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1 text-amber-500 text-xs">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed italic mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/70">
                {t.avatar ? (
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center rounded-xl shadow-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-slate-900">{t.name}</p>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                    {t.role} {t.company ? `· ${t.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Dots & Buttons */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-xs transition-colors"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "w-6 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-xs transition-colors"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
