import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { BookPreviewSection } from "@/components/landing/book-preview-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CatalogSection } from "@/components/landing/catalog-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ReviewsSection } from "@/components/landing/reviews-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { BookOpen, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Premium header with glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-8">
        <div className="mx-auto max-w-6xl flex items-center justify-between rounded-2xl glass-strong px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-tertiary shadow-lg shadow-primary/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              AI <span className="gradient-text">Книга</span>
            </span>
          </div>
          <Link href="/create/start">
            <button className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] cursor-pointer">
              <Sparkles className="h-3.5 w-3.5" />
              Создать книгу
            </button>
          </Link>
        </div>
      </header>

      <main>
        <HeroSection />
        <BookPreviewSection />
        <HowItWorks />
        <CatalogSection />
        <PricingSection />
        <ReviewsSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Premium footer */}
      <footer className="border-t border-white/[0.06] px-4 py-12 text-center">
        <div className="section-divider mb-8" />
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-tertiary">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-extrabold text-white">
            AI <span className="gradient-text">Книга</span>
          </span>
        </div>
        <p className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} AI Книга. Все права защищены.
        </p>
      </footer>
    </div>
  );
}
