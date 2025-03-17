"use client";

import { useState } from "react";
import { BrandsWp } from "../_interfaces/wordpress-components";

interface ClientBrandsProps {
  brands: BrandsWp[];
  categories: { term_id: number; name: string }[];
  onBrandClick: (brandTitle: string) => void;
}

const ClientBrands: React.FC<ClientBrandsProps> = ({
  brands,
  categories,
  onBrandClick,
}) => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredBrands =
    selectedCategory === 1
      ? brands
      : selectedCategory
      ? brands.filter(
          (brand) => brand.category_brand.term_id === selectedCategory
        )
      : brands;

  return (
    <div className="px-[30px] py-[50px]">
      <div className="w-full overflow-hidden">
        <div className="filters flex lg:flex-wrap gap-[7px] lg:gap-[10px] mb-[20px] lg:mb-[35px] lg:pr-[225px] overflow-x-scroll no-scrollbar">
          {categories.map((category, index) => (
            <button
              key={category.term_id}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.term_id
                    ? null
                    : category.term_id
                )
              }
              className={`font-regular uppercase inline-block flex items-center justify-center font-medium text-[12px] leading-[20px] cursor-pointer border border-[#3F4751] h-[28px] px-[20px] rounded-full transition-colors duration-300 ease-in-out ${
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

      <div className="flex flex-col">
        {filteredBrands.map((brand, index) => (
          <h2
            key={index}
            className={`font-regular cursor-pointer text-[#3F4751] text-[40px] leading-[48px] lg:text-[50px] lg:leading-[58px] tracking-[-0.05em] transition-all duration-300 ${
              hoveredBrand && hoveredBrand !== brand.title
                ? "blur-sm opacity-50"
                : "opacity-100"
            }`}
            onMouseEnter={() => setHoveredBrand(brand.title)}
            onMouseLeave={() => setHoveredBrand(null)}
            onClick={() => onBrandClick(brand.title)}
          >
            {brand.title}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default ClientBrands;
