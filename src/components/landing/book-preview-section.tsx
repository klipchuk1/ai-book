"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const PREVIEW_PAGES = [
  {
    id: 1,
    title: "Обложка",
    description: "Ваш ребёнок на обложке собственной книги — как настоящий герой",
    image: "/examples/cover.png",
  },
  {
    id: 2,
    title: "Вход в историю",
    description: "Каждая глава — новая сцена, где ваш ребёнок в главной роли",
    image: "/examples/story-start.png",
  },
  {
    id: 3,
    title: "Акварельные иллюстрации",
    description: "AI рисует вашего ребёнка в каждой сцене — как в лучших детских книгах",
    image: "/examples/illustration.png",
  },
  {
    id: 4,
    title: "Сюжет по возрасту",
    description: "Увлекательная история, адаптированная под возраст ребёнка",
    image: "/examples/story-text.png",
  },
  {
    id: 5,
    title: "Продолжение следует",
    description: "В финале — тизер следующей книги серии. Приключение не заканчивается",
    image: "/examples/teaser.png",
  },
];

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function BookPreviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 320;
    const newIndex =
      direction === "left"
        ? Math.max(0, activeIndex - 1)
        : Math.min(PREVIEW_PAGES.length - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    scrollRef.current.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = 320;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(newIndex);
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
            Как выглядит главная роль
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-muted-foreground">
            Каждая страница — уникальная сцена, где ваш ребёнок в центре истории
          </p>
          <div className="section-divider mb-12" />
        </motion.div>

        {/* Navigation buttons */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white/90 p-2.5 shadow-lg transition-all hover:shadow-xl hover:bg-white hover:scale-105 sm:block disabled:opacity-30 disabled:hover:scale-100"
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white/90 p-2.5 shadow-lg transition-all hover:shadow-xl hover:bg-white hover:scale-105 sm:block disabled:opacity-30 disabled:hover:scale-100"
            disabled={activeIndex === PREVIEW_PAGES.length - 1}
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
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
                <div className="group overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Page image */}
                  <div className="relative h-[400px] overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-tertiary/5">
                    <Image
                      src={page.image}
                      alt={page.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="300px"
                    />
                    {/* Subtle overlay gradient at bottom for readability */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                    {/* Page number badge */}
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm">
                      {page.id} / {PREVIEW_PAGES.length}
                    </span>
                  </div>
                  {/* Caption */}
                  <div className="p-4">
                    <h3 className="mb-1 font-bold text-foreground">{page.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{page.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active dot indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {PREVIEW_PAGES.map((page, i) => (
              <button
                key={page.id}
                onClick={() => {
                  setActiveIndex(i);
                  scrollRef.current?.scrollTo({
                    left: i * 320,
                    behavior: "smooth",
                  });
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-border hover:bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
