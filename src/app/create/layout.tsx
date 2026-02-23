import Link from "next/link";
import { BookOpen } from "lucide-react";
import { WizardProvider } from "@/components/wizard/wizard-provider";
import { ProgressBar } from "@/components/wizard/progress-bar";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WizardProvider>
      <div className="min-h-screen">
        {/* Minimal header */}
        <header className="flex items-center justify-center border-b border-border px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <BookOpen className="h-5 w-5 text-primary" />
            AI Книга
          </Link>
        </header>

        <ProgressBar />

        <div className="mx-auto max-w-2xl px-4 pb-12">{children}</div>
      </div>
    </WizardProvider>
  );
}
