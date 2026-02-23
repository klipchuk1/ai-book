"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useWizard } from "@/components/wizard/wizard-provider";
import { getBookById } from "@/lib/constants/books";
import { personalizeText } from "@/lib/utils/text";
import { Button } from "@/components/ui/button";
import { CreditCard, BookOpen, ChevronRight, Loader2, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id as string;
  const {
    childName, gender, age, photos, sessionId,
    setSelectedBook, setPaymentId,
  } = useWizard();

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookGenerating, setBookGenerating] = useState(false);

  const book = getBookById(bookId);

  if (!book) {
    return (
      <div className="flex flex-col items-center py-20">
        <p className="mb-4 text-muted-foreground">Книга не найдена</p>
        <Link href="/create/catalog">
          <Button>Вернуться к каталогу</Button>
        </Link>
      </div>
    );
  }

  if (!childName || !gender) {
    return (
      <div className="flex flex-col items-center py-20">
        <p className="mb-4 text-muted-foreground">Сначала заполните данные ребёнка</p>
        <Link href="/create/details">
          <Button>Заполнить данные</Button>
        </Link>
      </div>
    );
  }

  const g = gender as "male" | "female";
  const title = personalizeText(book.title, childName, g);
  const description = personalizeText(book.description, childName, g);

  async function handlePayment() {
    setPaymentLoading(true);
    setError(null);
    setSelectedBook(bookId);

    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          sessionId,
          bookId,
        }),
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

  async function handleFreeGenerate() {
    if (!photos.length) {
      setError("Сначала загрузите фото");
      return;
    }
    setBookGenerating(true);
    setError(null);
    setSelectedBook(bookId);

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

      const response = await fetch("/api/generate-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photos: photoData,
          childName,
          gender,
          age: age || 6,
          bookId,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Ошибка генерации");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${childName}_${bookId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка генерации");
    } finally {
      setBookGenerating(false);
    }
  }

  return (
    <div>
      <Link href="/create/catalog" className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Назад к каталогу
      </Link>

      {/* Cover area */}
      <div className="mb-6 flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-purple-50">
        <BookOpen className="h-20 w-20 text-primary/30" />
      </div>

      {/* Book info */}
      <div className="mb-2">
        {book.subtitle && (
          <span className="text-sm font-medium text-primary">{book.subtitle}</span>
        )}
      </div>
      <h1 className="mb-3 text-2xl font-bold">{title}</h1>
      <p className="mb-6 text-muted-foreground">{description}</p>

      {/* Chapter list */}
      <div className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">Содержание</h2>
        <div className="divide-y divide-border rounded-xl border border-border">
          {book.chapters.map((chapter, i) => (
            <div key={chapter.id} className="flex items-center px-4 py-3">
              <span className="mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="flex-1 text-sm">{personalizeText(chapter.title, childName, g)}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <Button
          size="lg"
          className="text-lg"
          disabled={paymentLoading || bookGenerating}
          onClick={handlePayment}
        >
          {paymentLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Переходим к оплате...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              Купить книгу — {book.priceRub.toLocaleString("ru-RU")} ₽
            </>
          )}
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">
          PDF с {book.chapters.length} главами и персональными иллюстрациями
        </p>
      </div>

      {/* Dev: free generation */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            disabled={bookGenerating || paymentLoading}
            onClick={handleFreeGenerate}
          >
            {bookGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Генерируем...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                [DEV] Бесплатная генерация
              </>
            )}
          </Button>
          {bookGenerating && (
            <p className="mt-2 text-sm text-muted-foreground">
              Генерация займёт 3-5 минут. Не закрывайте страницу.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
