export type AgeGroup = "2-4" | "5-7" | "8-12";

export type Gender = "male" | "female";

export interface ChapterPage {
  type: "text" | "illustration";
  text?: string;
  promptMale?: string;
  promptFemale?: string;
  faceRequired: boolean;
}

export interface BookChapter {
  id: string;
  title: string;
  pages: ChapterPage[];
}

export interface BookTemplate {
  id: string;
  seriesId: string;
  seriesPosition: number;
  title: string;
  subtitle?: string;
  description: string;
  ageGroups: AgeGroup[];
  coverPromptMale: string;
  coverPromptFemale: string;
  chapters: BookChapter[];
  nextBookTeaser?: string;
  priceRub: number;
}

export interface BookSeries {
  id: string;
  title: string;
  description: string;
  bookIds: string[];
}
