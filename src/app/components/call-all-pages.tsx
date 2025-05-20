"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

const sectionOrder: Section[] = [
  "home",
  "brands",
  "aboutUs",
  "projects",
  "contact",
];

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
  const t = useTranslations();

  const [selectedBrandTitle, setSelectedBrandTitle] = useState<string | null>(
    null
  );
  const [opacity, setOpacity] = useState(0);

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

  const [prevIndex, setPrevIndex] = useState(
    sectionOrder.indexOf(activeSection)
  );
  const activeIndex = sectionOrder.indexOf(activeSection);
  const direction = activeIndex > prevIndex ? 1 : -1;

  // Update previous index when active section changes
  useEffect(() => {
    setPrevIndex(activeIndex);
  }, [activeSection]);

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
    const timeout = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timeout);
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

      <div className="relative w-full min-h-screen overflow-hidden">
        {sectionOrder.map((section, index) => {
          const isVisible = index <= activeIndex;
          return (
            <AnimatePresence key={section}>
              {isVisible && (
                <motion.div
                  key={section}
                  initial={{ x: `${100 * direction}%`, opacity: 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: `${100 * direction}%`, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  className="absolute top-0 left-0 w-full min-h-screen"
                  style={{ zIndex: index }}
                >
                  {section === "home" && <Home home_information={home} />}
                  {section === "brands" && (
                    <BrandsPage
                      brands_information={brands}
                      allCategories={categories}
                      setSelectedBrandTitle={setSelectedBrandTitle}
                    />
                  )}
                  {section === "aboutUs" && (
                    <AboutUsPage aboutUs_information={aboutUs_information} />
                  )}
                  {section === "projects" && (
                    <ProjectsPage projects_information={projects} />
                  )}
                  {section === "contact" && (
                    <ContactPage contact_information={contact_information} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}

export default CallAllPages;
