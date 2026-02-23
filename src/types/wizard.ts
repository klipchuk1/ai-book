export interface PhotoFile {
  id: string;
  file: File;
  previewUrl: string;
  faceDetected: boolean | null;
  uploading: boolean;
  uploadedUrl: string | null;
}

export interface WizardState {
  photos: PhotoFile[];
  childName: string;
  gender: "male" | "female" | "";
  age: number | null;
  selectedBookId: string | null;
  sessionId: string;
  orderId: string | null;
  paymentId: string | null;
}

export const WIZARD_STEPS = [
  { path: "/create/photos", label: "Фотографии", number: 1 },
  { path: "/create/details", label: "Данные ребёнка", number: 2 },
  { path: "/create/catalog", label: "Выбор книги", number: 3 },
] as const;

export type WizardStep = (typeof WIZARD_STEPS)[number];
