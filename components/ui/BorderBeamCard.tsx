"use client";

import { motion } from "framer-motion";

interface BorderBeamCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function BorderBeamCard({
  children,
  className = "",
  glowColor = "from-blue-600 via-cyan-400 to-blue-600",
}: BorderBeamCardProps) {
  return (
    <div className={`relative group overflow-hidden bg-slate-50 p-[1px] ${className}`}>
      {/* Animated Glow Line on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute -inset-full animate-[spin_4s_linear_infinite]"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, #2563eb 0%, #38bdf8 50%, #2563eb 100%)`,
        }}
      />
      {/* Card Content Container */}
      <div className="relative z-10 bg-slate-100 h-full w-full">{children}</div>
    </div>
  );
}
