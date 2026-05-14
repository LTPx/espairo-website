"use client";
import React, { useState, useEffect, useCallback } from "react";
import { GalleryProjectWp } from "../_interfaces/wordpress-components";

export interface GalleryProps {
  gallery: GalleryProjectWp[];
}

export function Gallery({ gallery }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const nextImage = useCallback(() => {
    setPhotoIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const prevImage = useCallback(() => {
    setPhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, nextImage, prevImage, closeLightbox]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const processedIds = new Set<number>();

  return (
    <section className="content-wrapper flex flex-col gap-[15px]">
      {!isMobile &&
        gallery.map((item, index) => {
          const { layout, image } = item;
          if (processedIds.has(image.ID)) return null;

          if (layout === "full-width") {
            processedIds.add(image.ID);
            return (
              <div
                key={image.ID}
                data-aos="fade-up"
                className="grid grid-cols-1 gap-[15px]"
              >
                <button
                  type="button"
                  className="col-span-1 relative overflow-hidden gallery-cursor"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    className="object-cover object-center lg:rounded-[0px] h-[300px] md:h-[500px] lg:h-[800px] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    alt={`Gallery image ${index + 1}`}
                  />
                </button>
              </div>
            );
          }

          if (
            layout === "half-width" &&
            gallery[index + 1]?.layout === "half-width"
          ) {
            processedIds.add(image.ID);
            processedIds.add(gallery[index + 1].image.ID);
            return (
              <div
                key={image.ID}
                data-aos="fade-up"
                className="grid grid-cols-2 gap-[15px]"
              >
                <button
                  type="button"
                  className="col-span-2 lg:col-span-1 group relative overflow-hidden gallery-cursor"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    className="object-cover object-center lg:rounded-[0px] h-[450px] md:h-[500px] lg:h-[1001px] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    alt={`Gallery image ${index + 1}`}
                  />
                </button>
                <button
                  type="button"
                  className="col-span-2 lg:col-span-1 group relative overflow-hidden gallery-cursor"
                  onClick={() => openLightbox(index + 1)}
                >
                  <img
                    src={gallery[index + 1].image.url}
                    className="object-cover object-center lg:rounded-[0px] h-[450px] md:h-[500px] lg:h-[1001px] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    alt={`Gallery image ${index + 2}`}
                  />
                </button>
              </div>
            );
          }

          if (
            layout === "half-width" &&
            gallery[index + 1]?.layout !== "half-width"
          ) {
            processedIds.add(image.ID);
            return (
              <div
                key={image.ID}
                data-aos="fade-up"
                className="grid grid-cols-2 gap-[15px]"
              >
                <button
                  type="button"
                  className="col-span-2 lg:col-span-1 group relative overflow-hidden gallery-cursor"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    className="object-cover object-center lg:rounded-[0px] h-[450px] md:h-[500px] lg:h-[1001px] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    alt={`Gallery image ${index + 1}`}
                  />
                </button>
                <div className="col-span-2 lg:col-span-1" />
              </div>
            );
          }

          return null;
        })}

      {isMobile && (
        <div className="relative">
          <img
            data-aos="fade-up"
            src={gallery[photoIndex].image.url}
            className="object-cover object-center h-[578px] md:h-[500px] w-full"
            alt={`Gallery image ${photoIndex + 1}`}
          />
          {photoIndex > 0 && (
            <img
              src="/images/left-project.svg"
              className="absolute left-[25px] top-1/2 -translate-y-1/2 cursor-pointer"
              loading="lazy"
              onClick={prevImage}
              alt="Previous"
            />
          )}
          {photoIndex < gallery.length - 1 && (
            <img
              src="/images/right-project.svg"
              className="absolute right-[25px] top-1/2 -translate-y-1/2 cursor-pointer"
              loading="lazy"
              onClick={nextImage}
              alt="Next"
            />
          )}
        </div>
      )}

      {!isMobile && isOpen && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(63, 71, 81, 0.85)" }}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute top-[24px] right-[24px] w-[40px] h-[40px] flex items-center justify-center transition-opacity duration-200 hover:opacity-70 z-10"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Cerrar"
          >
            <img
              src="/images/cerrar.svg"
              alt="Cerrar"
              className="w-full h-full"
            />
          </button>

          {gallery.length > 1 && (
            <button
              type="button"
              className="absolute left-[114px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center transition-opacity duration-200 hover:opacity-70 z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
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

          {gallery.length > 1 && (
            <button
              type="button"
              className="absolute right-[24px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center transition-opacity duration-200 hover:opacity-70 z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
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
            {photoIndex + 1} / {gallery.length}
          </div>

          <div
            className="relative flex items-center justify-center w-full h-full px-[80px] py-[60px]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[photoIndex].image.url}
              alt={`Gallery image ${photoIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              style={{ maxWidth: "75vw", maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
