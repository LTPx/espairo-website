"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/navigation";
import { BranImagesWp } from "../_interfaces/wordpress-components";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ImageLightbox } from "./image-lightbox";

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
  onMenu?: () => void;
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
    onMenu,
  } = props;

  const hasNext = index !== undefined && totalBrands && index < totalBrands - 1;
  const hasPrevious = index !== undefined && index > 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileDescriptionOpen, setIsMobileDescriptionOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lastScrollTime = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  const imageUrls =
    images?.map((img) => img.full_image?.url || img.image.url || "") ?? [];

  const isTouchDevice = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = (event: WheelEvent) => {
    if (isTouchDevice.current || !images || images.length <= 1) return;

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

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 50) {
      setCurrentImageIndex((prevIndex) => {
        if (deltaX > 0) {
          return prevIndex < images.length - 1 ? prevIndex + 1 : 0;
        } else {
          return prevIndex > 0 ? prevIndex - 1 : images.length - 1;
        }
      });
    }
  };

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      if (!isTouchDevice.current) {
        cardElement.addEventListener("wheel", handleScroll);
      } else {
        cardElement.addEventListener("touchstart", handleTouchStart);
        cardElement.addEventListener("touchend", handleTouchEnd);
      }
      return () => {
        cardElement.removeEventListener("wheel", handleScroll);
        cardElement.removeEventListener("touchstart", handleTouchStart);
        cardElement.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [images]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col h-[100dvh] gap-[15px] md:gap-[0px] md:grid md:grid-cols-2 md:h-full overflow-hidden"
    >
      <div
        className={`h-[100dvh] group relative flex flex-col gap-[30px] ${props.className}`}
      >
        <div className="md:hidden absolute top-[30px] left-[30px] z-[40]">
          <Link href={""}>
            <button
              onClick={onCategoryClick}
              className="backdrop-blur-sm border border-[#3F4751] h-[35px] px-[20px] text-[#3F4751] uppercase inline-block flex items-center justify-center font-regular text-[14px] leading-[20px] cursor-pointer rounded-full"
            >
              BRANDS
            </button>
          </Link>
        </div>

        <div className="relative w-full h-[85dvh] md:h-full overflow-hidden">
          {/* Mobile: swipe carousel */}
          {isMobile ? (
            <motion.div
              className="relative h-full flex w-full"
              initial={{ x: `-${currentImageIndex * 100}%` }}
              animate={{ x: `-${currentImageIndex * 100}%` }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 50,
              }}
            >
              {images &&
                images.map((image, i) => (
                  <motion.img
                    key={i}
                    src={image.image.url || ""}
                    alt={`brand-image-${i}`}
                    className="w-full h-full object-cover flex-shrink-0"
                    loading="lazy"
                  />
                ))}
            </motion.div>
          ) : (
            /* Desktop: crossfade + lightbox on click */
            images &&
            images.map((image, i) => (
              <img
                key={i}
                src={image.image.url || ""}
                alt={`brand-image-${i}`}
                className={`absolute w-full h-full object-cover transition-all duration-700 ease-in-out gallery-cursor ${
                  i === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                loading="lazy"
                onClick={() => {
                  setLightboxIndex(currentImageIndex);
                  setLightboxOpen(true);
                }}
              />
            ))
          )}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="hidden md:flex absolute z-[10000] bottom-[30px] left-1/2 transform -translate-x-1/2 gap-2">
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
        )}

        {/* Mobile title row */}
        <div className="md:hidden flex justify-between items-center px-[30px]">
          <h1 className="font-regular text-[40px] leading-[45px] md:text-[50px] md:leading-[50px] tracking-[-0.05em]">
            {title}
          </h1>
          <img
            src={"/images/open-brand.svg"}
            className="h-[25px] w-[25px]"
            loading="lazy"
            onClick={() => {
              setIsMobileDescriptionOpen(true);
              onCategoryClick && onCategoryClick();
            }}
          />
        </div>
      </div>

      {/* Desktop right panel */}
      <div className="hidden md:flex pl-[30px] py-[30px] flex flex-col md:justify-between">
        <div>
          {category && (
            <div className="flex items-center justify-between">
              <Link href={""} className="flex gap-[10px] w-auto">
                <button
                  onClick={onCategoryClick}
                  className="bg-[#3F4751] text-white uppercase inline-block hover:text-white flex items-center justify-center font-regular text-[12px] leading-[20px] cursor-pointer h-[28px] px-[20px] rounded-full"
                >
                  {category}
                </button>
              </Link>
              <img
                onClick={onCategoryClick}
                src={"/images/close-brands.svg"}
                className="cursor-pointer h-[18px] w-[18px] mr-[30px]"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex flex-col pt-[50px] pb-[22px]">
            <div className="flex">
              <Link target="_blank" href={urlBrand || ""}>
                <h1 className="font-regular text-[40px] leading-[45px] md:text-[50px] md:leading-[50px] tracking-[-0.05em]">
                  {title}
                </h1>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-[46px] md:pr-[30px] lg:pr-[30px] xl:pr-[75px]">
            {description && (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )}
            <div>
              <Link className="inline-block" href={`mailto:info@espairo.com`}>
                <button className="font-regular uppercase inline-block hover:bg-[#3F4751] hover:text-white flex items-center justify-center font-regular text-[14px] leading-[18px] cursor-pointer border border-[#3F4751] h-[35px] px-[20px] rounded-full transition-colors duration-300 ease-in-out">
                  {t("brandPage.information")}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          {urlBrand ? (
            <Link href={urlBrand || ""} target="_blank">
              <span className="flex items-end font-regular text-[14px] leading-[14px] tracking-[-0.04em] underline">
                {t("brandPage.web")}
              </span>
            </Link>
          ) : (
            <div></div>
          )}
          <div className="flex gap-[10px] md:pr-[30px]">
            {hasPrevious && (
              <span
                className="flex items-end font-regular cursor-pointer text-[14px] leading-[14px] tracking-[-0.04em] underline"
                onClick={onPrevious}
              >
                {t("brandPage.prev")}
              </span>
            )}
            {hasNext && (
              <span
                className="flex items-end font-regular cursor-pointer text-[14px] leading-[14px] tracking-[-0.04em] underline"
                onClick={onNext}
              >
                {t("brandPage.next")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile description drawer */}
      <AnimatePresence>
        {isMobileDescriptionOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-[#E0E0E0] flex flex-col justify-between p-[30px]"
            initial={{ translateY: "100%" }}
            animate={{ translateY: "0%" }}
            exit={{ translateY: "100%" }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 30,
            }}
          >
            <div className="flex flex-col">
              {category && (
                <div className="pb-[20px] flex">
                  <Link
                    href={""}
                    onClick={() => setIsMobileDescriptionOpen(false)}
                    className="flex gap-[10px]"
                  >
                    <button
                      onClick={onCategoryClick}
                      className="bg-[#3F4751] text-white uppercase inline-block hover:text-white flex items-center justify-center font-regular text-[14px] leading-[20px] cursor-pointer h-[35px] px-[20px] rounded-full"
                    >
                      {category}
                    </button>
                  </Link>
                </div>
              )}
              <div className="flex justify-between items-center">
                <h1 className="font-regular text-[40px] leading-[48px] tracking-[-0.05em]">
                  {title}
                </h1>
                <img
                  src={"/images/close-brand.svg"}
                  className="h-[25px] w-[25px]"
                  loading="lazy"
                  onClick={() => {
                    setIsMobileDescriptionOpen(false);
                    onMenu && onMenu();
                  }}
                />
              </div>
            </div>
            <div className="flex-grow overflow-auto mt-[30px]">
              {description && (
                <div
                  className="description-brand-mobile"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
              <div className="flex pt-[48px]">
                <Link className="inline-block" href={`mailto:info@espairo.com`}>
                  <button className="font-regular uppercase inline-block hover:bg-[#3F4751] hover:text-white flex items-center justify-center font-regular text-[14px] leading-[20px] cursor-pointer border border-[#3F4751] h-[35px] px-[20px] rounded-full transition-colors duration-300 ease-in-out">
                    {t("brandPage.information")}
                  </button>
                </Link>
              </div>
              {urlBrand && (
                <Link
                  className="absolute bottom-[70px] left-[30px]"
                  href={urlBrand || ""}
                  target="_blank"
                >
                  <span className="flex items-end font-regular text-[12px] leading-[20px] tracking-[-0.04em] underline">
                    {t("brandPage.web")}
                  </span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop lightbox */}
      {!isMobile && (
        <ImageLightbox
          images={imageUrls}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNext={() =>
            setLightboxIndex((prev) => (prev + 1) % imageUrls.length)
          }
          onPrev={() =>
            setLightboxIndex(
              (prev) => (prev - 1 + imageUrls.length) % imageUrls.length,
            )
          }
        />
      )}
    </div>
  );
}

export default BrandCard;
