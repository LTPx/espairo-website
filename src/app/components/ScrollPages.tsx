"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ScrollPages({
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

  return (
    <div className="w-full">
      {/* Contenido de la página */}
      <motion.div
        initial={{ x: "100%" }} // Comienza desde la derecha
        animate={{ x: 0 }} // Se mueve a la posición original
        exit={{ x: "100%" }} // Vuelve a salir hacia la derecha
        transition={{ type: "spring", stiffness: 300, damping: 30 }} // Ajusta la transición
      >
        {children}
      </motion.div>

      {/* Menú lateral */}
      <div className="absolute z-[1000] right-0 h-[100vh]">
        <div className="bg-[#E0E0E0] h-full flex justify-center items-end">
          {menuItems.map((item, index) => {
            if (selectedItems.includes(item)) {
              return null;
            }
            const itemRoute = `/${item.toLowerCase()}`;
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
}
