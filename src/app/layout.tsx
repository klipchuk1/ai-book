import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a1a",
};

export const metadata: Metadata = {
  title: "AI Книга — Персонализированные сказки для вашего ребёнка",
  description:
    "Создайте уникальную книгу сказок с иллюстрациями, где главный герой — ваш ребёнок. Загрузите фото, выберите книгу — и получите PDF за 5 минут.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AI Книга",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${nunito.variable} font-sans antialiased text-[15px] sm:text-base`}>
        {children}
      </body>
    </html>
  );
}
