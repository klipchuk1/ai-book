"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/components/wizard/wizard-provider";
import { getBookById } from "@/lib/constants/books";
import { personalizeText } from "@/lib/utils/text";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, ArrowLeft, RefreshCw, Sparkles } from "lucide-react";
import Link from "next/link";

type PreviewStatus = "idle" | "generating" | "done" | "error";

export default function PreviewPage() {
  const router = useRouter();
  const {
    childName, gender, age, photos, selectedBookId,
    sessionId, previewImages, setPreviewImages,
    setSelectedBook, setPaymentId,
  } = useWizard();

  const [status, setStatus] = useState<PreviewStatus>(
    previewImages.length > 0 ? "done" : "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const book = selectedBookId ? getBookById(selectedBookId) : null;
  const g = gender as "male" | "female";

  // Auto-start generation
  useEffect(() => {
    if (status === "idle" && previewImages.length === 0 && photos.length > 0 && selectedBookId) {
      startGeneration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startGeneration() {
    if (!photos.length || !selectedBookId || !childName || !gender) return;

    setStatus("generating");
    setError(null);

    try {
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

      const response = await fetch("/api/generate-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photos: photoData,
          childName,
          gender,
          bookId: selectedBookId,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Ошибка генерации превью");
      }

      const data = await response.json();
      setPreviewImages(data.images);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка генерации");
      setStatus("error");
    }
  }

  async function handlePayment() {
    if (!selectedBookId) return;
    setPaymentLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childName, sessionId, bookId: selectedBookId }),
      });

      const result = await response.json();
      if (!response.ok || result.error) {
        throw new Error(result.error || "Ошибка создания платежа");
      }

      if (result.paymentId) setPaymentId(result.paymentId);
      if (result.confirmationUrl) {
        window.location.href = result.confirmationUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка оплаты");
    } finally {
      setPaymentLoading(false);
    }
  }

  // Guard: no data
  if (!childName || !gender || !selectedBookId || !book) {
    return (
      <div className="flex flex-col items-center py-20">
        <p className="mb-4 text-muted-foreground">Сначала выберите книгу</p>
        <Link href="/create/catalog">
          <Button>Перейти к каталогу</Button>
        </Link>
      </div>
    );
  }

  const title = personalizeText(book.title, childName, g);

  return (
    <div>
      <Link
        href="/create/catalog"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Назад к каталогу
      </Link>

      <h1 className="mb-2 text-2xl font-extrabold">{title}</h1>
      <p className="mb-8 text-muted-foreground">
        Бесплатный превью — посмотрите, как будет выглядеть книга
      </p>

      {/* Generating state */}
      {status === "generating" && (
        <div className="flex flex-col items-center rounded-2xl border border-border/40 bg-muted/30 py-20">
          <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
          <p className="mb-2 text-lg font-bold">Создаём превью...</p>
          <p className="text-sm text-muted-foreground">
            AI рисует обложку и первую иллюстрацию. Это займёт 30-60 секунд.
          </p>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div className="flex flex-col items-center rounded-2xl border border-error/20 bg-error/5 py-12">
          <p className="mb-4 text-error">{error}</p>
          <Button variant="outline" onClick={startGeneration}>
            <RefreshCw className="h-4 w-4" />
            Попробовать снова
          </Button>
        </div>
      )}

      {/* Preview done */}
      {status === "done" && previewImages.length > 0 && (
        <>
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            {previewImages.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border/40 shadow-sm">
                <div className="relative">
                  <img
                    src={`data:${img.mimeType};base64,${img.base64}`}
                    alt={img.label === "cover" ? "Обложка" : "Иллюстрация"}
                    className="h-auto w-full"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    {img.label === "cover" ? "Обложка" : "Страница из книги"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Upsell banner */}
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary/5 via-tertiary/5 to-secondary/5 p-6 text-center">
            <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
            <p className="mb-1 text-lg font-bold">Нравится?</p>
            <p className="mb-6 text-sm text-muted-foreground">
              В полной книге — {book.chapters.length} глав с персональными иллюстрациями на каждой странице
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              variant="gradient"
              size="lg"
              className="text-lg"
              onClick={handlePayment}
              disabled={paymentLoading}
            >
              {paymentLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Переходим к оплате...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Получить полную книгу — {book.priceRub.toLocaleString("ru-RU")} ₽
                </>
              )}
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={startGeneration}>
              <RefreshCw className="h-4 w-4" />
              Новый превью
            </Button>
            <Link href="/create/catalog">
              <Button variant="ghost">Выбрать другую книгу</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
