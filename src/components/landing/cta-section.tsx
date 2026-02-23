"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export function CTASection() {
  return (
    <section className="px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Подарите ребёнку волшебство
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Каждая сказка учит важным ценностям, а ваш ребёнок — главный герой
          истории. Создайте книгу прямо сейчас.
        </p>
        <Link href="/create/photos">
          <Button size="lg" className="text-lg">
            <BookOpen className="h-5 w-5" />
            Создать книгу
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
