"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const PREVIEW_PAGES = [
  {
    id: 1,
    title: "Обложка",
    description: "Персонализированная обложка с лицом вашего ребёнка",
    gradient: "from-primary/20 via-tertiary/10 to-secondary/20",
    icon: "📕",
  },
  {
    id: 2,
    title: "Начало истории",
    description: "Каждая глава — новое приключение с уникальными иллюстрациями",
    gradient: "from-secondary/20 via-primary/10 to-accent/20",
    icon: "✨",
  },
  {
    id: 3,
    title: "Иллюстрации",
    description: "AI создаёт красочные иллюстрации, где ваш ребёнок — главный герой",
    gradient: "from-tertiary/20 via-secondary/10 to-primary/20",
    icon: "🎨",
  },
  {
    id: 4,
    title: "Текст истории",
    description: "Увлекательный сюжет, адаптированный под возраст ребёнка",
    gradient: "from-accent/20 via-tertiary/10 to-secondary/20",
    icon: "📖",
  },
  {
    id: 5,
    title: "Продолжение",
    description: "В конце — тизер следующей книги серии",
    gradient: "from-primary/20 via-accent/10 to-tertiary/20",
    icon: "🚀",
  },
];

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function BookPreviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Как выглядит готовая книга
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-muted-foreground">
            Каждая страница — уникальная, созданная специально для вашего ребёнка
          </p>
          <div className="section-divider mb-12" />
        </motion.div>

        {/* Navigation buttons */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white p-2 shadow-md transition-all hover:shadow-lg hover:bg-muted sm:block"
          >
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white p-2 shadow-md transition-all hover:shadow-lg hover:bg-muted sm:block"
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PREVIEW_PAGES.map((page, i) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.1 }}
                className="w-[280px] shrink-0 snap-center sm:w-[300px]"
              >
                <div className="overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm transition-shadow hover:shadow-lg">
                  {/* Page preview area — replace with real screenshots */}
                  <div className={`flex h-[360px] items-center justify-center bg-gradient-to-br ${page.gradient} relative`}>
                    <div className="text-center">
                      <span className="mb-3 block text-5xl">{page.icon}</span>
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/20" />
                    </div>
                    {/* Page number badge */}
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                      {page.id} / {PREVIEW_PAGES.length}
                    </span>
                  </div>
                  {/* Caption */}
                  <div className="p-4">
                    <h3 className="mb-1 font-bold">{page.title}</h3>
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator dots */}
          <div className="mt-4 flex justify-center gap-2 sm:hidden">
            {PREVIEW_PAGES.map((page) => (
              <div
                key={page.id}
                className="h-2 w-2 rounded-full bg-border"
              />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Скриншоты реальной книги. Замените изображения в public/examples/ на реальные скриншоты PDF.
        </motion.p>
      </div>
    </section>
  );
}
