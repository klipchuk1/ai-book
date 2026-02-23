"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, BookOpen, Clock } from "lucide-react";

const FEATURES = [
  "7-10 глав в каждой книге",
  "Лицо ребёнка на каждой иллюстрации",
  "Персонализированная обложка",
  "Серии книг — собирайте все части",
  "PDF в высоком качестве",
  "Готово за 5 минут",
];

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function PricingSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Простая цена — волшебный результат
          </h2>
          <div className="section-divider mb-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.2 }}
          className="mx-auto max-w-md"
        >
          {/* Rainbow gradient border wrapper */}
          <div className="rounded-3xl bg-gradient-to-br from-primary via-tertiary to-secondary p-[2px]">
            <div className="relative overflow-hidden rounded-[22px] bg-white p-8">
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-tertiary to-secondary" />

              {/* PDF badge */}
              <div className="absolute right-4 top-4 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
                PDF
              </div>

              <div className="mb-8 text-center">
                <div className="mb-2 text-5xl font-extrabold text-foreground">
                  1 690 <span className="text-2xl font-normal text-muted-foreground">₽</span>
                </div>
                <p className="text-muted-foreground">одна книга</p>
              </div>

              <ul className="mb-8 space-y-4">
                {FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/create/photos" className="block">
                <Button variant="gradient" size="lg" className="w-full text-lg">
                  <BookOpen className="h-5 w-5" />
                  Создать книгу
                </Button>
              </Link>

              <div className="mt-4 flex justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 5 мин
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          Печатная версия — 4 190 ₽ (включая доставку)
        </motion.p>
      </div>
    </section>
  );
}
