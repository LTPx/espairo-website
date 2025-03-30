"use client";
import React, { useState, useEffect } from "react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
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

  const nextImage = () => {
    setPhotoIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setPhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const processedIds = new Set<number>();

  return (
    <section className="content-wrapper flex flex-col gap-[15px]">
      {!isMobile &&
        gallery.map((item, index) => {
          const { layout, image } = item;
          if (processedIds.has(image.ID)) {
            return null;
          }
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
                  className="col-span-1"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    className="object-cover object-center lg:rounded-[0px] h-[300px] md:h-[500px] lg:h-[800px] w-full"
                    alt={`Gallery image ${index + 1}`}
                    data-fancybox="gallery"
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
                  className="col-span-2 lg:col-span-1"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    className="object-cover object-center lg:rounded-[0px] h-[450px] md:h-[500px] lg:h-[1001px] w-full"
                    alt={`Gallery image ${index + 1}`}
                    data-fancybox="gallery"
                  />
                </button>
                <button
                  type="button"
                  className="col-span-2 lg:col-span-1"
                  onClick={() => openLightbox(index + 1)}
                >
                  <img
                    src={gallery[index + 1].image.url}
                    className="object-cover object-center lg:rounded-[0px] h-[450px] md:h-[500px] lg:h-[1001px] w-full"
                    alt={`Gallery image ${index + 2}`}
                    data-fancybox="gallery"
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
                  className="col-span-2 lg:col-span-1"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    className="object-cover object-center lg:rounded-[0px] h-[450px] md:h-[500px] lg:h-[1001px] w-full"
                    alt={`Gallery image ${index + 1}`}
                    data-fancybox="gallery"
                  />
                </button>
                <div className="col-span-2 lg:col-span-1"></div>
              </div>
            );
          }
          return null;
        })}
      {isMobile && (
        <div className="relative">
          <img
            src={gallery[photoIndex].image.url}
            className="object-cover object-center lg:rounded-[0px] h-[578px] md:h-[500px] lg:h-[800px] w-full"
            alt={`Gallery image ${photoIndex + 1}`}
          />
          
          {photoIndex > 0 && (
            <img
              src={"/images/left-project.svg"}
              className="absolute left-[25px] top-1/2 transform -translate-y-1/2 text-white"
              loading="lazy"
              onClick={prevImage}
            />
          )}
          {photoIndex < gallery.length - 1 && (
            <img
              src={"/images/right-project.svg"}
              className="absolute right-[25px] top-1/2 transform -translate-y-1/2 text-white"
              loading="lazy"
              onClick={nextImage}
            />
          )}
        </div>
      )}
      {!isMobile && isOpen && (
        <Lightbox
          mainSrc={gallery[photoIndex].image.url}
          nextSrc={gallery[(photoIndex + 1) % gallery.length].image.url}
          prevSrc={
            gallery[(photoIndex + gallery.length - 1) % gallery.length].image
              .url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMoveNextRequest={nextImage}
          onMovePrevRequest={prevImage}
        />
      )}
    </section>
  );
}

export default Gallery;
