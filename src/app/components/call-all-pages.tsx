"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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
import BrandsPage from "./brands-page";
import ContactPage from "./contact-page";
import Home from "./home-page";

interface PageProps {
  home: HomePageWp;
  projects: ProjectsPageWp;
  brands: BrandsPageWp;
  categories: any;
  aboutUs_information: AboutUsPageWp;
  contact_information: ContactPageWp;
  locale: "en" | "es" | "de";
}

export type Section = "home" | "brands" | "aboutUs" | "projects" | "contact";

function CallAllPages(props: PageProps) {
  const {
    home,
    projects,
    brands,
    categories,
    aboutUs_information,
    contact_information,
    locale,
  } = props;

  const router = useRouter();
  const pathname = usePathname();
  const [selectedBrandTitle, setSelectedBrandTitle] = useState<string | null>(
    null
  );
  const [opacity, setOpacity] = useState(0);
  const t = useTranslations();

  const getSectionFromPath = (path: string): Section => {
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

  useEffect(() => {
    setOpacity(0);
    setTimeout(() => setOpacity(1), 100);
  }, [pathname]);

  const navOptions = [
    {
      label: `${t("header.brands")}`,
      section: "brands",
      route: `/${locale}/brands`,
    },
    {
      label: `${t("header.about-us")}`,
      section: "aboutUs",
      route: `/${locale}/about-us`,
    },
    {
      label: `${t("header.projects")}`,
      section: "projects",
      route: `/${locale}/projects`,
    },
    {
      label: `${t("header.contact")}`,
      section: "contact",
      route: `/${locale}/contact`,
    },
  ];

  return (
    <div className="hidden lg:block h-full relative overflow-hidden">
      <NavbarSecond
        navOptions={navOptions}
        selectedBrandTitle={selectedBrandTitle}
        setSelectedBrandTitle={setSelectedBrandTitle}
        setActiveSection={setActiveSection}
      />
      <motion.div
        className="flex w-full"
        initial={{ x: 0, opacity: 0 }}
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
          opacity: opacity,
        }}
        transition={{ type: "tween", duration: 2 }}
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
          <BrandsPage
            brands_information={brands}
            allCategories={categories}
            setSelectedBrandTitle={setSelectedBrandTitle}
          />
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
