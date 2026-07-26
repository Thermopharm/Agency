"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(20, "Please describe your project (min 20 characters)"),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  "HVAC Systems",
  "Cleanroom Solutions",
  "BIM Modelling",
  "BMS & Electrical",
  "Pharmaceutical Engineering",
  "Chemical Plant Engineering",
  "Other",
];

interface ContactFormProps {
  darkMode?: boolean;
}

export default function ContactForm({ darkMode = false }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch {
      // handle error gracefully
    } finally {
      setSubmitting(false);
    }
  };

  // Styles
  const labelClass = cn(
    "block text-[12px] font-semibold uppercase tracking-[0.1em] mb-2",
    darkMode ? "text-slate-700" : "text-gray-700"
  );
  const inputClass = (hasError: boolean) =>
    cn(
      "w-full px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-1 rounded",
      darkMode
        ? "bg-slate-50 border border-slate-300 text-slate-900 placeholder-white/40 focus:ring-blue-500 focus:border-blue-500"
        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500",
      hasError && (darkMode ? "border-red-500" : "border-red-500")
    );

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className={cn(
          "w-16 h-16 flex items-center justify-center mb-4 rounded-full",
          darkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"
        )}>
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className={cn("text-xl font-display font-bold mb-2", darkMode ? "text-slate-900" : "text-gray-900")}>
          Message Sent!
        </h3>
        <p className={cn("text-sm max-w-sm", darkMode ? "text-slate-600" : "text-gray-600")}>
          Thank you for reaching out. Our engineering team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-blue-400 text-xs font-semibold uppercase tracking-wider hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            placeholder="Rajesh Kumar"
            {...register("name")}
            className={inputClass(!!errors.name)}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className={labelClass}>
            Company *
          </label>
          <input
            id="company"
            type="text"
            placeholder="Pharma Pvt. Ltd."
            {...register("company")}
            className={inputClass(!!errors.company)}
          />
          {errors.company && (
            <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            placeholder="rajesh@company.com"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className={labelClass}>
          Service Required *
        </label>
        <select
          id="service"
          {...register("service")}
          className={inputClass(!!errors.service)}
        >
          <option value="" className="bg-white text-slate-900">Select a service...</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s} className="bg-white text-slate-900">
              {s}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Project Description *
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Describe your facility requirements, approximate area, location, regulatory standards..."
          {...register("message")}
          className={inputClass(!!errors.message) + " resize-none"}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        id="contact-submit"
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-slate-900 py-3.5 text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed rounded"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Technical Specifications
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
