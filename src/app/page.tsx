import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CatalogSection } from "@/components/landing/catalog-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="relative z-50 flex items-center justify-between px-4 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-tertiary">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            AI <span className="text-primary">Книга</span>
          </span>
        </div>
        <Link href="/create/photos">
          <Button size="sm" className="hidden sm:inline-flex">
            Создать книгу
          </Button>
        </Link>
      </header>

      <main>
        <HeroSection />
        <HowItWorks />
        <CatalogSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>

      <footer className="border-t border-border/40 px-4 py-12 text-center">
        <div className="section-divider mb-8" />
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-tertiary">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-extrabold">AI Книга</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AI Книга. Все права защищены.
        </p>
      </footer>
    </div>
  );
}
