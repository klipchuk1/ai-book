import type { AgeGroup, BookTemplate } from "@/types/catalog";
import { magicForest1 } from "./magic-forest-1";

export const BOOK_CATALOG: BookTemplate[] = [magicForest1];

export function getBookById(id: string): BookTemplate | undefined {
  return BOOK_CATALOG.find((b) => b.id === id);
}

export function getBooksByAgeGroup(ageGroup: AgeGroup): BookTemplate[] {
  return BOOK_CATALOG.filter((b) => b.ageGroups.includes(ageGroup));
}

export function getAgeGroup(age: number): AgeGroup {
  if (age <= 4) return "2-4";
  if (age <= 7) return "5-7";
  return "8-12";
}
