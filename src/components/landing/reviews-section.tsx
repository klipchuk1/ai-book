"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Анна М.",
    avatar: "А",
    color: "bg-primary/20 text-primary",
    text: "Дочка увидела себя на обложке и закричала: «Мама, это Я!» Теперь засыпает только с этой книгой. Ощущение, что ей вручили главную роль в собственной сказке.",
    rating: 5,
  },
  {
    name: "Дмитрий К.",
    avatar: "Д",
    color: "bg-secondary/20 text-secondary",
    text: "Подарил сыну на день рождения. Он сначала не поверил, что это он на картинках. Потом побежал показывать друзьям. Уже заказываю вторую «роль» из серии!",
    rating: 5,
  },
  {
    name: "Елена С.",
    avatar: "Е",
    color: "bg-tertiary/20 text-tertiary",
    text: "Внучка теперь просит «свою книгу», а не мультики перед сном. Издательская карточка с тиражом «1 экземпляр» — отдельная гордость, все подруги спрашивают где заказать.",
    rating: 5,
  },
  {
    name: "Максим В.",
    avatar: "М",
    color: "bg-accent/30 text-accent-dark",
    text: "Сначала сомневался — AI же. Но когда ребёнок обнял книгу и сказал «папа, я тут герой» — все сомнения исчезли. Жена выложила издательскую карточку в сторис, собрали кучу лайков.",
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
            Более 150 детей уже получили свою первую главную роль
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
