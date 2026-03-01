"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowDown, Star } from "lucide-react";

function FloatingBlob({
  color,
  size,
  className,
  delay,
}: {
  color: string;
  size: number;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
      style={{ width: size, height: size, background: color }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -20, 10, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 12 + delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const spring = { type: "spring" as const, stiffness: 100, damping: 12 };

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-32 pt-24 sm:pt-36 lg:pt-44">
      {/* Soft pastel gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FFF0F0] via-[#F0EEFF] to-[#E8FFF9]" />

      {/* Floating blobs */}
      <FloatingBlob color="#FF6B6B" size={400} className="top-[-10%] right-[-5%]" delay={0} />
      <FloatingBlob color="#4ECDC4" size={350} className="bottom-[0%] left-[-8%]" delay={2} />
      <FloatingBlob color="#A78BFA" size={300} className="top-[20%] left-[50%]" delay={4} />
      <FloatingBlob color="#FFE66D" size={250} className="bottom-[10%] right-[20%]" delay={1} />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm">
            <span className="text-base">✨</span>
            Персонализированные книги с AI
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          Книги, где герой —{" "}
          <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
            ваш ребёнок
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.5 }}
        >
          Выберите книгу из каталога, загрузите фото — и получите
          персонализированный PDF с лицом вашего ребёнка на каждой странице.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.7 }}
        >
          <Link href="/create/photos">
            <Button variant="gradient" size="lg" className="text-lg">
              <BookOpen className="h-5 w-5" />
              Создать книгу
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg">
              Как это работает
              <ArrowDown className="h-4 w-4" />
            </Button>
          </a>
        </motion.div>

        {/* Social proof + trust line */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </span>
              4.9/5
            </span>
            <span className="h-4 w-px bg-border" />
            <span>150+ книг создано</span>
          </div>
          <p className="text-sm text-muted-foreground">
            от 1 690 ₽ &middot; 7-10 глав &middot; PDF за 5 минут
          </p>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          preserveAspectRatio="none"
          className="block h-16 w-full sm:h-24"
        >
          <path
            d="M0 40C360 80 720 0 1080 40C1260 60 1380 70 1440 60V100H0V40Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
