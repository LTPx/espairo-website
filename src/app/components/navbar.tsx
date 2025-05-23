"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = ["Brands", "Nosotros", "Proyectos", "Contacto"];
  const [animatingItem, setAnimatingItem] = useState<string | null>(null);

  const getRoute = (item: string) => {
    switch (item.toLowerCase()) {
      case "brands":
        return "/es/brands";
      case "nosotros":
        return "/es/about-us";
      case "proyectos":
        return "/es/projects";
      case "contacto":
        return "/es/contact";
      default:
        return "/";
    }
  };

  const handleItemClick = (item: string) => {
    setAnimatingItem(item);

    setTimeout(() => {
      const url = getRoute(item);
      router.push(url); // navegación client-side sin recarga
    }, 800); // esperar que termine animación
  };

  return (
    <div className="lg:block hidden w-full relative">
      <div className="fixed z-[1000] top-0 right-0 h-full">
        <div className="bg-[#E0E0E0] h-full flex justify-center items-end">
          {menuItems.map((item, index) => {
            const isAnimating = animatingItem === item;
            const itemRoute = getRoute(item);
            const isActive = pathname === itemRoute;

            return (
              <motion.div
                key={index}
                className="w-[30px] border-r border-[#3F4751] text-center"
                initial={false}
                animate={
                  isAnimating
                    ? { x: "calc(-100vw - 300px)", opacity: 1 }
                    : { x: 0, opacity: 1 }
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <button
                  onClick={() => handleItemClick(item)}
                  className={`lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] text-start pt-[48px] h-full text-gray-600 hover:text-black transition duration-300 font-medium rotate-180 ${
                    isActive ? "text-black font-semibold" : ""
                  }`}
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {item}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
