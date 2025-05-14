"use client";

import { useState } from "react";
import { BrandsPageWp, BrandsWp } from "../_interfaces/wordpress-components";
import { useTranslations } from "next-intl";

interface ClientBrandsProps {
  categories: { term_id: number; name: string }[];
  onBrandClick: (selectedBrand: BrandsWp) => void;
  brands_information: BrandsPageWp;
  onCategorySelect: (category: number | null) => void;
}

const ClientBrands: React.FC<ClientBrandsProps> = ({
  categories,
  onBrandClick,
  brands_information,
  onCategorySelect,
}) => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const t = useTranslations();

  const filteredBrands =
    selectedCategory === null
      ? brands_information.brand
      : selectedCategory
      ? brands_information.brand.filter(
          (brand) => brand.category_brand.term_id === selectedCategory
        )
      : brands_information.brand;

  const selectedCover = selectedCategory
    ? brands_information.cover_categories.find(
        (cover) => cover.category === selectedCategory
      )?.image_cover.url || brands_information.cover_page.url
    : brands_information.cover_page.url;

  return (
    <div className="brands flex flex-col gap-[20px] lg:gap-[0px] lg:grid lg:grid-cols-2 h-[100vh] overflow-auto">
      <div className="hidden lg:block lg:h-[calc(100dvh)]">
        <img
          src={selectedCover}
          alt="alt-projects"
          className="h-[100dvh] w-full object-cover"
        />
      </div>
      <div className="h-[100dvh] overflow-auto no-scrollbar">
        <div className="h-[100dvh] pl-[30px] lg:px-[30px] py-[30px]">
          <div className="w-full sticky top-[30px] z-[10] lg:z-[100000]">
            <div className="filters pr-[30px] flex lg:flex-wrap gap-[7px] lg:gap-[10px] mb-[20px] lg:mb-[30px] lg:pr-[10px] xl:pr-[50px] overflow-x-scroll no-scrollbar">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  onCategorySelect(null);
                }}
                className={`backdrop-blur-sm font-regular uppercase inline-block flex items-center lg:items-start justify-center font-medium text-[14px] leading-[20px] lg:text-[12px] lg:leading-[28px] cursor-pointer border border-[#3F4751] h-[28px] px-[20px] rounded-full transition-colors duration-300 ease-in-out ${
                  selectedCategory === null
                    ? "bg-[#3F4751] text-white"
                    : "hover:bg-[#3F4751] hover:text-white"
                }`}
              >
                {t("brandPage.all")}
              </button>
              {categories
                .filter(
                  (category) => category.term_id !== 1 && category.term_id !== 8
                )
                .map((category) => (
                  <button
                    key={category.term_id}
                    onClick={() => {
                      const newCategory =
                        selectedCategory === category.term_id
                          ? null
                          : category.term_id;
                      setSelectedCategory(newCategory);
                      onCategorySelect(newCategory);
                    }}
                    className={`backdrop-blur-sm font-regular items-center lg:items-start uppercase inline-block flex justify-center font-medium text-[14px] leading-[20px] lg:text-[12px] lg:leading-[28px] cursor-pointer border border-[#3F4751] h-[28px] px-[20px] rounded-full transition-colors duration-300 ease-in-out ${
                      selectedCategory === category.term_id
                        ? "bg-[#3F4751] text-white"
                        : "hover:bg-[#3F4751] hover:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
            </div>
          </div>
          {(selectedCategory === 1 || selectedCategory === null) &&
            brands_information.description && (
              <div
                className="hidden lg:block lg:pr-[40px] xl:pr-[143px] pb-[30px]"
                dangerouslySetInnerHTML={{
                  __html: brands_information.description,
                }}
              />
            )}
          <div className="flex flex-col">
            {filteredBrands.map((brand, index) => (
              <h2
                key={index}
                className={`font-regular cursor-pointer text-[#3F4751] text-[40px] leading-[48px] lg:text-[50px] lg:leading-[58px] tracking-[-0.05em] transition-all duration-300 w-fit ${
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
    </div>
  );
};

export default ClientBrands;
