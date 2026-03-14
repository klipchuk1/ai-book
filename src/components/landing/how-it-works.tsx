"use client";

import { motion } from "framer-motion";
import { Camera, BookOpen, Download } from "lucide-react";

const STEPS = [
  {
    icon: Camera,
    title: "Кастинг за 2 минуты",
    description: "Имя, возраст и 2-3 фото — всё, что нужно для главной роли",
    color: "bg-primary/10 text-primary",
    numColor: "text-primary/20",
  },
  {
    icon: BookOpen,
    title: "Выберите историю",
    description: "Каталог по возрасту — с бесплатным превью роли",
    color: "bg-secondary/10 text-secondary",
    numColor: "text-secondary/20",
  },
  {
    icon: Download,
    title: "Книга готова",
    description: "Тираж: 1 экземпляр. Эксклюзивно для вашего ребёнка — за 5 минут",
    color: "bg-tertiary/10 text-tertiary",
    numColor: "text-tertiary/20",
  },
];

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Как получить главную роль
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-muted-foreground">
            3 шага — и ваш ребёнок станет героем книги, написанной только для него
          </p>
          <div className="section-divider mb-16" />
        </motion.div>

        <div className="relative">
          {/* Connecting dashed line (desktop) */}
          <div className="absolute top-1/2 left-[calc(16.7%)] right-[calc(16.7%)] hidden border-t-2 border-dashed border-border lg:block" />

          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl border border-border/40 bg-white p-6 text-center shadow-sm"
              >
                {/* Large background number */}
                <span className={`absolute -top-2 -right-2 text-7xl font-extrabold select-none ${step.numColor}`}>
                  {i + 1}
                </span>

                {/* Icon */}
                <div className="relative mb-5 flex justify-center">
                  <div className={`rounded-2xl p-4 ${step.color}`}>
                    <step.icon className="h-7 w-7" />
                  </div>
                </div>

                <h3 className="relative mb-2 text-lg font-bold">{step.title}</h3>
                <p className="relative text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
