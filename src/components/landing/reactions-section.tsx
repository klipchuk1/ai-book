"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Quote, Play } from "lucide-react";
import Image from "next/image";

const REACTIONS = [
  {
    image: "/reactions/reaction-2.webp",
    childName: "Артём, 2 года",
    reaction: "Пап, это я! Это же я!",
    parentNote: "Сын увидел себя на страницах и не мог оторваться. Теперь каждый вечер просит «свою книгу».",
    parentName: "Дмитрий, папа",
    accentColor: "from-primary to-accent",
    glowColor: "rgba(255, 107, 107, 0.08)",
  },
  {
    image: "/reactions/reaction-3.webp",
    childName: "Анастасия, 5 лет",
    reaction: "Мама, смотри, я настоящая героиня!",
    parentNote: "Дочка прижала книгу к себе и не выпускала весь день. Показывала всем гостям. Лучший подарок!",
    parentName: "Ольга, мама",
    accentColor: "from-secondary to-tertiary",
    glowColor: "rgba(78, 205, 196, 0.08)",
  },
  {
    image: "/reactions/reaction-5.webp",
    childName: "Миша, 3 года",
    reaction: "Ещё! Ещё читай про меня!",
    parentNote: "Отложил планшет ради книги — впервые за полгода! Уже заказали вторую часть.",
    parentName: "Елена, мама",
    accentColor: "from-tertiary to-primary",
    glowColor: "rgba(167, 139, 250, 0.08)",
  },
];

const GALLERY = [
  { image: "/reactions/reaction-1.jpg", caption: "Семейное чтение" },
  { image: "/reactions/reaction-4.webp", caption: "Мама и дочка" },
  { image: "/reactions/reaction-6.jpg", caption: "Брат и сестра" },
];

const STATS = [
  { value: "97%", label: "детей просят перечитать", icon: Heart },
  { value: "4.9", label: "средняя оценка родителей", icon: Star },
  { value: "89%", label: "заказывают вторую книгу", icon: Sparkles },
];

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function ReactionsSection() {
  return (
    <section className="px-4 py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-tertiary/3 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            <Heart className="h-3 w-3 fill-primary" />
            РЕАКЦИИ ДЕТЕЙ
          </div>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white">
            Момент, когда ребёнок видит{" "}
            <span className="gradient-text-animated">себя в книге</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/50 text-lg">
            Это не просто книга — это восторг, гордость и бесконечное перечитывание.
            Вот что происходит, когда дети открывают свою историю.
          </p>
        </motion.div>

        {/* Main reaction cards with photos */}
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          {REACTIONS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <div className="relative rounded-2xl glass-strong overflow-hidden transition-all duration-300 hover:border-white/15">
                {/* Photo */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.childName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />

                  {/* Child quote overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className={`inline-block rounded-xl rounded-bl-sm bg-gradient-to-r ${item.accentColor} p-[1px]`}>
                      <div className="rounded-xl rounded-bl-sm bg-[#0a0a1a]/90 backdrop-blur-sm px-4 py-2">
                        <p className="text-white font-bold text-sm sm:text-base">
                          &laquo;{item.reaction}&raquo;
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${item.accentColor}`} />
                      <span className="text-xs font-semibold text-white/70">{item.childName}</span>
                    </div>
                  </div>
                </div>

                {/* Parent note */}
                <div className="p-5">
                  <div className="relative">
                    <Quote className="absolute -top-1 -left-1 h-4 w-4 text-white/[0.06]" />
                    <p className="text-sm text-white/40 leading-relaxed pl-4">
                      {item.parentNote}
                    </p>
                    <p className="mt-2 text-xs text-white/25 pl-4">
                      — {item.parentName}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photo gallery strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-3 gap-3">
            {GALLERY.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 33vw, 300px"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-white font-medium">{item.caption}</p>
                </div>
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/20 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.3 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden glass-strong group cursor-pointer">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-8">
              <div className="relative shrink-0">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="h-6 w-6 text-white ml-0.5" fill="white" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Видео-отзывы от родителей — скоро
                </h3>
                <p className="text-white/40 text-sm">
                  Собираем видео с настоящими эмоциями детей. Подпишитесь, чтобы не пропустить.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.2 }}
        >
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: 0.3 + i * 0.1 }}
                className="text-center glass rounded-2xl p-5"
              >
                <stat.icon className="h-5 w-5 text-accent mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-extrabold gradient-text-warm mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
