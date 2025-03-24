"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { BranImagesWp } from "../_interfaces/wordpress-components";

interface BrandCardProps {
  images: BranImagesWp[];
  title?: string;
  date?: string;
  description?: string;
  className?: string;
  url?: string;
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
    urlBrand,
    title,
    className,
    date,
    description,
    url,
    category,
    index,
    totalBrands,
    onNext,
    images,
    onPrevious,
    onCategoryClick,
  } = props;

  const t = useTranslations();
  const hasNext = index !== undefined && totalBrands && index < totalBrands - 1;
  const hasPrevious = index !== undefined && index > 0; // Lógica para saber si hay un elemento anterior
  const [visibleImages, setVisibleImages] = useState<string[]>([
    images[0].image || "",
  ]);

  return (
    <div className="flex flex-col gap-[15px] lg:gap-[0px] lg:grid lg:grid-cols-2 lg:h-full">
      <Link href={url || ""} className={`group relative ${className}`}>
        {visibleImages.map((imageSrc, index) => (
          <img
            key={index}
            src={imageSrc}
            alt={`brand-image-${index}`}
            className={`lg:absolute top-0 left-0 h-[500px] lg:h-full w-full object-cover transition-opacity duration-500 ease-in-out transform lazy-load`}
            loading="lazy"
          />
        ))}
      </Link>
      <div className="pl-[30px] pr-[75px] py-[50px] flex flex-col lg:justify-between">
        <div>
          {category && (
            <Link className="inline-block pb-[40px]" href={url || ""}>
              <button
                onClick={onCategoryClick}
                className="bg-[#3F4751] text-white uppercase inline-block hover:bg-black hover:text-white flex items-center justify-center font-mediumFont text-[12px] leading-[20px] cursor-pointer border border-black h-[28px] px-[20px] rounded-full transition-colors duration-300 ease-in-out"
              >
                {category}
              </button>
            </Link>
          )}
          <div className="flex flex-col pb-[22px]">
            <Link href={url || ""}>
              <h1 className="font-mediumFont text-[40px] leading-[45px] lg:text-[50px] lg:leading-[50px] tracking-[-0.05em]">
                {title}
                <br />
                <span className="opacity-30">{date}</span>
              </h1>
            </Link>
          </div>
          <div className="hidden lg:flex flex-col gap-[46px]">
            {description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
            <Link className="inline-block" href={url || ""}>
              <button className="uppercase inline-block hover:bg-[#3F4751] hover:text-white flex items-center justify-center font-mediumFont text-[14px] leading-[18px] cursor-pointer border border-[#3F4751] h-[35px] px-[20px] rounded-full transition-colors duration-300 ease-in-out">
                SOLICITA INFORMACIÓN
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between">
          <Link href={urlBrand || ""} target="_blank">
            <span className="text-[14px] leading-[14px] tracking-[-0.04em] underline">
              Página web
            </span>
          </Link>
          <div className="flex gap-[10px]">
            {hasPrevious && (
              <span
                className="cursor-pointer text-[14px] leading-[14px] tracking-[-0.04em] underline"
                onClick={onPrevious}
              >
                Anterior
              </span>
            )}
            {hasNext && (
              <span
                className="cursor-pointer text-[14px] leading-[14px] tracking-[-0.04em] underline"
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
