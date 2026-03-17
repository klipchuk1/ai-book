"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Star } from "lucide-react";

const sparkles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function CTASection() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl px-5 py-12 sm:px-8 sm:py-20"
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b] via-[#a78bfa] to-[#4ecdc4]"
          style={{
            backgroundSize: "200% 200%",
            animation: "gradient-shift 8s ease infinite",
          }}
        />

        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

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
              opacity: [0, 0.8, 0],
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

        {/* Floating elements */}
        <motion.div
          className="absolute top-[15%] left-[8%] text-white/15"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookOpen className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] right-[10%] text-white/15"
          animate={{ y: [0, -12, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Star className="h-10 w-10" />
        </motion.div>
        <motion.div
          className="absolute top-[30%] right-[15%] text-white/10"
          animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Sparkles className="h-8 w-8" />
        </motion.div>

        {/* Content */}
        <div className="relative text-center">
          <motion.h2
            className="mb-4 sm:mb-5 text-2xl font-extrabold text-white sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
          >
            Главная роль ждёт вашего ребёнка
          </motion.h2>
          <motion.p
            className="mx-auto mb-8 sm:mb-10 max-w-xl text-sm sm:text-lg leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.2 }}
          >
            Каждый ребёнок заслуживает быть героем хотя бы одной истории.
            Первая главная роль — без кастинга, за 5 минут.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.3 }}
          >
            <Link href="/create/start">
              <button className="group relative inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-[#0a0a1a] shadow-2xl shadow-black/20 transition-all duration-300 hover:bg-white/95 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer">
                <BookOpen className="h-5 w-5" />
                Дать главную роль
                <Sparkles className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            className="mt-6 text-sm text-white/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Гарантия качества &middot; Безопасная оплата &middot; Готово за 5 минут
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
