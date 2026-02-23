"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AgeGroupFilter } from "@/components/catalog/AgeGroupFilter";
import { BookCard } from "@/components/catalog/BookCard";
import { getBooksByAgeGroup } from "@/lib/constants/books";
import { Button } from "@/components/ui/button";
import type { AgeGroup } from "@/types/catalog";
import { ArrowRight } from "lucide-react";

export function CatalogSection() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("5-7");
  const books = useMemo(() => getBooksByAgeGroup(ageGroup), [ageGroup]);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
          Каталог книг
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-center text-muted-foreground">
          Выберите возраст ребёнка и посмотрите доступные книги
        </p>

        <div className="mb-8 flex justify-center">
          <AgeGroupFilter selected={ageGroup} onChange={setAgeGroup} />
        </div>

        {books.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            Книги для этой возрастной группы скоро появятся!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/create/photos">
            <Button variant="outline" size="lg">
              Создать книгу
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
