"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowDown, Star, Sparkles } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 80, damping: 14 };

const sparkles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 3,
}));

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:pb-32 sm:pt-36 lg:pt-44 min-h-[85vh] sm:min-h-[90vh] flex items-center">
      {/* Aurora gradient mesh background */}
      <div className="absolute inset-0 -z-10 bg-[#0a0a1a]">
        {/* Aurora blobs */}
        <div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #ff6b6b 0%, transparent 70%)",
            animation: "aurora-shift 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
            animation: "aurora-shift 18s ease-in-out infinite 3s",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[20%] w-[450px] h-[450px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #4ecdc4 0%, transparent 70%)",
            animation: "aurora-shift 20s ease-in-out infinite 6s",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #ffb347 0%, transparent 70%)",
            animation: "aurora-shift 16s ease-in-out infinite 2s",
          }}
        />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-40" />
      </div>

      {/* Sparkle particles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-[15%] right-[10%] text-primary/20 hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <BookOpen className="h-16 w-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-[25%] left-[8%] text-tertiary/20 hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Sparkles className="h-12 w-12" />
      </motion.div>
      <motion.div
        className="absolute top-[35%] left-[5%] text-accent/15 hidden lg:block"
        animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Star className="h-10 w-10" />
      </motion.div>

      <div className="relative mx-auto max-w-5xl text-center w-full">
        {/* Premium badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.1 }}
        >
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-2.5 rounded-full glass-strong px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white/90">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Первая главная роль — без кастинга
            <Sparkles className="h-3.5 w-3.5 text-accent" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mb-4 sm:mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          <span className="text-white">Каждый ребёнок мечтает </span>
          <span className="gradient-text-animated">
            стать героем
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mb-8 sm:mb-12 max-w-2xl text-sm sm:text-lg leading-relaxed text-white/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.5 }}
        >
          Дайте ребёнку первую главную роль — в книге, где он на каждой
          странице. Загрузите фото, выберите историю — и через 5 минут
          сказка с его лицом готова.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mb-8 sm:mb-10 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.7 }}
        >
          <Link href="/create/start">
            <button className="group relative inline-flex items-center gap-2 sm:gap-2.5 rounded-2xl bg-gradient-to-r from-primary via-primary-dark to-primary px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer animate-pulse-glow w-full sm:w-auto justify-center">
              <BookOpen className="h-5 w-5" />
              Создать книгу
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </button>
          </Link>
          <a href="#how-it-works">
            <button className="inline-flex items-center gap-2 rounded-2xl glass-strong px-6 py-3 sm:px-7 sm:py-4 text-sm sm:text-base font-semibold text-white/80 transition-all duration-300 hover:bg-white/[0.08] hover:text-white cursor-pointer w-full sm:w-auto justify-center">
              Как это работает
              <ArrowDown className="h-4 w-4" />
            </button>
          </a>
        </motion.div>

        {/* Social proof — glassmorphism badges */}
        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center">
            {/* Rating */}
            <div className="flex items-center gap-1.5 sm:gap-2 glass rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white/80">4.9/5</span>
            </div>

            {/* Counter */}
            <div className="glass rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <span className="text-xs sm:text-sm font-semibold text-white/80">
                150+ главных ролей
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
