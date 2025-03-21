"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Home from "../[locale]/home";
import Projects from "../[locale]/projects/page";
import {
  AboutUsPageWp,
  BrandsPageWp,
  ContactPageWp,
  HomePageWp,
  ProjectsPageWp,
} from "../_interfaces/wordpress-components";
import Brands from "../[locale]/brands/page";
import AboutUs from "../[locale]/about-us/page";
import NavbarSecond from "./navbar-second";
import Contact from "../[locale]/contact/page";

interface PageProps {
  home: HomePageWp;
  projects: ProjectsPageWp;
  brands: BrandsPageWp;
  categories: any;
  aboutUs_information: AboutUsPageWp;
  contact_information: ContactPageWp;
}

function CallAllPages(props: PageProps) {
  const {
    home,
    projects,
    brands,
    categories,
    aboutUs_information,
    contact_information,
  } = props;
  const router = useRouter();
  const pathname = usePathname();

  const getSectionFromPath = (path: string) => {
    if (path.includes("/brands")) return "brands";
    if (path.includes("/about-us")) return "aboutUs";
    if (path.includes("/projects")) return "projects";
    if (path.includes("/contact")) return "contact";
    return "home";
  };

  const [activeSection, setActiveSection] = useState(getSectionFromPath(pathname));
  const [sectionHeight, setSectionHeight] = useState<number | undefined>(undefined);

  const homeRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  
  const getHeightForSection = () => {
    switch (activeSection) {
      case "home":
        return homeRef.current?.scrollHeight;
      case "brands":
        return brandsRef.current?.scrollHeight;
      case "aboutUs":
        return aboutUsRef.current?.scrollHeight;
      case "projects":
        return projectsRef.current?.scrollHeight;
      case "contact":
        return contactRef.current?.scrollHeight;
      default:
        return undefined;
    }
  };

  useEffect(() => {
    const height = getHeightForSection();
    setSectionHeight(height);
  }, [activeSection]); 
  
  useEffect(() => {
    setActiveSection(getSectionFromPath(pathname));
  }, [pathname]);

  const navOptions = [
    { label: "Brands", section: "brands", route: "/es/brands" },
    { label: "Nosotros", section: "about-us", route: "/es/about-us" },
    { label: "Proyectos", section: "projects", route: "/es/projects" },
    { label: "Contacto", section: "contact", route: "/es/contact" },
  ];

  return (
    <div className="h-full relative overflow-hidden">
      <NavbarSecond navOptions={navOptions} />
      <motion.div
        className="flex w-full"
        initial={{ x: 0 }}
        animate={{
          x:
            activeSection === "home"
              ? "0%"
              : activeSection === "brands"
              ? "-100%"
              : activeSection === "aboutUs"
              ? "-200%"
              : activeSection === "projects"
              ? "-300%"
              : "-400%",
        }}
        transition={{ type: "tween", duration: 0.5 }}
        style={{
          
          height: sectionHeight ? `${sectionHeight}px` : "100vh",
        }}
      >
        <div className="w-full flex-shrink-0" ref={homeRef}>
          <Home home_information={home} navOptions={navOptions} />
        </div>
        <div className="w-full flex-shrink-0" ref={brandsRef}>
          <Brands brands_information={brands} allCategories={categories} />
        </div>
        <div className="w-full h-auto flex-shrink-0" ref={aboutUsRef}>
          <AboutUs aboutUs_information={aboutUs_information} />
        </div>
        <div className="w-full h-auto flex-shrink-0" ref={projectsRef}>
          <Projects projects_information={projects} />
        </div>
        <div className="w-full h-auto flex-shrink-0" ref={contactRef}>
          <Contact contact_information={contact_information} />
        </div>
      </motion.div>
    </div>
  );
}

export default CallAllPages;
