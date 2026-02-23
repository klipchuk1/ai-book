import { User, Camera, BookOpen, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

const STEPS = [
  {
    icon: User,
    title: "Введите данные",
    description: "Имя, пол и возраст вашего ребёнка",
  },
  {
    icon: Camera,
    title: "Загрузите фото",
    description: "2-3 фотографии лица ребёнка",
  },
  {
    icon: BookOpen,
    title: "Выберите книгу",
    description: "Из каталога книг по возрасту",
  },
  {
    icon: Download,
    title: "Получите PDF",
    description: "Книга с лицом ребёнка на каждой странице",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
          Как это работает
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
          Всего 4 простых шага — и ваш ребёнок станет героем собственной книги
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Card key={i} className="relative text-center">
              <div className="absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {i + 1}
              </div>
              <div className="mb-4 mt-2 flex justify-center">
                <div className="rounded-xl bg-primary/10 p-3">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-bold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
