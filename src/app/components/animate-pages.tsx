"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";

function AnimatePages({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Crear una referencia para el contenedor de los hijos
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [childPositions, setChildPositions] = useState<any[]>([]);

  useEffect(() => {
    // Verifica si el contenedor y sus hijos existen
    if (containerRef.current) {
      const childrenArray = Array.from(containerRef.current.children);
      const positions = childrenArray.map((child) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
      });
      setChildPositions(positions);
    }
  }, [children]); // Dependencia para cuando los niños cambian

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={containerRef} // Asigna la referencia aquí
        key={pathname}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        {children}
        <div>
          <pre>{JSON.stringify(childPositions, null, 2)}</pre>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatePages;
