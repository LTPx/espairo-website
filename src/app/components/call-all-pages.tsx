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

  const pathname = usePathname();
  const t = useTranslations();
  const [initialRenderDone, setInitialRenderDone] = useState(false);

  const [selectedBrandTitle, setSelectedBrandTitle] = useState<string | null>(
    null
  );
  const [activeSection, setActiveSection] = useState<Section>(
    getSectionFromPath(pathname)
  );

  useEffect(() => {
    setPageReady(false);
    setInitialRenderDone(false);
  }, [activeSection]);

  const [prevIndex, setPrevIndex] = useState(
    sectionOrder.indexOf(activeSection)
  );
  const [pageReady, setPageReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevIndexRef = useRef(
    sectionOrder.indexOf(getSectionFromPath(pathname))
  );

  const activeIndex = sectionOrder.indexOf(activeSection);
  const direction = activeIndex > prevIndexRef.current ? 1 : -1;
  const entryDirectionRef = useRef<"left" | "right">("right");
  const prevSectionRef = useRef<Section>(activeSection);

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    const activeIndex = sectionOrder.indexOf(activeSection);
    const newDirection = activeIndex > prevIndex ? "right" : "left";

    entryDirectionRef.current = newDirection;
    prevIndexRef.current = activeIndex;
    prevSectionRef.current = sectionOrder[prevIndex];
  }, [activeSection]);

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
    setPageReady(false);
  }, [activeSection]);

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

  const getExitX = (section: Section) => {
    if (section === "home") return "100%";
    if (
      direction === -1 &&
      ["contact", "projects", "aboutUs", "brands"].includes(section)
    ) {
      return `${window.innerWidth - 120}px`;
    }
    return "-100%";
  };

  function getSectionFromPath(path: string): Section {
    if (path.includes("/brands")) return "brands";
    if (path.includes("/about-us")) return "aboutUs";
    if (path.includes("/projects")) return "projects";
    if (path.includes("/contact")) return "contact";
    return "home";
  }

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  return (
    <div className="hidden lg:block h-full relative overflow-hidden">
      <NavbarSecond
        navOptions={navOptions}
        selectedBrandTitle={selectedBrandTitle}
        setSelectedBrandTitle={setSelectedBrandTitle}
        setActiveSection={setActiveSection}
        ready={pageReady && initialRenderDone}
        isBackward={isAnimating}
        direction={entryDirectionRef.current}
        fromSection={prevSectionRef.current}
        toSection={activeSection}
      />
      <div className="relative w-full min-h-screen overflow-hidden">
        {sectionOrder.map((section, index) => {
          const isVisible = index <= activeIndex;
          return (
            <AnimatePresence key={section}>
              {isVisible && (
                <motion.div
                  key={section}
                  initial={
                    isInitialLoad
                      ? false
                      : { x: `${100 * direction}%`, opacity: 1 }
                  }
                  animate={isInitialLoad ? {} : { x: 0, opacity: 1 }}
                  exit={
                    isInitialLoad ? {} : { x: getExitX(section), opacity: 1 }
                  }
                  transition={
                    isInitialLoad
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 50, damping: 20 }
                  }
                  className="absolute top-0 left-0 w-full min-h-screen"
                  style={{ zIndex: index }}
                  onAnimationStart={() => setIsAnimating(true)}
                  onAnimationComplete={() => {
                    setTimeout(() => {
                      setPageReady(true);
                      setInitialRenderDone(true);
                    }, 1000);
                  }}
                >
                  {section === "home" && (
                    <Home home_information={home} locale={locale} />
                  )}
                  {section === "brands" && (
                    <BrandsPage
                      brands_information={brands}
                      allCategories={categories}
                      setSelectedBrandTitle={setSelectedBrandTitle}
                      locale={locale}
                    />
                  )}
                  {section === "aboutUs" && (
                    <AboutUsPage
                      ready={pageReady}
                      aboutUs_information={aboutUs_information}
                      locale={locale}
                    />
                  )}
                  {section === "projects" && (
                    <ProjectsPage
                      ready={pageReady}
                      projects_information={projects}
                      locale={locale}
                    />
                  )}
                  {section === "contact" && (
                    <ContactPage
                      ready={pageReady}
                      contact_information={contact_information}
                      locale={locale}
                    />
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
