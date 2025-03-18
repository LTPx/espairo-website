"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import AnimatePages from "./animate-pages";

export default function NavbarSecond({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const visibleMenuItems = menuItems.filter(
    (item) => pathname !== getRoute(item) && !selectedItems.includes(item)
  );

  const menuWidth = visibleMenuItems.length * 30;

  return (
    <div className="flex h-screen">
      <div style={{ paddingRight: `${menuWidth}px` }}>
        {/* <AnimatePages>
            {children}
        </AnimatePages> */}
      </div>
      <div className="fixed right-0 z-[1000] h-screen">
        <div className="h-full bg-[#E0E0E0] flex">
          {visibleMenuItems.map((item, index) => (
            <div
              key={index}
              className="h-full w-[30px] border-l border-[#3F4751] text-center"
            >
              <Link
                href={getRoute(item)}
                className="h-full lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] text-start pt-[48px] text-gray-600 hover:text-black transition duration-300 font-medium rotate-180"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
