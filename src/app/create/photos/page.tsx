"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { useWizard } from "@/components/wizard/wizard-provider";
import { StepNavigation } from "@/components/wizard/step-navigation";
import { cn } from "@/lib/utils";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import type { PhotoFile } from "@/types/wizard";

const MAX_PHOTOS = 3;
const MIN_PHOTOS = 2;
const MAX_SIZE_MB = 5;

export default function PhotosPage() {
  const { photos, setPhotos } = useWizard();
  const router = useRouter();
  const [dragOver, setDragOver] = useState(false);

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const newPhotos: PhotoFile[] = [];
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        if (photos.length + newPhotos.length >= MAX_PHOTOS) break;
        if (!file.type.startsWith("image/")) continue;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) continue;

        newPhotos.push({
          id: uuid(),
          file,
          previewUrl: URL.createObjectURL(file),
          faceDetected: null,
          uploading: false,
          uploadedUrl: null,
        });
      }

      if (newPhotos.length > 0) {
        setPhotos([...photos, ...newPhotos]);
      }
    },
    [photos, setPhotos]
  );

  const removePhoto = useCallback(
    (id: string) => {
      const photo = photos.find((p) => p.id === id);
      if (photo) URL.revokeObjectURL(photo.previewUrl);
      setPhotos(photos.filter((p) => p.id !== id));
    },
    [photos, setPhotos]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const canProceed = photos.length >= MIN_PHOTOS;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Загрузите фотографии</h1>
      <p className="mb-6 text-muted-foreground">
        Загрузите {MIN_PHOTOS}-{MAX_PHOTOS} фотографии ребёнка. Лучше всего подойдут
        фото лица с разных ракурсов.
      </p>

      {/* Drop zone */}
      {photos.length < MAX_PHOTOS && (
        <label
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors",
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-medium">Перетащите фото сюда</p>
          <p className="text-sm text-muted-foreground">или нажмите для выбора</p>
          <p className="mt-2 text-xs text-muted-foreground">
            JPG, PNG, до {MAX_SIZE_MB}MB
          </p>
          <input
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      )}

      {/* Photo previews */}
      {photos.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border"
            >
              <img
                src={photo.previewUrl}
                alt="Фото ребёнка"
                className="h-full w-full object-cover"
              />

              {/* Status indicator */}
              <div className="absolute bottom-2 left-2">
                {photo.faceDetected === true && (
                  <CheckCircle className="h-5 w-5 text-success drop-shadow" />
                )}
                {photo.faceDetected === false && (
                  <AlertCircle className="h-5 w-5 text-error drop-shadow" />
                )}
              </div>

              {/* Remove button */}
              <button
                onClick={() => removePhoto(photo.id)}
                className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Photo count indicator */}
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Загружено: {photos.length} из {MAX_PHOTOS} (минимум {MIN_PHOTOS})
      </p>

      <StepNavigation
        nextHref="/create/details"
        nextDisabled={!canProceed}
      />
    </div>
  );
}
