"use client";
import React, { useState } from "react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
import { GalleryProjectWp } from "../_interfaces/wordpress-components";

export interface GalleryProps {
  gallery: GalleryProjectWp[];
}

export function Gallery({ gallery }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const processedIds = new Set<number>();

  return (
    <section className="content-wrapper flex flex-col gap-[15px]">
      {gallery.map((item, index) => {
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

      {isOpen && (
        <Lightbox
          mainSrc={gallery[photoIndex].image.url}
          nextSrc={gallery[(photoIndex + 1) % gallery.length].image.url}
          prevSrc={
            gallery[(photoIndex + gallery.length - 1) % gallery.length].image
              .url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % gallery.length)
          }
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length)
          }
        />
      )}
    </section>
  );
}

export default Gallery;
