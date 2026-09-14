"use client";

import Image from "next/image";
import { useState } from "react";

interface FullProject {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const PROJECTS: FullProject[] = [
  {
    id: "1",
    title: "Квартира під оренду, 52 m²",
    description: "Стандартний ремонт · 6 тижнів · 45 000 zł",
    images: ["/images/projects/project-1-1.jpg", "/images/projects/project-1-2.jpg"],
  },
  {
    id: "2",
    title: "Сімейна квартира, 74 m²",
    description: "Дизайн-ремонт · 8 тижнів · 68 000 zł",
    images: ["/images/projects/project-2-1.jpg", "/images/projects/project-2-2.jpg"],
  },
  {
    id: "3",
    title: "Пентхаус, 96 m²",
    description: "Преміум-ремонт · 10 тижнів · 92 000 zł",
    images: ["/images/projects/project-3-1.jpg"],
  },
];

function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        ✕
      </button>

      <button
        type="button"
        onClick={() => onNavigate((index - 1 + images.length) % images.length)}
        aria-label="Previous image"
        className="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        ←
      </button>

      <div className="relative h-[80vh] w-full max-w-4xl">
        <Image src={images[index]} alt="" fill className="object-contain" />
      </div>

      <button
        type="button"
        onClick={() => onNavigate((index + 1) % images.length)}
        aria-label="Next image"
        className="absolute right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        →
      </button>
    </div>
  );
}

export function ProjectsGrid() {
  const [lightbox, setLightbox] = useState<{ projectId: string; index: number } | null>(null);

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="flex flex-col gap-16">
        {PROJECTS.map((project) => (
          <article key={project.id} className="sticky top-24">
            <h3 className="mb-1 text-xl font-semibold">{project.title}</h3>
            <p className="mb-4 text-sm text-brand-dark/60">{project.description}</p>

            <div className="grid grid-cols-2 gap-3 desktop:grid-cols-4">
              {project.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setLightbox({ projectId: project.id, index })}
                  className="relative aspect-square overflow-hidden rounded-xl"
                >
                  <Image src={image} alt="" fill className="object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      {lightbox &&
        (() => {
          const project = PROJECTS.find((p) => p.id === lightbox.projectId)!;
          return (
            <GalleryLightbox
              images={project.images}
              index={lightbox.index}
              onClose={() => setLightbox(null)}
              onNavigate={(index) => setLightbox({ projectId: project.id, index })}
            />
          );
        })()}
    </section>
  );
}
