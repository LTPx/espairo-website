"use client";

import { useState } from "react";
import { BrandsPageWp, BrandsWp } from "../_interfaces/wordpress-components";

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
  onCategorySelect
}) => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredBrands =
    selectedCategory === 1
      ? []
      : selectedCategory
      ? brands_information.brand.filter(
          (brand) => brand.category_brand.term_id === selectedCategory
        )
      : brands_information.brand;

  const selectedCover = selectedCategory
    ? brands_information.cover_categories.find(
        (cover) => cover.category === selectedCategory
      )?.image_cover || brands_information.cover_page.url
    : brands_information.cover_page.url;

  return (
    <div className="flex flex-col gap-[20px] lg:gap-[0px] lg:grid lg:grid-cols-2 lg:h-[100vh] lg:overflow-auto">
      <div className=" lg:h-[calc(100vh)]">
        <img
          src={selectedCover}
          alt="alt-projects"
          className="h-[100vh] w-full object-cover"
        />
      </div>
      <div className="lg:h-[calc(100vh)] lg:overflow-auto no-scrollbar">
        <div className="px-[30px] py-[50px]">
          <div className="w-full sticky top-[50px] z-[100000]">
            <div className=" filters flex lg:flex-wrap gap-[7px] lg:gap-[10px] mb-[20px] lg:mb-[35px] lg:pr-[180px] overflow-x-scroll no-scrollbar">
              {categories
                .filter((category) => category.term_id !== 1)
                .map((category) => (
                  <button
                    key={category.term_id}
                    onClick={() => {
                      const newCategory =
                        selectedCategory === category.term_id ? null : category.term_id;
                      setSelectedCategory(newCategory);
                      onCategorySelect(newCategory); // 🔥 Enviar categoría seleccionada
                    }}
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
          {selectedCategory === null && brands_information.description && (
            <div
              className="lg:pr-[140px]"
              dangerouslySetInnerHTML={{
                __html: brands_information.description,
              }}
            />
          )}
          <div className="flex flex-col lg:pt-[35px]">
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
