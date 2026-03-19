"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  BookOpen,
  Clock,
  Shield,
  Star,
  Sparkles,
  FileText,
  Printer,
  Truck,
  Heart,
  Zap,
} from "lucide-react";

/* --- features --- */

const FEATURES = [
  { text: "7\u201310 глав \u2014 полноценная история", icon: BookOpen },
  { text: "Ваш ребёнок \u2014 герой каждой иллюстрации", icon: Star },
  { text: "Персонализированная обложка с его лицом", icon: Heart },
  { text: "Тираж: 1 экземпляр \u2014 только для вашего ребёнка", icon: Sparkles },
  { text: "Издательская карточка для соцсетей", icon: FileText },
  { text: "Готово за 5 минут", icon: Zap },
];

const spring = { type: "spring" as const, stiffness: 80, damping: 18 };

/* --- floating decorative orb --- */

function FloatingOrb({
  color,
  size,
  x,
  y,
  delay,
}: {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        opacity: 0.06,
      }}
      animate={{
        x: [0, 20, -15, 0],
        y: [0, -15, 10, 0],
        scale: [1, 1.15, 0.9, 1],
      }}
      transition={{
        duration: 10 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* --- animated checkmark --- */

function AnimatedCheck({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.4 + delay * 0.1,
      }}
      className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b6b]/20 to-[#ffb347]/20 border border-[#ff6b6b]/20"
    >
      <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#ff6b6b]" />
    </motion.div>
  );
}

/* --- main section --- */

export function PricingSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-28 bg-[#0a0a1a]">
      {/* Background mesh gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a78bfa]/[0.03] blur-[150px]" />
        <div className="absolute left-0 top-0 h-[500px] w-[600px] rounded-full bg-[#ff6b6b]/[0.025] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[600px] rounded-full bg-[#ffb347]/[0.025] blur-[120px]" />
      </div>

      {/* Floating orbs */}
      <FloatingOrb color="#ff6b6b" size={300} x="-5%" y="10%" delay={0} />
      <FloatingOrb color="#a78bfa" size={250} x="80%" y="5%" delay={1.5} />
      <FloatingOrb color="#ffb347" size={200} x="60%" y="70%" delay={3} />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white/50 backdrop-blur-sm"
          >
            <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#4ecdc4]" />
            Прозрачные цены
          </motion.div>

          <h2 className="mb-3 sm:mb-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-6xl">
            Одна роль{" "}
            <span className="bg-gradient-to-r from-[#ff6b6b] via-[#a78bfa] to-[#ffb347] bg-clip-text text-transparent">
              {"\u2014"} одна цена
            </span>
          </h2>
          <p className="mx-auto mb-8 sm:mb-14 max-w-xl text-sm text-white/40 sm:text-lg">
            Без подписок, без скрытых платежей. Платите один раз за уникальную книгу
          </p>
        </motion.div>

        {/* Pricing cards: PDF + Print -- stacked on mobile, side by side on lg */}
        <div className="mx-auto grid max-w-4xl gap-6 sm:gap-8 lg:grid-cols-2">
          {/* PDF Card - Primary */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.2 }}
            className="relative"
          >
            {/* "Recommended" floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.5 }}
              className="absolute -top-3.5 sm:-top-4 left-1/2 z-20 -translate-x-1/2"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ffb347] blur-lg opacity-50" />
                <span className="relative whitespace-nowrap rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ffb347] px-4 py-1 sm:px-5 sm:py-1.5 text-[11px] sm:text-xs font-bold text-white shadow-lg">
                  Популярный выбор
                </span>
              </div>
            </motion.div>

            {/* Gradient border */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#ff6b6b]/50 via-[#a78bfa]/50 to-[#ffb347]/50 p-[1px]">
              <div className="relative overflow-hidden rounded-[15px] sm:rounded-[23px] bg-[#0f0f2a] p-5 sm:p-8">
                {/* Subtle inner glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/[0.04] via-transparent to-[#a78bfa]/[0.04]" />

                {/* Top gradient line */}
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-[#ff6b6b] via-[#a78bfa] to-[#ffb347]" />

                {/* Format badge */}
                <div className="relative mb-5 sm:mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b6b]" />
                    <span className="text-[13px] sm:text-sm font-semibold text-white/60">PDF-книга</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-[#4ecdc4]/20 bg-[#4ecdc4]/10 px-2.5 py-0.5 sm:px-3 sm:py-1">
                    <Clock className="h-3 w-3 text-[#4ecdc4]" />
                    <span className="text-[11px] sm:text-xs font-medium text-[#4ecdc4]">5 минут</span>
                  </div>
                </div>

                {/* Price */}
                <div className="relative mb-6 sm:mb-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...spring, delay: 0.3 }}
                  >
                    <span className="bg-gradient-to-r from-[#ff6b6b] via-[#a78bfa] to-[#ffb347] bg-clip-text text-5xl sm:text-6xl font-extrabold text-transparent">
                      1 690
                    </span>
                    <span className="ml-1.5 sm:ml-2 text-xl sm:text-2xl font-normal text-white/30">{"\u20bd"}</span>
                  </motion.div>
                  <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-sm text-white/30">одна главная роль</p>
                </div>

                {/* Features */}
                <ul className="relative mb-6 sm:mb-8 space-y-3 sm:space-y-4">
                  {FEATURES.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...spring, delay: 0.4 + i * 0.08 }}
                      className="flex items-start sm:items-center gap-2.5 sm:gap-3 text-[13px] sm:text-sm text-white/60"
                    >
                      <AnimatedCheck delay={i} />
                      <span className="leading-snug">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href="/create/start" className="relative block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/cta relative w-full overflow-hidden rounded-xl sm:rounded-2xl py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white transition-all duration-300"
                  >
                    {/* Button gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] via-[#a78bfa] to-[#ffb347] opacity-90 transition-opacity duration-300 group-hover/cta:opacity-100" />

                    {/* Pulse glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] via-[#a78bfa] to-[#ffb347] blur-xl"
                      animate={{ opacity: [0.15, 0.35, 0.15] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                      Дать главную роль
                    </span>
                  </motion.button>
                </Link>

                {/* Trust signals */}
                <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-white/25">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Безопасная оплата
                  </span>
                  <span className="h-3 w-px bg-white/10" />
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    Гарантия качества
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Print Card - Secondary */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.35 }}
            className="relative"
          >
            {/* No badge, simple border */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] p-[1px]">
              <div className="relative overflow-hidden rounded-[15px] sm:rounded-[23px] bg-white/[0.03] backdrop-blur-xl p-5 sm:p-8">
                {/* Subtle inner glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ffb347]/[0.02] via-transparent to-[#a78bfa]/[0.02]" />

                {/* Format badge */}
                <div className="relative mb-5 sm:mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Printer className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffb347]" />
                    <span className="text-[13px] sm:text-sm font-semibold text-white/60">Печатная книга</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-[#ffb347]/20 bg-[#ffb347]/10 px-2.5 py-0.5 sm:px-3 sm:py-1">
                    <Truck className="h-3 w-3 text-[#ffb347]" />
                    <span className="text-[11px] sm:text-xs font-medium text-[#ffb347]">+ доставка</span>
                  </div>
                </div>

                {/* Price */}
                <div className="relative mb-6 sm:mb-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...spring, delay: 0.45 }}
                  >
                    <span className="bg-gradient-to-r from-[#ffb347] to-[#a78bfa] bg-clip-text text-5xl sm:text-6xl font-extrabold text-transparent">
                      4 190
                    </span>
                    <span className="ml-1.5 sm:ml-2 text-xl sm:text-2xl font-normal text-white/30">{"\u20bd"}</span>
                  </motion.div>
                  <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-sm text-white/30">включая доставку</p>
                </div>

                {/* Print-specific features */}
                <ul className="relative mb-6 sm:mb-8 space-y-3 sm:space-y-4">
                  {[
                    "Всё из PDF-версии",
                    "Твёрдая обложка премиум-качества",
                    "Плотная глянцевая бумага",
                    "Доставка по всей России",
                    "Подарочная упаковка",
                    "Идеальный подарок",
                  ].map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...spring, delay: 0.5 + i * 0.08 }}
                      className="flex items-start sm:items-center gap-2.5 sm:gap-3 text-[13px] sm:text-sm text-white/50"
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.5 + i * 0.1,
                        }}
                        className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border border-[#ffb347]/20 bg-[#ffb347]/10"
                      >
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#ffb347]" />
                      </motion.div>
                      <span className="leading-snug">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button - secondary style */}
                <Link href="/create/start" className="relative block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/cta2 relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.1] bg-white/[0.05] py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white/80 transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Printer className="h-4 w-4 sm:h-5 sm:w-5" />
                      Заказать печать
                    </span>
                  </motion.button>
                </Link>

                {/* Trust signals */}
                <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-white/25">
                  <span className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    Бесплатная доставка
                  </span>
                  <span className="h-3 w-px bg-white/10" />
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Гарантия возврата
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.6 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 sm:px-6 sm:py-3 backdrop-blur-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                >
                  <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-[#ffb347] text-[#ffb347]" />
                </motion.div>
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-white/40">
              4.9/5 {"\u00b7"} 150+ счастливых родителей
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
