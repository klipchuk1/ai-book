"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { WIZARD_STEPS } from "@/types/wizard";
import { Check } from "lucide-react";

export function ProgressBar() {
  const pathname = usePathname();
  const currentIndex = WIZARD_STEPS.findIndex((s) => s.path === pathname);

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-6 sm:gap-4">
      {WIZARD_STEPS.map((step, i) => {
        const isCompleted = i < currentIndex;
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
