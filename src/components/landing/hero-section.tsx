"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary-dark">
            <Sparkles className="h-4 w-4" />
            Персонализированные книги с AI
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Книги, где герой —{" "}
            <span className="text-primary">ваш ребёнок</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Выберите книгу из каталога, загрузите фото — и получите
            персонализированный PDF с лицом вашего ребёнка на каждой странице.
            Серии историй, от которых невозможно оторваться.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/create/photos">
              <Button size="lg" className="text-lg">
                <BookOpen className="h-5 w-5" />
                Создать книгу
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              от 1 690 ₽ &middot; 7-10 глав в каждой книге
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
