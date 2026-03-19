"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [cardWidth, setCardWidth] = useState(280);

  // Measure actual card width from the DOM so scroll offsets stay in sync
  const syncCardWidth = useCallback(() => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector<HTMLElement>(
      "[data-preview-card]"
    );
    if (firstCard) {
      // card width + gap (gap is handled via CSS gap, so we measure offset
      // between first two cards if available, otherwise use offsetWidth + 16)
      const cards = scrollRef.current.querySelectorAll<HTMLElement>(
        "[data-preview-card]"
      );
      if (cards.length >= 2) {
        setCardWidth(cards[1].offsetLeft - cards[0].offsetLeft);
      } else {
        setCardWidth(firstCard.offsetWidth + 16);
      }
    }
  }, []);

  useEffect(() => {
    syncCardWidth();
    window.addEventListener("resize", syncCardWidth);
    return () => window.removeEventListener("resize", syncCardWidth);
  }, [syncCardWidth]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      setActiveIndex(index);
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    },
    [cardWidth]
  );

  const scroll = (direction: "left" | "right") => {
    const newIndex =
      direction === "left"
        ? Math.max(0, activeIndex - 1)
        : Math.min(PREVIEW_PAGES.length - 1, activeIndex + 1);
    scrollTo(newIndex);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), PREVIEW_PAGES.length - 1));
  };

  return (
    <section className="px-0 sm:px-4 py-12 sm:py-24 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-tertiary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center px-4 sm:px-0"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-accent mb-4">
            <Sparkles className="h-3 w-3" />
            ПРЕВЬЮ
          </div>
          <h2 className="mb-3 text-2xl font-extrabold sm:text-4xl lg:text-5xl text-white">
            Как выглядит{" "}
            <span className="gradient-text">главная роль</span>
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-sm sm:text-base text-white/50">
            Каждая страница — уникальная сцена, где ваш ребёнок в центре истории
          </p>
          <div className="section-divider mb-8 sm:mb-12" />
        </motion.div>

        {/* Navigation */}
        <div className="relative">
          {/* Left arrow -- hidden on mobile, touch-friendly 44px+ target on desktop */}
          <button
            onClick={() => scroll("left")}
            aria-label="Предыдущая страница"
            className="absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass-strong p-3 transition-all hover:bg-white/[0.12] hover:scale-110 sm:flex items-center justify-center disabled:opacity-20 cursor-pointer min-w-[44px] min-h-[44px]"
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-5 w-5 text-white/70" />
          </button>
          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Следующая страница"
            className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass-strong p-3 transition-all hover:bg-white/[0.12] hover:scale-110 sm:flex items-center justify-center disabled:opacity-20 cursor-pointer min-w-[44px] min-h-[44px]"
            disabled={activeIndex === PREVIEW_PAGES.length - 1}
          >
            <ChevronRight className="h-5 w-5 text-white/70" />
          </button>

          {/* Cards carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth touch-pan-x overscroll-x-contain pl-4 sm:pl-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {PREVIEW_PAGES.map((page, i) => (
              <motion.div
                key={page.id}
                data-preview-card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.1 }}
                className="w-[75vw] max-w-[280px] shrink-0 snap-center sm:w-[300px] sm:max-w-none last:mr-4 sm:last:mr-0"
              >
                <div className="group overflow-hidden rounded-2xl glass-strong transition-all duration-300 hover:border-white/20 sm:hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
                  {/* Page image -- shorter on mobile to leave room for text */}
                  <div className="relative h-[320px] sm:h-[400px] overflow-hidden">
                    <Image
                      src={page.image}
                      alt={page.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 75vw, 300px"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-60" />
                    {/* Page number badge */}
                    <span className="absolute top-3 left-3 rounded-full glass px-3 py-1 text-xs font-bold text-white/80 min-h-[28px] flex items-center">
                      {page.id} / {PREVIEW_PAGES.length}
                    </span>
                    {/* Title and description overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <h3 className="font-bold text-white text-base sm:text-lg mb-0.5 sm:mb-1">
                        {page.title}
                      </h3>
                      <p className="text-[13px] sm:text-sm text-white/60 leading-snug sm:leading-relaxed line-clamp-3">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Right padding spacer for mobile so last card can center */}
            <div className="w-[calc(12.5vw-6px)] shrink-0 sm:hidden" aria-hidden="true" />
          </div>

          {/* Dot indicators -- 44px touch targets with visible 10px dots */}
          <div className="mt-4 sm:mt-6 flex justify-center gap-1">
            {PREVIEW_PAGES.map((page, i) => (
              <button
                key={page.id}
                onClick={() => scrollTo(i)}
                aria-label={`Страница ${page.id}: ${page.title}`}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 sm:p-1 cursor-pointer"
              >
                <span
                  className={`block h-2.5 sm:h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-gradient-to-r from-primary to-tertiary"
                      : "w-2.5 sm:w-2 bg-white/10 hover:bg-white/20"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
