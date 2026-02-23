"use client";

import type { AgeGroup } from "@/types/catalog";

const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: "2-4", label: "2-4 года" },
  { value: "5-7", label: "5-7 лет" },
  { value: "8-12", label: "8-12 лет" },
];

interface AgeGroupFilterProps {
  selected: AgeGroup;
  onChange: (group: AgeGroup) => void;
}

export function AgeGroupFilter({ selected, onChange }: AgeGroupFilterProps) {
  return (
    <div className="flex gap-2">
      {AGE_GROUPS.map((group) => (
        <button
          key={group.value}
          onClick={() => onChange(group.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === group.value
              ? "bg-primary text-white shadow-md"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          {group.label}
        </button>
      ))}
    </div>
  );
}
