"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
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
    <section className="px-4 py-24 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-tertiary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-accent mb-4">
            <Sparkles className="h-3 w-3" />
            ПРЕВЬЮ
          </div>
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white">
            Как выглядит{" "}
            <span className="gradient-text">главная роль</span>
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-white/50">
            Каждая страница — уникальная сцена, где ваш ребёнок в центре истории
          </p>
          <div className="section-divider mb-12" />
        </motion.div>

        {/* Navigation */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass-strong p-3 transition-all hover:bg-white/[0.12] hover:scale-110 sm:block disabled:opacity-20 cursor-pointer"
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-5 w-5 text-white/70" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass-strong p-3 transition-all hover:bg-white/[0.12] hover:scale-110 sm:block disabled:opacity-20 cursor-pointer"
            disabled={activeIndex === PREVIEW_PAGES.length - 1}
          >
            <ChevronRight className="h-5 w-5 text-white/70" />
          </button>

          {/* Cards carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
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
                <div className="group overflow-hidden rounded-2xl glass-strong transition-all duration-300 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
                  {/* Page image */}
                  <div className="relative h-[400px] overflow-hidden">
                    <Image
                      src={page.image}
                      alt={page.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="300px"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-60" />
                    {/* Page number */}
                    <span className="absolute top-3 left-3 rounded-full glass px-3 py-1 text-xs font-bold text-white/80">
                      {page.id} / {PREVIEW_PAGES.length}
                    </span>
                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-bold text-white text-lg mb-1">{page.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{page.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot indicators */}
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
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "w-8 bg-gradient-to-r from-primary to-tertiary"
                    : "w-2 bg-white/10 hover:bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
