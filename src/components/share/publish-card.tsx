"use client";

import { motion } from "framer-motion";
import { BookOpen, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useCallback } from "react";

interface PublishCardProps {
  childName: string;
  bookTitle: string;
  editionNumber: number;
  date?: string;
}

export function PublishCard({ childName, bookTitle, editionNumber, date }: PublishCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const formattedDate = date || new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleShare = useCallback(async () => {
    const text = `Сегодня издательство AI Книга выпустило книгу «${bookTitle}». Тираж: 1 экземпляр. Эксклюзивно для ${childName}. Издание №${editionNumber}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Книга для ${childName}`,
          text,
          url: window.location.origin,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(text + `\n\n${window.location.origin}`);
    }
  }, [childName, bookTitle, editionNumber]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="mx-auto max-w-sm"
    >
      {/* Card */}
      <div className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-white shadow-xl">
        {/* Top gradient */}
        <div className="h-2 bg-gradient-to-r from-primary via-tertiary to-secondary" />

        {/* Content */}
        <div className="px-6 py-8 text-center">
          {/* Publisher badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-1.5 text-xs font-semibold text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            Издательство AI Книга
          </div>

          {/* Announcement */}
          <p className="mb-2 text-sm text-muted-foreground">
            {formattedDate}
          </p>
          <h3 className="mb-1 text-lg font-extrabold leading-tight">
            {bookTitle}
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Персонализированное издание
          </p>

          {/* Edition details */}
          <div className="mb-6 rounded-xl bg-gradient-to-br from-primary/5 via-tertiary/5 to-secondary/5 p-5">
            <div className="mb-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Тираж
              </p>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                1 экземпляр
              </p>
            </div>
            <div className="h-px bg-border/50 my-3" />
            <div className="mb-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Эксклюзивно для
              </p>
              <p className="text-xl font-bold text-foreground">
                {childName}
              </p>
            </div>
            <div className="h-px bg-border/50 my-3" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Номер издания
              </p>
              <p className="text-lg font-bold text-foreground">
                №{editionNumber}
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs text-muted-foreground italic">
            Первая главная роль — без кастинга
          </p>
        </div>

        {/* Bottom gradient */}
        <div className="h-1 bg-gradient-to-r from-primary via-tertiary to-secondary" />
      </div>

      {/* Share button */}
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Поделиться
        </Button>
      </div>
    </motion.div>
  );
}
