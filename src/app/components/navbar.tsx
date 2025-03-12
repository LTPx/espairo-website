"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const menuItems = ["Brands", "Nosotros", "Proyectos", "Contacto"];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemClick = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const getRoute = (item: string) => {
    switch (item.toLowerCase()) {
      case "brands":
        return "/brands";
      case "nosotros":
        return "/about-us";
      case "proyectos":
        return "/projects";
      case "contacto":
        return "/contact";
      default:
        return "/";
    }
  };

  return (
    <div className="lg:block hidden w-full">
      <div className="absolute z-[1000] left-0 h-full">
        <div className="bg-[#3F4751] h-full flex flex-col justify-start items-start py-10 space-y-4">
          {selectedItems.map((item, index) => {
            const itemRoute = getRoute(item);
            return (
              <div key={index} className="w-[30px] text-base">
                <Link
                  href={itemRoute}
                  className="lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] text-white pt-[48px] h-full font-medium rotate-180"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {item}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute z-[1000] right-0 full">
        <div className="bg-[#E0E0E0] h-full flex justify-center items-end">
          {menuItems.map((item, index) => {
            if (selectedItems.includes(item)) {
              return null;
            }
            const itemRoute = getRoute(item);
            const isActive =
              pathname === itemRoute || selectedItems.includes(item);
            return (
              <div
                key={index}
                className="w-[30px] border-r border-[#3F4751] text-center"
              >
                <Link
                  href={itemRoute}
                  className={`lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] text-start pt-[48px] h-full text-gray-600 hover:text-black transition duration-300 font-medium rotate-180 ${
                    isActive ? "text-black font-semibold" : ""
                  }`}
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
