"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AgeGroupFilter } from "@/components/catalog/AgeGroupFilter";
import { BookCard } from "@/components/catalog/BookCard";
import { getBooksByAgeGroup } from "@/lib/constants/books";
import { Button } from "@/components/ui/button";
import type { AgeGroup } from "@/types/catalog";
import { ArrowRight } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function CatalogSection() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("5-7");
  const books = useMemo(() => getBooksByAgeGroup(ageGroup), [ageGroup]);

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Каталог книг
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-muted-foreground">
            Выберите возраст ребёнка и посмотрите доступные книги
          </p>
          <div className="section-divider mb-10" />
        </motion.div>

        <div className="mb-8 flex justify-center">
          <AgeGroupFilter selected={ageGroup} onChange={setAgeGroup} />
        </div>

        {books.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            Книги для этой возрастной группы скоро появятся!
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.2 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </motion.div>
        )}

        <div className="mt-10 text-center">
          <Link href="/create/photos">
            <Button variant="primary" size="lg">
              Создать книгу
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
