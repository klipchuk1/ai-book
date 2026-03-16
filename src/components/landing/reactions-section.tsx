"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Quote, Play } from "lucide-react";

const REACTIONS = [
  {
    childName: "Маша, 5 лет",
    reaction: "Мама, это Я! Я настоящая принцесса!",
    parentNote: "Дочка прижала книгу к себе и не выпускала весь вечер. Теперь каждый день просит читать «свою» книгу.",
    parentName: "Анна, мама",
    emoji: "🤩",
    accentColor: "from-primary to-accent",
    glowColor: "rgba(255, 107, 107, 0.08)",
  },
  {
    childName: "Артём, 7 лет",
    reaction: "Пап, тут я дракона победил! Смотри!",
    parentNote: "Сын показывал книгу всем друзьям в школе. Теперь они все хотят свою. Это лучший подарок на день рождения.",
    parentName: "Дмитрий, папа",
    emoji: "😲",
    accentColor: "from-secondary to-tertiary",
    glowColor: "rgba(78, 205, 196, 0.08)",
  },
  {
    childName: "София, 4 года",
    reaction: "Ещё! Ещё читай про меня!",
    parentNote: "Внучка отложила планшет ради книги. Впервые за полгода! Уже заказали вторую часть.",
    parentName: "Елена, бабушка",
    emoji: "🥰",
    accentColor: "from-tertiary to-primary",
    glowColor: "rgba(167, 139, 250, 0.08)",
  },
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

        {/* Reaction cards */}
        <div className="grid gap-6 lg:grid-cols-3 mb-16">
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
              <div className="relative rounded-2xl glass-strong p-6 h-full transition-all duration-300 hover:border-white/15 overflow-hidden">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 80px ${item.glowColor}` }}
                />

                {/* Child reaction — the WOW moment */}
                <div className="relative mb-5">
                  {/* Emoji + speech bubble */}
                  <div className="flex items-start gap-3 mb-4">
                    <motion.div
                      className="text-4xl shrink-0"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    >
                      {item.emoji}
                    </motion.div>
                    <div className={`relative rounded-2xl rounded-tl-sm bg-gradient-to-r ${item.accentColor} p-[1px]`}>
                      <div className="rounded-2xl rounded-tl-sm bg-[#0a0a1a] px-4 py-3">
                        <p className="text-white font-bold text-lg leading-snug">
                          &laquo;{item.reaction}&raquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Child name */}
                  <div className="flex items-center gap-2 ml-14">
                    <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${item.accentColor}`} />
                    <span className="text-sm font-semibold text-white/70">{item.childName}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mb-4" />

                {/* Parent note */}
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 h-5 w-5 text-white/[0.06]" />
                  <p className="text-sm text-white/40 leading-relaxed pl-4">
                    {item.parentNote}
                  </p>
                  <p className="mt-2 text-xs text-white/25 pl-4">
                    — {item.parentName}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video CTA — тизер */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.3 }}
          className="mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden glass-strong group cursor-pointer">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-8">
              {/* Play button area */}
              <div className="relative shrink-0">
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="h-8 w-8 text-white ml-1" fill="white" />
                </motion.div>
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Посмотрите, как дети реагируют на свою книгу
                </h3>
                <p className="text-white/40 text-sm">
                  Соберём видео-отзывы от реальных родителей. Скоро здесь появятся ролики с настоящими эмоциями.
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
