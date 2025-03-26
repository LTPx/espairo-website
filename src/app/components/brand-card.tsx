"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/navigation";
import { BranImagesWp } from "../_interfaces/wordpress-components";

interface BrandCardProps {
  images: BranImagesWp[];
  title?: string;
  description?: string;
  className?: string;
  urlBrand?: string;
  category?: string;
  index?: number;
  totalBrands?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onCategoryClick?: () => void;
}

function BrandCard(props: BrandCardProps) {
  const {
    images,
    title,
    description,
    urlBrand,
    category,
    index,
    totalBrands,
    onNext,
    onPrevious,
    onCategoryClick,
  } = props;

  const hasNext = index !== undefined && totalBrands && index < totalBrands - 1;
  const hasPrevious = index !== undefined && index > 0;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lastScrollTime = useRef<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: WheelEvent) => {
    if (!images || images.length <= 1) return;

    const now = Date.now();
    if (now - lastScrollTime.current < 1400) return;
    lastScrollTime.current = now;

    requestAnimationFrame(() => {
      setCurrentImageIndex((prevIndex) => {
        if (event.deltaY > 0) {
          return prevIndex < images.length - 1 ? prevIndex + 1 : 0;
        } else {
          return prevIndex > 0 ? prevIndex - 1 : images.length - 1;
        }
      });
    });
  };

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener("wheel", handleScroll);
      return () => {
        cardElement.removeEventListener("wheel", handleScroll);
      };
    }
  }, [images]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-[15px] lg:gap-[0px] lg:grid lg:grid-cols-2 lg:h-full overflow-hidden"
    >
      <div className={`group relative ${props.className}`}>
        <div className="relative w-full h-[500px] lg:h-full overflow-hidden">
          {images.map((image, i) => (
            <img
              key={i}
              src={image.image || ""}
              alt={`brand-image-${i}`}
              className={`absolute w-full h-full object-cover transition-all duration-700 ease-in-out ${
                i === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              loading="lazy"
            />
          ))}
        </div>
        <div className="absolute z-[10000] bottom-[30px] left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
                i === currentImageIndex
                  ? "bg-[#E0E0E0]"
                  : "border border-[#E0E0E0] bg-transparent"
              }`}
              onClick={() => setCurrentImageIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="pl-[30px] py-[30px] flex flex-col lg:justify-between">
        <div>
          {category && (
            <Link href={""} className="flex gap-[10px] pb-[50px]">
              <button
                onClick={onCategoryClick}
                className="bg-[#3F4751] text-white uppercase inline-block hover:text-white flex items-center justify-center font-regular text-[12px] leading-[20px] cursor-pointer h-[28px] px-[20px] rounded-full"
              >
                {category}
                <img
                  src={"/images/close-t.svg"}
                  className="h-[6px] w-[6px] ml-[10px]"
                  loading="lazy"
                />
              </button>
            </Link>
          )}
          <div className="flex flex-col pb-[22px]">
            <Link href={urlBrand || ""}>
              <h1 className="font-regular text-[40px] leading-[45px] lg:text-[50px] lg:leading-[50px] tracking-[-0.05em]">
                {title}
              </h1>
            </Link>
          </div>
          <div className="hidden lg:flex flex-col gap-[46px] pr-[75px]">
            {description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <Link href={urlBrand || ""} target="_blank">
            <span className="flex items-end font-regular text-[14px] leading-[14px] tracking-[-0.04em] underline">
              Página web
            </span>
          </Link>
          <div className="flex gap-[10px] lg:pr-[30px]">
            {hasPrevious && (
              <span
                className="flex items-end font-regular cursor-pointer text-[14px] leading-[14px] tracking-[-0.04em] underline"
                onClick={onPrevious}
              >
                Anterior
              </span>
            )}
            {hasNext && (
              <span
                className="flex items-end font-regular cursor-pointer text-[14px] leading-[14px] tracking-[-0.04em] underline"
                onClick={onNext}
              >
                Siguiente
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandCard;
