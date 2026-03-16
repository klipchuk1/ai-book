"use client";

import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const REVIEWS = [
  {
    name: "Анна М.",
    avatar: "А",
    gradient: "from-primary to-primary-light",
    text: "Дочка увидела себя на обложке и закричала: «Мама, это Я!» Теперь засыпает только с этой книгой. Ощущение, что ей вручили главную роль в собственной сказке.",
    rating: 5,
  },
  {
    name: "Дмитрий К.",
    avatar: "Д",
    gradient: "from-secondary to-secondary-light",
    text: "Подарил сыну на день рождения. Он сначала не поверил, что это он на картинках. Потом побежал показывать друзьям. Уже заказываю вторую «роль» из серии!",
    rating: 5,
  },
  {
    name: "Елена С.",
    avatar: "Е",
    gradient: "from-tertiary to-tertiary-light",
    text: "Внучка теперь просит «свою книгу», а не мультики перед сном. Издательская карточка с тиражом «1 экземпляр» — отдельная гордость, все подруги спрашивают где заказать.",
    rating: 5,
  },
  {
    name: "Максим В.",
    avatar: "М",
    gradient: "from-accent to-accent-light",
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
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-accent text-accent" : "text-white/10"
          }`}
        />
      ))}
    </div>
  );
}

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function ReviewsSection() {
  return (
    <section className="px-4 py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-white/[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-tertiary/3 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-accent mb-4">
            <Sparkles className="h-3 w-3" />
            ОТЗЫВЫ
          </div>
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white">
            Что говорят{" "}
            <span className="gradient-text">родители</span>
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-white/50">
            Более 150 детей уже получили свою первую главную роль
          </p>
          <div className="section-divider mb-12" />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="relative rounded-2xl glass-strong p-6 transition-all duration-300 hover:border-white/15">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "inset 0 0 60px rgba(167, 139, 250, 0.06)" }}
                />

                {/* Quote mark */}
                <Quote className="absolute top-4 right-4 h-8 w-8 text-white/[0.04]" />

                {/* Header */}
                <div className="relative mb-4 flex items-center gap-3">
                  {/* Avatar with gradient ring */}
                  <div className={`p-[2px] rounded-full bg-gradient-to-br ${review.gradient}`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a0a1a] text-sm font-bold text-white/80">
                      {review.avatar}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-white/90">{review.name}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>

                {/* Text */}
                <p className="relative leading-relaxed text-white/50 text-sm">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
