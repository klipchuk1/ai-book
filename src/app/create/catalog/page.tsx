"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/components/wizard/wizard-provider";
import { AgeGroupFilter } from "@/components/catalog/AgeGroupFilter";
import { BookCard } from "@/components/catalog/BookCard";
import { getBooksByAgeGroup, getAgeGroup, BOOK_CATALOG } from "@/lib/constants/books";
import { personalizeText } from "@/lib/utils/text";
import type { AgeGroup } from "@/types/catalog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star, ChevronRight, Sparkles } from "lucide-react";

export default function CatalogPage() {
  const { childName, gender, age } = useWizard();
  const router = useRouter();

  const defaultAgeGroup = age ? getAgeGroup(age) : "5-7";
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(defaultAgeGroup);

  const books = useMemo(() => getBooksByAgeGroup(ageGroup), [ageGroup]);

  function handleSelectBook(bookId: string) {
    router.push(`/create/book/${bookId}`);
  }

  if (!childName || !gender) {
    return (
      <div className="flex flex-col items-center py-20">
        <p className="mb-4 text-muted-foreground">
          Сначала заполните данные ребёнка
        </p>
        <Link href="/create/start">
          <Button>Заполнить данные</Button>
        </Link>
      </div>
    );
  }

  const g = gender as "male" | "female";

  return (
    <div>
      <h1 className="mb-2 text-2xl font-extrabold">Выберите книгу для {childName}</h1>
      <p className="mb-6 text-muted-foreground">
        Каждая книга — персональная история с лицом вашего ребёнка на каждой странице
      </p>

      {BOOK_CATALOG.length > 3 && (
        <div className="mb-6">
          <AgeGroupFilter selected={ageGroup} onChange={setAgeGroup} />
        </div>
      )}

      {books.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          Книги для этой возрастной группы скоро появятся!
        </div>
      ) : books.length === 1 ? (
        /* Single book — featured layout */
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm">
          <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-primary/10 via-tertiary/10 to-secondary/10">
            <BookOpen className="h-20 w-20 text-tertiary/30" />
            <div className="absolute left-3 top-3 flex gap-2">
              <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white">
                Новинка
              </span>
              <span className="flex items-center gap-1 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white">
                <Star className="h-3 w-3" /> Популярное
              </span>
            </div>
          </div>

          <div className="p-6">
            {books[0].subtitle && (
              <span className="mb-2 inline-block rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                {books[0].subtitle}
              </span>
            )}
            <h2 className="mb-2 text-xl font-bold">
              {personalizeText(books[0].title, childName, g)}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {personalizeText(books[0].description, childName, g)}
            </p>

            <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {books[0].chapters.length} глав
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                ~{Math.ceil(books[0].chapters.length * 3)} мин чтения
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                {books[0].chapters.length + 1} иллюстраций
              </span>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Главы:</h3>
              <div className="flex flex-wrap gap-2">
                {books[0].chapters.map((ch, i) => (
                  <span key={ch.id} className="rounded-full bg-muted px-3 py-1 text-xs">
                    {i + 1}. {personalizeText(ch.title, childName, g)}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold">
                {books[0].priceRub.toLocaleString("ru-RU")} <span className="text-base font-normal text-muted-foreground">₽</span>
              </span>
              <Button
                variant="gradient"
                size="lg"
                onClick={() => handleSelectBook(books[0].id)}
              >
                Выбрать
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              childName={childName}
              gender={g}
              onSelect={handleSelectBook}
            />
          ))}
        </div>
      )}

      {BOOK_CATALOG.length <= 3 && (
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-primary/5 via-tertiary/5 to-secondary/5 p-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Новые книги добавляются каждую неделю! Следите за обновлениями.
          </p>
        </div>
      )}
    </div>
  );
}
