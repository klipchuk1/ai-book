import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, BookOpen, Clock } from "lucide-react";

const FEATURES = [
  "7-10 глав в каждой книге",
  "Лицо ребёнка на каждой иллюстрации",
  "Персонализированная обложка",
  "Серии книг — собирайте все части",
  "PDF в высоком качестве",
  "Готово за 5 минут",
];

export function PricingSection() {
  return (
    <section className="bg-muted/50 px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
          Простая цена — волшебный результат
        </h2>

        <Card className="relative mx-auto max-w-md overflow-hidden border-primary/20 p-8">
          <div className="absolute right-0 top-0 rounded-bl-xl bg-primary px-4 py-1 text-sm font-bold text-white">
            PDF
          </div>

          <div className="mb-6 text-center">
            <div className="mb-2 text-4xl font-extrabold">
              1 690 <span className="text-xl font-normal text-muted-foreground">₽</span>
            </div>
            <p className="text-muted-foreground">одна книга</p>
          </div>

          <ul className="mb-8 space-y-3">
            {FEATURES.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 shrink-0 text-success" />
                {feature}
              </li>
            ))}
          </ul>

          <Link href="/create/photos" className="block">
            <Button size="lg" className="w-full text-lg">
              <BookOpen className="h-5 w-5" />
              Создать книгу
            </Button>
          </Link>

          <div className="mt-4 flex justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> 5 мин
            </span>
          </div>
        </Card>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Печатная версия — 4 190 ₽ (включая доставку)
        </p>
      </div>
    </section>
  );
}
