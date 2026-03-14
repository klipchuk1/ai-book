"use client";

import { useEffect, useState, useRef } from "react";
import { useWizard } from "@/components/wizard/wizard-provider";
import { getBookById } from "@/lib/constants/books";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Download, Loader2, BookOpen, Palette, FileText } from "lucide-react";
import Link from "next/link";
import { PublishCard } from "@/components/share/publish-card";

interface GenerationStep {
  label: string;
  icon: React.ReactNode;
}

type PageStatus = "checking" | "generating" | "ready" | "failed" | "canceled";

export default function PaymentResultPage() {
  const { photos, childName, gender, age, selectedBookId, paymentId } = useWizard();
  const [status, setStatus] = useState<PageStatus>("checking");
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const checkedRef = useRef(false);

  const book = selectedBookId ? getBookById(selectedBookId) : null;
  const chapterCount = book?.chapters.length ?? 7;

  const generationSteps: GenerationStep[] = [
    { label: "Проверяем оплату", icon: <FileText className="h-4 w-4" /> },
    { label: "Создаём обложку", icon: <Palette className="h-4 w-4" /> },
    ...Array.from({ length: chapterCount }, (_, i) => ({
      label: `Рисуем главу ${i + 1}`,
      icon: <BookOpen className="h-4 w-4" />,
    })),
    { label: "Собираем PDF", icon: <FileText className="h-4 w-4" /> },
  ];

  useEffect(() => {
    if (status !== "generating") return;
    const interval = setInterval(() => {
      setCurrentStep((i) => Math.min(i + 1, generationSteps.length - 1));
    }, 25000);
    return () => clearInterval(interval);
  }, [status, generationSteps.length]);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;
    checkPaymentAndGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkPaymentAndGenerate() {
    if (!paymentId) {
      setError("Платёж не найден. Попробуйте снова.");
      setStatus("failed");
      return;
    }

    setStatus("checking");
    setCurrentStep(0);

    try {
      let paid = false;
      for (let i = 0; i < 10; i++) {
        const res = await fetch(`/api/payment-status?paymentId=${paymentId}`);
        const data = await res.json();

        if (data.status === "succeeded" || data.paid) {
          paid = true;
          break;
        }
        if (data.status === "canceled") {
          setStatus("canceled");
          return;
        }
        await new Promise((r) => setTimeout(r, 3000));
      }

      if (!paid) {
        setError("Оплата ещё обрабатывается. Подождите и обновите страницу.");
        setStatus("failed");
        return;
      }

      setStatus("generating");
      setCurrentStep(1);

      if (!photos.length || !childName || !gender || !selectedBookId) {
        setError("Данные сессии потеряны. Попробуйте создать книгу заново.");
        setStatus("failed");
        return;
      }

      const photoData = await Promise.all(
        photos.slice(0, 3).map(async (p) => {
          const buffer = await p.file.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(buffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          return { data: base64, mimeType: p.file.type };
        })
      );

      const response = await fetch("/api/generate-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photos: photoData,
          childName,
          gender,
          age: age || 6,
          bookId: selectedBookId,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Ошибка генерации книги");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setStatus("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      setStatus("failed");
    }
  }

  function handleDownload() {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${childName}_${selectedBookId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const progress = Math.min(((currentStep + 1) / generationSteps.length) * 100, 95);

  return (
    <div>
      {status === "checking" && (
        <div className="flex flex-col items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-6 text-lg font-bold">Проверяем оплату...</p>
          <p className="mt-2 text-sm text-muted-foreground">Это займёт несколько секунд</p>
        </div>
      )}

      {status === "generating" && (
        <div className="py-10">
          <div className="mb-8 text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
            <h1 className="text-2xl font-extrabold">Создаём книгу для {childName}</h1>
            <p className="mt-2 text-muted-foreground">
              Генерация займёт 3-5 минут. Не закрывайте страницу.
            </p>
          </div>

          <div className="mx-auto max-w-md">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-medium text-primary">
                {generationSteps[currentStep]?.label}
              </span>
              <span className="text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-sm space-y-2">
            {generationSteps.map((step, i) => {
              const isDone = i < currentStep;
              const isActive = i === currentStep;

              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all",
                    isDone && "text-muted-foreground",
                    isActive && "bg-primary/5 font-medium text-primary",
                    !isDone && !isActive && "text-muted-foreground/50"
                  )}
                >
                  <div className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full",
                    isDone && "bg-green-100 text-green-600",
                    isActive && "bg-primary/10 text-primary",
                    !isDone && !isActive && "bg-muted text-muted-foreground/50"
                  )}>
                    {isDone ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : isActive ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {status === "ready" && (
        <div className="flex flex-col items-center py-12">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-2 text-2xl font-extrabold">
            {childName} получил{gender === "female" ? "а" : ""} главную роль!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Персонализированная книга создана. Тираж: 1 экземпляр.
          </p>

          <Button variant="gradient" size="lg" className="mt-8 text-lg" onClick={handleDownload}>
            <Download className="h-5 w-5" />
            Скачать PDF
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Ссылка действительна в текущей вкладке
          </p>

          {/* Издательская карточка «Единственный экземпляр» */}
          <div className="mt-10 w-full">
            <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
              Поделитесь с друзьями и близкими
            </p>
            <PublishCard
              childName={childName}
              bookTitle={book ? book.title.replace("{childName}", childName) : `Приключения ${childName}`}
              editionNumber={Math.floor(Math.random() * 500) + 150}
            />
          </div>

          <div className="mt-10 flex gap-3">
            <Link href="/create/catalog">
              <Button variant="outline">Следующая роль</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">На главную</Button>
            </Link>
          </div>
        </div>
      )}

      {status === "canceled" && (
        <div className="flex flex-col items-center py-20">
          <XCircle className="h-16 w-16 text-amber-500" />
          <h1 className="mt-4 text-2xl font-bold">Оплата отменена</h1>
          <p className="mt-2 text-muted-foreground">Вы можете попробовать снова.</p>
          <Link href="/create/catalog" className="mt-6">
            <Button>Вернуться к каталогу</Button>
          </Link>
        </div>
      )}

      {status === "failed" && (
        <div className="flex flex-col items-center py-20">
          <XCircle className="h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold">Ошибка</h1>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <div className="mt-6 flex gap-3">
            <Link href="/create/catalog">
              <Button variant="outline">Вернуться к каталогу</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">На главную</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
