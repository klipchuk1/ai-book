"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { v4 as uuid } from "uuid";
import type { WizardState, PhotoFile, PreviewImage } from "@/types/wizard";

interface WizardContextValue extends WizardState {
  setPhotos: (photos: PhotoFile[]) => void;
  setChildDetails: (name: string, gender: "male" | "female", age: number) => void;
  setSelectedBook: (bookId: string) => void;
  setOrderId: (id: string) => void;
  setPaymentId: (id: string) => void;
  setPreviewImages: (images: PreviewImage[]) => void;
  reset: () => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

const STORAGE_KEY = "aibook-wizard-v2";

function getInitialState(): WizardState {
  if (typeof window !== "undefined") {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...parsed, photos: [] };
      }
    } catch {
      // ignore
    }
  }
  return {
    photos: [],
    childName: "",
    gender: "",
    age: null,
    selectedBookId: null,
    sessionId: uuid(),
    orderId: null,
    paymentId: null,
    previewImages: [],
  };
}

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(getInitialState);

  useEffect(() => {
    const { photos, previewImages, ...rest } = state;
    const photoMeta = photos.map((p) => ({
      id: p.id,
      previewUrl: p.previewUrl,
      faceDetected: p.faceDetected,
      uploadedUrl: p.uploadedUrl,
    }));
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...rest, photoMeta, previewImages })
    );
  }, [state]);

  const setPhotos = useCallback((photos: PhotoFile[]) => {
    setState((s) => ({ ...s, photos }));
  }, []);

  const setChildDetails = useCallback(
    (childName: string, gender: "male" | "female", age: number) => {
      setState((s) => ({ ...s, childName, gender, age }));
    },
    []
  );

  const setSelectedBook = useCallback((selectedBookId: string) => {
    setState((s) => ({ ...s, selectedBookId }));
  }, []);

  const setOrderId = useCallback((orderId: string) => {
    setState((s) => ({ ...s, orderId }));
  }, []);

  const setPaymentId = useCallback((paymentId: string) => {
    setState((s) => ({ ...s, paymentId }));
  }, []);

  const setPreviewImages = useCallback((previewImages: PreviewImage[]) => {
    setState((s) => ({ ...s, previewImages }));
  }, []);

  const reset = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState({
      photos: [],
      childName: "",
      gender: "",
      age: null,
      selectedBookId: null,
      sessionId: uuid(),
      orderId: null,
      paymentId: null,
      previewImages: [],
    });
  }, []);

  return (
    <WizardContext.Provider
      value={{
        ...state,
        setPhotos,
        setChildDetails,
        setSelectedBook,
        setOrderId,
        setPaymentId,
        setPreviewImages,
        reset,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
