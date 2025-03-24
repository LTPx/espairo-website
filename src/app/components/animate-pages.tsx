"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";
import NavbarSecond from "./navbar-second";

function AnimatePages({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navOptions = [
    { label: "Brands", section: "brands", route: "/es/brands" },
    { label: "Nosotros", section: "about-us", route: "/es/about-us" },
    { label: "Proyectos", section: "projects", route: "/es/projects" },
    { label: "Contacto", section: "contact", route: "/es/contact" },
  ];

  //   const containerRef = useRef<HTMLDivElement | null>(null);
  //   const [childPositions, setChildPositions] = useState<any[]>([]);

  //   useEffect(() => {
  //     if (containerRef.current) {
  //       const childrenArray = Array.from(containerRef.current.children);
  //       const positions = childrenArray.map((child) => {
  //         const rect = (child as HTMLElement).getBoundingClientRect();
  //         return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
  //       });
  //       setChildPositions(positions);
  //     }
  //   }, [children]);

  return (
    <div>
      <NavbarSecond navOptions={navOptions} />
      {/* <AnimatePresence mode="wait"> */}
        <motion.div
          // ref={containerRef} // Asigna la referencia aquí
          key={pathname}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          {children}
        </motion.div>
      {/* </AnimatePresence> */}
    </div>
  );
}

export default AnimatePages;
