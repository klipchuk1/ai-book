"use client";

import { motion } from "framer-motion";
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
        <motion.button
          key={group.value}
          onClick={() => onChange(group.value)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            selected === group.value
              ? "border-2 border-primary bg-primary/10 text-primary-dark shadow-sm"
              : "border-2 border-transparent bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          }`}
        >
          {group.label}
        </motion.button>
      ))}
    </div>
  );
}
