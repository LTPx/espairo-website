"use client";

import React from "react";
import { Link } from "@/navigation";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const menuItems = ["Brands", "Nosotros", "Proyectos", "Contacto"];

  return (
    <div className="absolute right-0 h-[100vh] z-[1000]">
      <div className="bg-[#E0E0E0] h-full flex justify-center items-end">
        {menuItems.map((item, index) => {
          const itemRoute = `/${item.toLowerCase()}`;
          const isActive = pathname === itemRoute;
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
              >
                {item}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
