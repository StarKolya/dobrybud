"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MAX_UPLOAD_SIZE_BYTES } from "@/lib/constants";

export function FileUpload({ onChange }: { onChange?: (file: File | null) => void }) {
  const t = useTranslations("leadFormUpload");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptFile = (candidate: File | undefined) => {
    if (!candidate) return;
    if (candidate.size > MAX_UPLOAD_SIZE_BYTES) {
      setError(t("fileTooLarge"));
      return;
    }
    setError(null);
    setFile(candidate);
    onChange?.(candidate);
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          acceptFile(event.dataTransfer.files[0]);
        }}
        className={`flex h-19.5 items-center justify-center rounded-xl border border-dashed px-4 text-sm transition-colors hover:border-brand-red ${
          isDragging ? "border-brand-red bg-brand-gray" : "border-brand-dark/20"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(event) => acceptFile(event.target.files?.[0])}
        />

        {!file ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-1 text-center text-foreground hover:text-brand-dark"
          >
            <Image src="/icons/file.svg" alt="" width={24} height={24} className="h-6 w-6" />
            <span className="text-sm font-light">{t("uploadLabel")}</span>
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-xs text-brand-dark/50">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
            <button type="button" onClick={removeFile} className="text-xs text-brand-red">
              [ {t("remove")} ]
            </button>
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-2 text-xs text-brand-red">{error}</p>
      ) : (
        <p className="mt-1 text-xs font-light text-foreground">{t("helperText")}</p>
      )}
    </div>
  );
}
