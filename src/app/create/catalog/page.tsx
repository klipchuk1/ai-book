"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/components/wizard/wizard-provider";
import { AgeGroupFilter } from "@/components/catalog/AgeGroupFilter";
import { BookCard } from "@/components/catalog/BookCard";
import { getBooksByAgeGroup, getAgeGroup } from "@/lib/constants/books";
import type { AgeGroup } from "@/types/catalog";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        <Link href="/create/details">
          <Button>Заполнить данные</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Выберите книгу для {childName}</h1>
      <p className="mb-6 text-muted-foreground">
        Каждая книга — персональная история с лицом вашего ребёнка на каждой странице
      </p>

      <div className="mb-6">
        <AgeGroupFilter selected={ageGroup} onChange={setAgeGroup} />
      </div>

      {books.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          Книги для этой возрастной группы скоро появятся!
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              childName={childName}
              gender={gender as "male" | "female"}
              onSelect={handleSelectBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}
