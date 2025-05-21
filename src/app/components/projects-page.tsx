import {
  IndividualProjectWp,
  ProjectsPageWp,
} from "@/app/_interfaces/wordpress-components";
import { getWordPressCustomPage } from "@/app/_services/api";
import Cover from "@/app/components/cover";
import Gallery from "@/app/components/gallery";
import ProjectsInformation from "@/app/components/project-information";
import { Metadata } from "next";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useAOSInScrollContainer from "./scroll-component";
import MenuLateral from "./menu-lateral";
import Footer from "./footer";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  projects_information: ProjectsPageWp;
  ready?: boolean;
  locale: "en" | "es" | "de";
}

function ProjectsPage({ projects_information, ready, locale }: Props) {
  const t = useTranslations();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
      mirror: false,
      disableMutationObserver: true,
    });
  }, []);

  useAOSInScrollContainer(scrollContainerRef);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  const menuLeft = [
    { href: `/${locale}/projects`, label: `${t("header.projects")}` },
  ];

  const menuRight = [
    { href: `/${locale}/contact`, label: `${t("header.contact")}` },
  ];

  return (
    <div className="relative h-[100vh] ml-[60px] w-[calc(100%-60px)] flex bg-body">
      <MenuLateral ready={ready} activeLink="/es/projects" links={menuLeft} />
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar"
      >
        <ProjectsInformation projects_information={projects_information} />
        <Footer />
      </div>
      <MenuLateral links={menuRight} />
    </div>
  );
}

export default ProjectsPage;
