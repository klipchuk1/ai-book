export interface PhotoFile {
  id: string;
  file: File;
  previewUrl: string;
  faceDetected: boolean | null;
  uploading: boolean;
  uploadedUrl: string | null;
}

export interface PreviewImage {
  base64: string;
  mimeType: string;
  label: string;
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
  previewImages: PreviewImage[];
}

export const WIZARD_STEPS = [
  { path: "/create/start", label: "Фото и данные", number: 1 },
  { path: "/create/catalog", label: "Выбор книги", number: 2 },
  { path: "/create/preview", label: "Превью", number: 3 },
] as const;

export type WizardStep = (typeof WIZARD_STEPS)[number];
