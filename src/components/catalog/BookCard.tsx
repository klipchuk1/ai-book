"use client";

import { motion } from "framer-motion";
import type { BookTemplate } from "@/types/catalog";
import { BookOpen } from "lucide-react";
import { personalizeText } from "@/lib/utils/text";

interface BookCardProps {
  book: BookTemplate;
  childName?: string;
  gender?: "male" | "female";
  onSelect?: (bookId: string) => void;
}

export function BookCard({ book, childName, gender, onSelect }: BookCardProps) {
  const displayTitle = childName && gender
    ? personalizeText(book.title, childName, gender)
    : book.title.replace(/{name}/g, "...");

  const displayDescription = childName && gender
    ? personalizeText(book.description, childName, gender)
    : book.description.replace(/{name}/g, "вашего ребёнка");

  return (
    <motion.button
      onClick={() => onSelect?.(book.id)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-white text-left transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(255,107,107,0.12),0_2px_8px_rgba(167,139,250,0.1)]"
    >
      {/* Cover */}
      <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-primary/5 via-tertiary/5 to-secondary/5">
        <BookOpen className="h-14 w-14 text-tertiary/30 transition-all duration-300 group-hover:text-tertiary/50 group-hover:scale-110" />

        {book.subtitle && (
          <span className="absolute top-3 right-3 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
            {book.subtitle}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 text-lg font-bold leading-tight transition-colors group-hover:text-primary">
          {displayTitle}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {displayDescription}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3">
          <span className="text-xs text-muted-foreground">
            {book.chapters.length} глав
          </span>
          <span className="text-lg font-extrabold text-foreground">
            {book.priceRub.toLocaleString("ru-RU")} <span className="text-sm font-normal text-muted-foreground">₽</span>
          </span>
        </div>
      </div>
    </motion.button>
  );
}
