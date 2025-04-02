"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Home from "../[locale]/home";
import {
  AboutUsPageWp,
  BrandsPageWp,
  ContactPageWp,
  HomePageWp,
  ProjectsPageWp,
} from "../_interfaces/wordpress-components";
import NavbarSecond from "./navbar-second";
import ProjectsPage from "./projects-page";
import AboutUsPage from "./about-us-page";
import BrandsPageContent from "./brands-page-content";
import ContactPage from "./contact-page";
import BrandsPage from "./brands-page";

interface PageProps {
  home: HomePageWp;
  projects: ProjectsPageWp;
  brands: BrandsPageWp;
  categories: any;
  aboutUs_information: AboutUsPageWp;
  contact_information: ContactPageWp;
}

type Section = "home" | "brands" | "aboutUs" | "projects" | "contact";

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
  const [selectedBrandTitle, setSelectedBrandTitle] = useState<string | null>(null);

  const getSectionFromPath = (path: string) => {
    if (path.includes("/brands")) return "brands";
    if (path.includes("/about-us")) return "aboutUs";
    if (path.includes("/projects")) return "projects";
    if (path.includes("/contact")) return "contact";
    return "home";
  };

  const [activeSection, setActiveSection] = useState<Section>(
    getSectionFromPath(pathname)
  );
  const [sectionHeights, setSectionHeights] = useState<Record<Section, number>>(
    {
      home: 0,
      brands: 0,
      aboutUs: 0,
      projects: 0,
      contact: 0,
    }
  );

  const homeRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const getAllHeights = () => {
    setSectionHeights({
      home: homeRef.current?.scrollHeight || 0,
      brands: brandsRef.current?.scrollHeight || 0,
      aboutUs: aboutUsRef.current?.scrollHeight || 0,
      projects: projectsRef.current?.scrollHeight || 0,
      contact: contactRef.current?.scrollHeight || 0,
    });
  };

  useEffect(() => {
    getAllHeights();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  useEffect(() => {
    setActiveSection(getSectionFromPath(pathname));
  }, [pathname]);

  useEffect(() => {
    if (activeSection === "brands") {
      setSelectedBrandTitle(null);
    }
  }, [activeSection]);


  const navOptions = [
    { label: "Brands", section: "brands", route: "/es/brands" },
    { label: "Nosotros", section: "about-us", route: "/es/about-us" },
    { label: "Proyectos", section: "projects", route: "/es/projects" },
    { label: "Contacto", section: "contact", route: "/es/contact" },
  ];

  return (
    <div className="hidden lg:block h-full relative overflow-hidden">
      <NavbarSecond setSelectedBrandTitle={setSelectedBrandTitle} navOptions={navOptions} selectedBrandTitle={selectedBrandTitle}  />
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
        transition={{ type: "tween", duration: 1.65 }}
        style={{
          height: sectionHeights[activeSection]
            ? `${sectionHeights[activeSection]}px`
            : "100vh",
        }}
      >
        <div className="w-full flex-shrink-0" ref={homeRef}>
          <Home home_information={home} />
        </div>
        <div className="w-full flex-shrink-0" ref={brandsRef}>
          <BrandsPage brands_information={brands} allCategories={categories} setSelectedBrandTitle={setSelectedBrandTitle}/>
        </div>
        <div className="w-full h-auto flex-shrink-0" ref={aboutUsRef}>
          <AboutUsPage aboutUs_information={aboutUs_information} />
        </div>
        <div className="w-full h-auto flex-shrink-0" ref={projectsRef}>
          <ProjectsPage projects_information={projects} />
        </div>
        <div className="w-full h-auto flex-shrink-0" ref={contactRef}>
          <ContactPage contact_information={contact_information} />
        </div>
      </motion.div>
    </div>
  );
}

export default CallAllPages;
