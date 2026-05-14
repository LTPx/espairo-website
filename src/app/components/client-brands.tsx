"use client";

import { forwardRef, useState } from "react";
import { BrandsPageWp, BrandsWp } from "../_interfaces/wordpress-components";
import { useTranslations } from "next-intl";
import { ImageLightbox } from "./image-lightbox";

interface ClientBrandsProps {
  categories: { term_id: number; name: string }[];
  onBrandClick: (selectedBrand: BrandsWp) => void;
  brands_information: BrandsPageWp;
  onCategorySelect: (category: number | null) => void;
}

const ClientBrands = forwardRef<HTMLDivElement, ClientBrandsProps>(
  ({ categories, onBrandClick, brands_information, onCategorySelect }, ref) => {
    const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
    const initialCategory =
      brands_information.cover_categories[0]?.category || null;
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
      initialCategory,
    );
    const t = useTranslations();

    const filteredBrands =
      selectedCategory === null
        ? brands_information.brand
        : brands_information.brand.filter(
            (brand) => brand.category_brand.term_id === selectedCategory,
          );

    const selectedCover = selectedCategory
      ? brands_information.cover_categories.find(
          (cover) => cover.category === selectedCategory,
        )?.image_cover.url || brands_information.cover_page.url
      : brands_information.cover_page.url;

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const coverUrls = brands_information.cover_categories
      .map((c) => c.image_cover.url)
      .filter(Boolean);

    return (
      <div
        ref={ref}
        className="brands flex flex-col gap-[20px] md:gap-[0px] md:grid md:grid-cols-2 h-[100dvh] overflow-auto"
      >
        <div className="hidden md:block md:h-[calc(100dvh)]">
          <img
            src={selectedCover}
            alt="alt-projects"
            className="h-[100dvh] w-full object-cover gallery-cursor"
            onClick={() => {
              const idx = coverUrls.indexOf(selectedCover);
              setLightboxIndex(idx >= 0 ? idx : 0);
              setLightboxOpen(true);
            }}
          />
        </div>
        <div className="h-[100dvh] overflow-auto no-scrollbar">
          <div className="pl-[30px] md:px-[30px] py-[30px]">
            <div className="w-full sticky top-[30px] z-[10] md:z-[100000]">
              <div className="filters pr-[30px] flex md:flex-wrap gap-[7px] md:gap-[10px] mb-[20px] md:mb-[30px] md:pr-[10px] mac:pr-[100px] xl-flex:pr-[50px] xl:pr-[50px] overflow-x-scroll no-scrollbar">
                {/* <button
                onClick={() => {
                  setSelectedCategory(null);
                  onCategorySelect(null);
                }}
                className={`backdrop-blur-sm font-regular uppercase inline-block flex items-center md:items-start justify-center font-medium text-[14px] leading-[20px] md:text-[12px] md:leading-[28px] cursor-pointer border border-[#3F4751] h-[28px] px-[20px] rounded-full transition-colors duration-300 ease-in-out ${
                  selectedCategory === null
                    ? "bg-[#3F4751] text-white"
                    : "hover:bg-[#3F4751] hover:text-white"
                }`}
              >
                {t("brandPage.all")}
              </button> */}
                {brands_information.cover_categories.map((cover) => {
                  const categoryData = categories.find(
                    (cat) => cat.term_id === cover.category,
                  );
                  if (
                    !categoryData ||
                    categoryData.term_id === 1 ||
                    categoryData.term_id === 8
                  )
                    return null;
                  const isSelected = selectedCategory === categoryData.term_id;

                  return (
                    <button
                      key={categoryData.term_id}
                      onClick={() => {
                        const newCategory = isSelected
                          ? null
                          : categoryData.term_id;
                        setSelectedCategory(newCategory);
                        onCategorySelect(newCategory);
                      }}
                      className={`backdrop-blur-sm font-regular items-center md:items-start uppercase inline-block flex justify-center font-medium text-[14px] leading-[20px] md:text-[12px] md:leading-[28px] cursor-pointer border border-[#3F4751] h-[28px] px-[20px] rounded-full transition-colors duration-300 ease-in-out ${
                        isSelected
                          ? "bg-[#3F4751] text-white"
                          : "hover:bg-[#3F4751] hover:text-white"
                      }`}
                    >
                      {categoryData.name}
                    </button>
                  );
                })}
              </div>
            </div>
            {(selectedCategory === 1 || selectedCategory === null) &&
              brands_information.description && (
                <div
                  className="hidden lg:block md:pr-[40px] xl:pr-[143px] pb-[30px]"
                  dangerouslySetInnerHTML={{
                    __html: brands_information.description,
                  }}
                />
              )}
            <div className="flex flex-col">
              {filteredBrands.map((brand, index) => (
                <h2
                  key={index}
                  className={`font-regular cursor-pointer text-[#3F4751] text-[40px] leading-[48px] md:text-[50px] md:leading-[58px] tracking-[-0.05em] transition-all duration-300 w-fit ${
                    hoveredBrand && hoveredBrand !== brand.title
                      ? "blur-sm opacity-50"
                      : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredBrand(brand.title)}
                  onMouseLeave={() => setHoveredBrand(null)}
                  onClick={() => onBrandClick(brand)}
                >
                  {brand.title}
                </h2>
              ))}
            </div>
          </div>
        </div>
        <ImageLightbox
          images={coverUrls}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNext={() =>
            setLightboxIndex((prev) => (prev + 1) % coverUrls.length)
          }
          onPrev={() =>
            setLightboxIndex(
              (prev) => (prev - 1 + coverUrls.length) % coverUrls.length,
            )
          }
        />
      </div>
    );
  },
);

ClientBrands.displayName = "ClientBrands";

export default ClientBrands;
