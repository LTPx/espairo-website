"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";
import Home from "../[locale]/home";
import { getWordPressCustomPage } from "../_services/api";
import Contact from "../[locale]/contact/page";
import Projects from "../[locale]/projects/page";
import Brands from "../[locale]/brands/page";

async function AnimatePages({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const data = await getWordPressCustomPage('es', "home");

  const { acf } = data;
  const { home_information } = acf;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatePages;
