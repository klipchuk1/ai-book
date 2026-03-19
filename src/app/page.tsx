import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { BookPreviewSection } from "@/components/landing/book-preview-section";
import { ReactionsSection } from "@/components/landing/reactions-section";
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
      {/* Premium header with glassmorphism — mobile-optimized */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2.5 sm:px-4 sm:py-4 lg:px-8">
        <div className="mx-auto max-w-6xl flex items-center justify-between rounded-2xl glass-strong px-3.5 py-2.5 sm:px-5 sm:py-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-tertiary shadow-lg shadow-primary/20">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              AI <span className="gradient-text">Книга</span>
            </span>
          </Link>
          <Link href="/create/start">
            {/* Mobile: compact button; Desktop: full button with "книгу" */}
            <button className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-3.5 py-2 sm:px-5 sm:py-2.5 text-[13px] sm:text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.97] cursor-pointer touch-manipulation">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>Создать<span className="hidden sm:inline"> книгу</span></span>
            </button>
          </Link>
        </div>
      </header>

      <main>
        <HeroSection />
        <BookPreviewSection />
        <ReactionsSection />
        <HowItWorks />
        <CatalogSection />
        <PricingSection />
        <ReviewsSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Premium footer — mobile-optimized */}
      <footer className="border-t border-white/[0.06] px-4 py-8 sm:py-12 text-center">
        <div className="section-divider mb-6 sm:mb-8" />
        <div className="mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-tertiary">
            <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
          </div>
          <span className="text-base sm:text-lg font-extrabold text-white">
            AI <span className="gradient-text">Книга</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm text-white/30">
          &copy; {new Date().getFullYear()} AI Книга. Все права защищены.
        </p>
      </footer>
    </div>
  );
}
