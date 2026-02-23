"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

function FloatingCircle({
  className,
  size,
  delay,
}: {
  className: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full bg-white/10 ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -15, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function CTASection() {
  return (
    <section className="px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF6B6B] via-[#A78BFA] to-[#4ECDC4] px-8 py-16 sm:py-20"
      >
        {/* Floating decorative circles */}
        <FloatingCircle className="top-[10%] left-[5%]" size={120} delay={0} />
        <FloatingCircle className="bottom-[10%] right-[8%]" size={80} delay={2} />
        <FloatingCircle className="top-[30%] right-[20%]" size={60} delay={4} />

        <div className="relative text-center">
          <h2 className="mb-5 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Подарите ребёнку волшебство
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/80">
            Каждая сказка учит важным ценностям, а ваш ребёнок — главный герой
            истории. Создайте книгу прямо сейчас.
          </p>
          <Link href="/create/photos">
            <Button
              size="lg"
              className="bg-white text-foreground text-lg font-bold hover:bg-white/90 shadow-lg shadow-black/10 hover:-translate-y-0.5 active:translate-y-0"
            >
              <BookOpen className="h-5 w-5" />
              Создать книгу
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
