import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CatalogSection } from "@/components/landing/catalog-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CTASection } from "@/components/landing/cta-section";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-2 text-xl font-bold">
          <BookOpen className="h-6 w-6 text-primary" />
          AI Книга
        </div>
      </header>

      <main>
        <HeroSection />
        <CatalogSection />
        <HowItWorks />
        <PricingSection />
        <CTASection />
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <p>AI Книга &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
