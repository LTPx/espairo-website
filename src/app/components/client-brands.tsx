"use client";

import { useState } from "react";

interface ClientBrandsProps {
  brandNames: string[];
  categories: string[];
}

const ClientBrands: React.FC<ClientBrandsProps> = ({
  brandNames,
  categories,
}) => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  return (
    <div className="px-[30px] py-[50px]">
      <div className="filters flex flex-wrap gap-[10px] mb-[35px] pr-[225px]">
        {categories.map((category, index) => (
          <button
            key={index}
            className="font-regular uppercase inline-block hover:bg-[#3F4751] hover:text-white flex items-center justify-center font-medium text-[12px] leading-[20px] cursor-pointer border border-[#3F4751] h-[28px] px-[20px] rounded-full transition-colors duration-300 ease-in-out"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {brandNames.map((brand, index) => (
          <h2
            key={index}
            className={`font-regular cursor-pointer text-[#3F4751] text-[50px] leading-[58px] tracking-[-0.05em] transition-all duration-300 ${
              hoveredBrand && hoveredBrand !== brand
                ? "blur-sm opacity-50"
                : "opacity-100"
            }`}
            onMouseEnter={() => setHoveredBrand(brand)}
            onMouseLeave={() => setHoveredBrand(null)}
          >
            {brand}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default ClientBrands;
