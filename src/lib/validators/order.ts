import { z } from "zod";

export const childDetailsSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно быть не менее 2 символов")
    .max(50, "Имя слишком длинное"),
  gender: z.enum(["male", "female"], {
    message: "Выберите пол ребёнка",
  }),
  age: z
    .number({ message: "Укажите возраст" })
    .int()
    .min(1, "Минимальный возраст — 1 год")
    .max(12, "Максимальный возраст — 12 лет"),
});

export const bookSelectionSchema = z.object({
  bookId: z.string().min(1, "Выберите книгу"),
});

export type ChildDetails = z.infer<typeof childDetailsSchema>;
export type BookSelection = z.infer<typeof bookSelectionSchema>;
