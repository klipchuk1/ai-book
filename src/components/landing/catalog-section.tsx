"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getBooksByAgeGroup } from "@/lib/constants/books";
import type { AgeGroup, BookTemplate } from "@/types/catalog";
import { BookOpen, ArrowRight, Sparkles, Star } from "lucide-react";

/* --- constants --- */

const AGE_GROUPS: { value: AgeGroup; label: string; emoji: string }[] = [
  { value: "2-4", label: "2\u20134 года", emoji: "\ud83e\uddf8" },
  { value: "5-7", label: "5\u20137 лет", emoji: "\ud83e\udd84" },
  { value: "8-12", label: "8\u201312 лет", emoji: "\ud83d\ude80" },
];

/* --- floating sparkle --- */

function FloatingStar({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -12, 0],
        opacity: [0.2, 0.7, 0.2],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Star
        className="text-amber-400/40"
        style={{ width: size, height: size }}
        fill="currentColor"
      />
    </motion.div>
  );
}

/* --- premium book card with 3D tilt --- */

function PremiumBookCard({
  book,
  index,
}: {
  book: BookTemplate;
  index: number;
}) {
  const displayTitle = book.title.replace(/{name}/g, "...");
  const displayDescription = book.description.replace(
    /{name}/g,
    "вашего ребёнка"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay: index * 0.15,
      }}
      className="group"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        whileHover={{
          rotateY: 5,
          rotateX: -3,
          scale: 1.03,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient border glow on hover */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#ff6b6b]/0 via-[#a78bfa]/0 to-[#ffb347]/0 opacity-0 blur-[1px] transition-all duration-500 group-hover:from-[#ff6b6b]/60 group-hover:via-[#a78bfa]/60 group-hover:to-[#ffb347]/60 group-hover:opacity-100" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl transition-all duration-500 group-hover:border-white/[0.15] group-hover:bg-white/[0.07]">
          {/* Cover illustration area */}
          <div className="relative flex h-56 items-center justify-center overflow-hidden">
            {/* Shimmer background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/10 via-[#a78bfa]/10 to-[#ffb347]/10" />

            {/* Animated shimmer sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <BookOpen className="h-16 w-16 text-[#a78bfa]/30 transition-all duration-500 group-hover:text-[#a78bfa]/50 group-hover:scale-110" />
            </motion.div>

            {/* Floating badges */}
            {book.subtitle && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-3 top-3 rounded-full border border-[#ffb347]/30 bg-[#ffb347]/10 px-3 py-1.5 text-xs font-bold text-[#ffb347] backdrop-blur-sm"
              >
                {book.subtitle}
              </motion.span>
            )}

            <span className="absolute left-3 top-3 rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/10 px-3 py-1.5 text-xs font-bold text-[#a78bfa] backdrop-blur-sm">
              {book.chapters.length} глав
            </span>

            {/* Age badges */}
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {book.ageGroups.map((ag) => (
                <span
                  key={ag}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white/50 backdrop-blur-sm"
                >
                  {ag} лет
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-2 text-lg font-bold leading-tight text-white/90 transition-colors duration-300 group-hover:text-white">
              {displayTitle}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-white/40 line-clamp-2">
              {displayDescription}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#ffb347]/60" />
                <span className="text-xs text-white/30">Персонализация AI</span>
              </div>
              <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ffb347] bg-clip-text text-lg font-extrabold text-transparent">
                {book.priceRub.toLocaleString("ru-RU")}{" "}
                <span className="text-sm font-normal text-white/30">{"\u20bd"}</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --- main section --- */

export function CatalogSection() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("5-7");
  const books = useMemo(() => getBooksByAgeGroup(ageGroup), [ageGroup]);

  return (
    <section className="relative overflow-hidden px-4 py-28 bg-[#0a0a1a]">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#a78bfa]/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[500px] rounded-full bg-[#ff6b6b]/[0.03] blur-[100px]" />
        <div className="absolute bottom-20 right-0 h-[400px] w-[500px] rounded-full bg-[#ffb347]/[0.03] blur-[100px]" />
      </div>

      {/* Floating decorative stars */}
      <FloatingStar delay={0} x="5%" y="15%" size={12} />
      <FloatingStar delay={1.5} x="92%" y="10%" size={10} />
      <FloatingStar delay={0.8} x="15%" y="75%" size={8} />
      <FloatingStar delay={2} x="85%" y="65%" size={14} />
      <FloatingStar delay={1} x="50%" y="5%" size={10} />
      <FloatingStar delay={2.5} x="70%" y="80%" size={12} />
      <FloatingStar delay={0.5} x="30%" y="90%" size={9} />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/50 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-[#ffb347]" />
            Волшебные истории
          </motion.div>

          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Каталог{" "}
            <span className="bg-gradient-to-r from-[#ff6b6b] via-[#a78bfa] to-[#ffb347] bg-clip-text text-transparent">
              книг
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base text-white/40 sm:text-lg">
            Выберите возраст ребёнка и найдите идеальную историю
          </p>
        </motion.div>

        {/* Premium age filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <div className="inline-flex gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1.5 backdrop-blur-xl">
            {AGE_GROUPS.map((group) => {
              const isActive = ageGroup === group.value;
              return (
                <motion.button
                  key={group.value}
                  onClick={() => setAgeGroup(group.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-300"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAgeTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff6b6b]/20 via-[#a78bfa]/20 to-[#ffb347]/20 border border-white/[0.12]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff6b6b]/10 via-[#a78bfa]/10 to-[#ffb347]/10 blur-lg" />
                    </motion.div>
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    <span className="text-base">{group.emoji}</span>
                    {group.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Book grid */}
        <AnimatePresence mode="wait">
          {books.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-4 text-4xl"
              >
                {"\u2728"}
              </motion.div>
              <p className="text-lg text-white/30">
                Книги для этой возрастной группы скоро появятся!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={ageGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {books.map((book, i) => (
                <PremiumBookCard key={book.id} book={book} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link href="/create/start">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-8 py-4 text-lg font-bold text-white transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] via-[#a78bfa] to-[#ffb347] opacity-90 transition-opacity duration-300 group-hover/btn:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] via-[#a78bfa] to-[#ffb347] opacity-0 blur-xl transition-opacity duration-300 group-hover/btn:opacity-40" />
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="h-5 w-5" />
                Создать свою книгу
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
