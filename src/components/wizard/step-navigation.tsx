"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  backHref?: string;
  nextHref?: string;
  onNext?: () => void | Promise<void>;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
}

export function StepNavigation({
  backHref,
  nextHref,
  onNext,
  nextLabel = "Далее",
  nextDisabled = false,
  loading = false,
}: StepNavigationProps) {
  const router = useRouter();

  const handleNext = async () => {
    if (onNext) {
      await onNext();
    }
    if (nextHref) {
      router.push(nextHref);
    }
  };

  return (
    <div className="flex items-center justify-between pt-8">
      {backHref ? (
        <Button variant="ghost" onClick={() => router.push(backHref)}>
          <ArrowLeft className="h-4 w-4" />
          Назад
        </Button>
      ) : (
        <div />
      )}

      <Button
        onClick={handleNext}
        disabled={nextDisabled || loading}
        loading={loading}
      >
        {nextLabel}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </Button>
    </div>
  );
}
