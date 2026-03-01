"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Анна М.",
    avatar: "А",
    color: "bg-primary/20 text-primary",
    text: "Дочка была в восторге! Увидела себя на страницах и сразу попросила читать ещё раз. Качество иллюстраций поразило — как настоящая детская книга из магазина.",
    rating: 5,
  },
  {
    name: "Дмитрий К.",
    avatar: "Д",
    color: "bg-secondary/20 text-secondary",
    text: "Заказал книгу на день рождения сына. Получилось волшебно — он узнал себя на каждой странице. Уже заказываю вторую часть серии!",
    rating: 5,
  },
  {
    name: "Елена С.",
    avatar: "Е",
    color: "bg-tertiary/20 text-tertiary",
    text: "Лучший подарок, который я когда-либо делала. Внучка перечитывает каждый вечер перед сном. 5 минут — и книга готова, это невероятно.",
    rating: 5,
  },
  {
    name: "Максим В.",
    avatar: "М",
    color: "bg-accent/30 text-accent-dark",
    text: "Сначала сомневался, но превью убедило. Лицо ребёнка на иллюстрациях выглядит естественно. Жена тоже в восторге, теперь дарим такие книги друзьям.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-accent text-accent" : "text-border"
          }`}
        />
      ))}
    </div>
  );
}

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function ReviewsSection() {
  return (
    <section className="px-4 py-24 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Что говорят родители
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-muted-foreground">
            Более 150 семей уже создали книги для своих детей
          </p>
          <div className="section-divider mb-12" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.1 }}
              className="rounded-2xl border border-border/40 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${review.color}`}>
                  {review.avatar}
                </div>
                <div>
                  <p className="font-bold">{review.name}</p>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                &ldquo;{review.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
