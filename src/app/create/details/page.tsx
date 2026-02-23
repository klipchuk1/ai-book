"use client";

import { useWizard } from "@/components/wizard/wizard-provider";
import { StepNavigation } from "@/components/wizard/step-navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function DetailsPage() {
  const { childName, gender, age, setChildDetails } = useWizard();
  const [name, setName] = useState(childName);
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | "">(gender);
  const [selectedAge, setSelectedAge] = useState<number | null>(age);

  const canProceed =
    name.trim().length >= 2 &&
    (selectedGender === "male" || selectedGender === "female") &&
    selectedAge !== null &&
    selectedAge >= 1 &&
    selectedAge <= 12;

  const handleNext = () => {
    if (canProceed) {
      setChildDetails(name.trim(), selectedGender as "male" | "female", selectedAge!);
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Данные ребёнка</h1>
      <p className="mb-8 text-muted-foreground">
        Эти данные используются для персонализации сказок.
      </p>

      {/* Name */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Имя ребёнка</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например, Ева"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          maxLength={50}
        />
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Пол</label>
        <div className="grid grid-cols-2 gap-3">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setSelectedGender(g)}
              className={cn(
                "rounded-xl border-2 px-4 py-3 text-center font-medium transition-all",
                selectedGender === g
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30"
              )}
            >
              {g === "male" ? "Мальчик" : "Девочка"}
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Возраст</label>
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setSelectedAge(a)}
              className={cn(
                "rounded-lg border-2 py-2 text-center text-sm font-medium transition-all",
                selectedAge === a
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30"
              )}
            >
              {a}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Возраст влияет на сложность текста сказок
        </p>
      </div>

      <StepNavigation
        backHref="/create/photos"
        nextHref="/create/catalog"
        onNext={handleNext}
        nextDisabled={!canProceed}
      />
    </div>
  );
}
