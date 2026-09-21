"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MAX_UPLOAD_FILES, MAX_UPLOAD_SIZE_BYTES } from "@/lib/constants";

export function FileUpload({ onChange }: { onChange?: (files: File[]) => void }) {
  const t = useTranslations("leadFormUpload");
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const update = (next: File[]) => {
    setFiles(next);
    onChange?.(next);
  };

  const acceptFiles = (candidates: FileList | null | undefined) => {
    if (!candidates?.length) return;
    const next = [...files];
    let nextError: string | null = null;
    for (const candidate of Array.from(candidates)) {
      if (next.length >= MAX_UPLOAD_FILES) {
        nextError = t("tooManyFiles");
        break;
      }
      if (candidate.size > MAX_UPLOAD_SIZE_BYTES) {
        nextError = t("fileTooLarge");
        continue;
      }
      next.push(candidate);
    }
    setError(nextError);
    update(next);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setError(null);
    update(files.filter((_, i) => i !== index));
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
          acceptFiles(event.dataTransfer.files);
        }}
        className={`flex min-h-19.5 items-center justify-center rounded-xl border border-dashed px-4 text-sm transition-colors hover:border-brand-red ${
          isDragging ? "border-brand-red bg-brand-gray" : "border-brand-dark/20"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(event) => acceptFiles(event.target.files)}
        />

        {files.length === 0 ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-19.5 w-full flex-col items-center justify-center gap-1 text-center text-foreground hover:text-brand-dark"
          >
            <Image src="/icons/file.svg" alt="" width={24} height={24} className="h-6 w-6" />
            <span className="text-sm font-light">{t("uploadLabel")}</span>
          </button>
        ) : (
          <div className="flex w-full flex-col gap-1 py-2">
            <ul className="flex max-h-[84px] flex-col gap-1 overflow-y-auto">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate font-medium">
                    {file.name}{" "}
                    <span className="text-xs font-normal text-brand-dark/50">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="shrink-0 text-xs text-brand-red"
                  >
                    [ {t("remove")} ]
                  </button>
                </li>
              ))}
            </ul>
            {files.length < MAX_UPLOAD_FILES && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="self-start text-xs text-brand-red"
              >
                {t("addMore")}
              </button>
            )}
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
