"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Как создаётся персонализированная книга?",
    answer:
      "Вы загружаете 2-3 фотографии ребёнка, выбираете книгу из каталога — и наш AI создаёт уникальные иллюстрации, где ваш ребёнок становится главным героем каждой страницы.",
  },
  {
    question: "Сколько времени занимает создание книги?",
    answer:
      "Создание PDF занимает около 5 минут. Вы получите ссылку на скачивание сразу после оплаты и генерации.",
  },
  {
    question: "Можно ли заказать печатную версию?",
    answer:
      "Да! Печатная версия стоит 4 190 ₽, включая доставку по России. Книга печатается на качественной бумаге в твёрдой обложке.",
  },
  {
    question: "Для какого возраста подходят книги?",
    answer:
      "У нас есть книги для трёх возрастных групп: 2-4 года, 5-7 лет и 8-12 лет. Каждая книга адаптирована под уровень восприятия ребёнка.",
  },
  {
    question: "Безопасно ли загружать фото ребёнка?",
    answer:
      "Абсолютно. Фотографии используются только для генерации иллюстраций и не сохраняются на наших серверах после создания книги. Мы серьёзно относимся к приватности.",
  },
  {
    question: "Можно ли подарить книгу?",
    answer:
      "Конечно! Персонализированная книга — отличный подарок. Вы можете создать книгу с данными другого ребёнка и отправить PDF или заказать печатную версию с доставкой.",
  },
];

const ACCENT_COLORS = [
  "border-primary/30",
  "border-secondary/30",
  "border-tertiary/30",
  "border-accent/30",
  "border-primary/30",
  "border-secondary/30",
];

const CHEVRON_COLORS = [
  "text-primary",
  "text-secondary",
  "text-tertiary",
  "text-accent",
  "text-primary",
  "text-secondary",
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl glass-strong transition-all duration-300 ${isOpen ? ACCENT_COLORS[index] : ""}`}>
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 sm:p-5 text-left text-[15px] sm:text-base font-bold text-white/90 transition-colors hover:bg-white/[0.03] min-h-[48px]"
        aria-expanded={isOpen}
      >
        <span className="leading-snug">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`shrink-0 ${CHEVRON_COLORS[index]}`}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-[14px] sm:text-base leading-relaxed text-white/40">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 py-14 sm:py-24 relative">
      {/* Background glow - smaller on mobile */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[200px] sm:h-[300px] rounded-full bg-primary/3 blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-3xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-accent mb-4">
            <Sparkles className="h-3 w-3" />
            FAQ
          </div>
          <h2 className="mb-3 text-[1.625rem] leading-tight font-extrabold sm:text-4xl lg:text-5xl text-white">
            Частые{" "}
            <span className="gradient-text">вопросы</span>
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-sm sm:text-base text-white/50">
            Всё, что нужно знать о создании персонализированных книг
          </p>
          <div className="section-divider mb-8 sm:mb-12" />
        </motion.div>

        <div className="space-y-2.5 sm:space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.05 }}
            >
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
