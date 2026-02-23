"use client";

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
    <button
      onClick={() => onSelect?.(book.id)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition-all hover:shadow-lg hover:border-primary/40"
    >
      {/* Cover placeholder */}
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-amber-50 to-purple-50">
        <BookOpen className="h-16 w-16 text-primary/30" />
        {book.subtitle && (
          <span className="absolute top-3 right-3 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {book.subtitle}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-bold leading-tight group-hover:text-primary transition-colors">
          {displayTitle}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {displayDescription}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {book.chapters.length} глав
          </span>
          <span className="font-bold text-primary">
            {book.priceRub.toLocaleString("ru-RU")} ₽
          </span>
        </div>
      </div>
    </button>
  );
}
