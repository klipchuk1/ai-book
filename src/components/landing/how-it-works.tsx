"use client";

import { motion } from "framer-motion";
import { Camera, BookOpen, Download, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: Camera,
    title: "Кастинг за 2 минуты",
    description: "Имя, возраст и 2-3 фото — всё, что нужно для главной роли",
    gradient: "from-primary to-primary-light",
    glowColor: "rgba(255, 107, 107, 0.15)",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Выберите историю",
    description: "Каталог по возрасту — с бесплатным превью роли",
    gradient: "from-secondary to-secondary-light",
    glowColor: "rgba(78, 205, 196, 0.15)",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    icon: Download,
    title: "Книга готова",
    description: "Тираж: 1 экземпляр. Эксклюзивно для вашего ребёнка — за 5 минут",
    gradient: "from-tertiary to-tertiary-light",
    glowColor: "rgba(167, 139, 250, 0.15)",
    iconBg: "bg-tertiary/10",
    iconColor: "text-tertiary",
  },
];

const spring = { type: "spring" as const, stiffness: 80, damping: 15 };

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/3 blur-[120px] pointer-events-none" />

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
            ПРОСТО
          </div>
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white">
            Как получить{" "}
            <span className="gradient-text">главную роль</span>
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-white/50">
            3 шага — и ваш ребёнок станет героем книги, написанной только для него
          </p>
          <div className="section-divider mb-16" />
        </motion.div>

        <div className="relative">
          {/* Animated connecting line (desktop) */}
          <div className="absolute top-1/2 left-[16%] right-[16%] hidden lg:block">
            <motion.div
              className="h-[2px] bg-gradient-to-r from-primary/30 via-secondary/30 to-tertiary/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative"
              >
                <div
                  className="relative overflow-hidden rounded-2xl glass-strong p-7 text-center transition-all duration-300 hover:border-white/15 group"
                  style={{
                    boxShadow: `0 0 0 rgba(0,0,0,0), inset 0 1px 0 rgba(255,255,255,0.05)`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ boxShadow: `inset 0 0 80px ${step.glowColor}` }}
                  />

                  {/* Step number */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-5xl font-extrabold bg-gradient-to-b ${step.gradient} bg-clip-text text-transparent opacity-15`}>
                      {i + 1}
                    </span>
                  </div>

                  {/* Icon with glow ring */}
                  <div className="relative mb-6 flex justify-center">
                    <motion.div
                      className={`rounded-2xl p-4 ${step.iconBg} relative`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon className={`h-7 w-7 ${step.iconColor}`} />
                      {/* Pulse ring */}
                      <div className={`absolute inset-0 rounded-2xl ${step.iconBg} animate-ping opacity-20`} />
                    </motion.div>
                  </div>

                  <h3 className="relative mb-2 text-lg font-bold text-white">{step.title}</h3>
                  <p className="relative text-sm leading-relaxed text-white/50">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
