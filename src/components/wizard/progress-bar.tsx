"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { WIZARD_STEPS } from "@/types/wizard";
import { Check } from "lucide-react";

function getStepIndex(pathname: string): number {
  // Exact match first
  const exact = WIZARD_STEPS.findIndex((s) => s.path === pathname);
  if (exact !== -1) return exact;

  // Sub-page mapping
  if (pathname.startsWith("/create/book/")) return 1; // catalog step
  if (pathname === "/create/preview") return 2;
  if (pathname === "/create/payment-result") return WIZARD_STEPS.length; // all done

  return -1;
}

export function ProgressBar() {
  const pathname = usePathname();
  const currentIndex = getStepIndex(pathname);

  // Hide on payment-result (all steps done)
  if (currentIndex > WIZARD_STEPS.length - 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-6 sm:gap-4">
      {WIZARD_STEPS.map((step, i) => {
        const isCompleted = currentIndex > -1 && i < currentIndex;
        const isCurrent = i === currentIndex;

        return (
          <div key={step.path} className="flex items-center gap-2 sm:gap-4">
            {i > 0 && (
              <div
                className={cn(
                  "h-0.5 w-6 sm:w-12",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  isCompleted && "bg-primary text-white",
                  isCurrent && "bg-primary text-white ring-4 ring-primary/20",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : step.number}
              </div>
              <span
                className={cn(
                  "hidden text-xs sm:block",
                  isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
