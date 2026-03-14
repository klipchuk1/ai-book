"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { useWizard } from "@/components/wizard/wizard-provider";
import { cn } from "@/lib/utils";
import { Upload, X, CheckCircle, AlertCircle, ArrowRight, Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PhotoFile } from "@/types/wizard";

const MAX_PHOTOS = 3;
const MIN_PHOTOS = 2;
const MAX_SIZE_MB = 5;

export default function StartPage() {
  const { photos, setPhotos, childName, gender, age, setChildDetails } = useWizard();
  const router = useRouter();
  const [dragOver, setDragOver] = useState(false);

  const [name, setName] = useState(childName);
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | "">(gender);
  const [selectedAge, setSelectedAge] = useState<number | null>(age);

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

  const photosReady = photos.length >= MIN_PHOTOS;
  const detailsReady =
    name.trim().length >= 2 &&
    (selectedGender === "male" || selectedGender === "female") &&
    selectedAge !== null &&
    selectedAge >= 1 &&
    selectedAge <= 12;

  const canProceed = photosReady && detailsReady;

  function handleNext() {
    if (!canProceed) return;
    setChildDetails(name.trim(), selectedGender as "male" | "female", selectedAge!);
    router.push("/create/catalog");
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-extrabold">Создайте книгу</h1>
      <p className="mb-8 text-muted-foreground">
        Загрузите фотографии и заполните данные ребёнка
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Photos */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
              photosReady ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
            )}>
              {photosReady ? <CheckCircle className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
            </div>
            <h2 className="text-lg font-semibold">Фотографии</h2>
            <span className="text-sm text-muted-foreground">
              {photos.length}/{MAX_PHOTOS}
            </span>
          </div>

          {/* Drop zone */}
          {photos.length < MAX_PHOTOS && (
            <label
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-colors",
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
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="font-medium">Перетащите фото сюда</p>
              <p className="text-sm text-muted-foreground">или нажмите для выбора</p>
              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG, до {MAX_SIZE_MB}MB · мин. {MIN_PHOTOS} фото
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
            <div className="mt-4 grid grid-cols-3 gap-3">
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
                  <div className="absolute bottom-2 left-2">
                    {photo.faceDetected === true && (
                      <CheckCircle className="h-5 w-5 text-success drop-shadow" />
                    )}
                    {photo.faceDetected === false && (
                      <AlertCircle className="h-5 w-5 text-error drop-shadow" />
                    )}
                  </div>
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
        </div>

        {/* Right: Details */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
              detailsReady ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
            )}>
              {detailsReady ? <CheckCircle className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </div>
            <h2 className="text-lg font-semibold">Данные ребёнка</h2>
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium">Имя</label>
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
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium">Пол</label>
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
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium">Возраст</label>
            <div className="grid grid-cols-6 gap-2">
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
              Влияет на сложность текста и выбор книг
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          className="text-lg"
          disabled={!canProceed}
          onClick={handleNext}
        >
          Выбрать книгу
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {!canProceed && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {!photosReady && !detailsReady
            ? "Загрузите фото и заполните данные"
            : !photosReady
            ? `Загрузите минимум ${MIN_PHOTOS} фотографии`
            : "Заполните все поля"}
        </p>
      )}
    </div>
  );
}
