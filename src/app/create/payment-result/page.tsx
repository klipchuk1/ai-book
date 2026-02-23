"use client";

import { useEffect, useState, useRef } from "react";
import { useWizard } from "@/components/wizard/wizard-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle, XCircle, Download } from "lucide-react";
import Link from "next/link";

const BOOK_LOADING_MESSAGES = [
  "Проверяем оплату...",
  "Создаём обложку...",
  "Рисуем Главу 1...",
  "Рисуем Главу 2...",
  "Рисуем Главу 3...",
  "Рисуем Главу 4...",
  "Рисуем Главу 5...",
  "Рисуем Главу 6...",
  "Рисуем Главу 7...",
  "Собираем PDF...",
  "Почти готово...",
];

type PageStatus = "checking" | "generating" | "ready" | "failed" | "canceled";

export default function PaymentResultPage() {
  const { photos, childName, gender, age, selectedBookId, paymentId } = useWizard();
  const [status, setStatus] = useState<PageStatus>("checking");
  const [error, setError] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (status !== "generating") return;
    const interval = setInterval(() => {
      setLoadingMsgIndex((i) => Math.min(i + 1, BOOK_LOADING_MESSAGES.length - 1));
    }, 25000);
    return () => clearInterval(interval);
  }, [status]);

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
    setLoadingMsgIndex(0);

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

      // Payment confirmed — generate book
      setStatus("generating");
      setLoadingMsgIndex(1);

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

  return (
    <div>
      {status === "checking" && (
        <div className="flex flex-col items-center py-20">
          <Spinner size="lg" />
          <p className="mt-6 text-lg font-medium">Проверяем оплату...</p>
        </div>
      )}

      {status === "generating" && (
        <div className="flex flex-col items-center py-20">
          <Spinner size="lg" />
          <p className="mt-6 text-lg font-medium">
            {BOOK_LOADING_MESSAGES[loadingMsgIndex]}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Генерация книги займёт 3-5 минут. Не закрывайте страницу.
          </p>
          <div className="mt-6 w-64 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-1000"
              style={{
                width: `${Math.min(((loadingMsgIndex + 1) / BOOK_LOADING_MESSAGES.length) * 100, 95)}%`,
              }}
            />
          </div>
        </div>
      )}

      {status === "ready" && (
        <div className="flex flex-col items-center py-20">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-2xl font-bold">Книга готова!</h1>
          <p className="mt-2 text-muted-foreground">
            Персонализированная книга для {childName} создана.
          </p>
          <Button size="lg" className="mt-8 text-lg" onClick={handleDownload}>
            <Download className="h-5 w-5" />
            Скачать PDF
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Ссылка действительна в текущей вкладке.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/create/catalog">
              <Button variant="outline">Купить ещё книгу</Button>
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
