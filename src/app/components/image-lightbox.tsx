"use client";
import { useEffect, useCallback } from "react";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    },
    [onNext, onPrev, onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(63, 71, 81, 0.85)" }}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-[24px] right-[114px] w-[40px] h-[40px] flex items-center justify-center transition-opacity duration-200 hover:opacity-70 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Cerrar"
      >
        <img src="/images/cerrar.svg" alt="Cerrar" className="w-full h-full" />
      </button>

      {images.length > 1 && (
        <button
          type="button"
          className="absolute left-[54px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center transition-opacity duration-200 hover:opacity-70 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Imagen anterior"
        >
          <img
            src="/images/flecha-2.svg"
            alt="Anterior"
            className="w-full h-full"
          />
        </button>
      )}

      {images.length > 1 && (
        <button
          type="button"
          className="absolute right-[114px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center transition-opacity duration-200 hover:opacity-70 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Imagen siguiente"
        >
          <img
            src="/images/flecha-1.svg"
            alt="Siguiente"
            className="w-full h-full"
          />
        </button>
      )}

      <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 text-white text-[13px] font-light tracking-widest opacity-70 z-10">
        {currentIndex + 1} / {images.length}
      </div>

      <div
        className="relative flex items-center justify-center w-full h-full px-[80px] py-[60px]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
          style={{ maxWidth: "75vw", maxHeight: "80vh" }}
        />
      </div>
    </div>
  );
}

export default ImageLightbox;
