import {
  IndividualProjectWp,
  ProjectsPageWp,
} from "@/app/_interfaces/wordpress-components";
import { getWordPressCustomPage } from "@/app/_services/api";
import Cover from "@/app/components/cover";
import Gallery from "@/app/components/gallery";
import ProjectsInformation from "@/app/components/project-information";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useAOSInScrollContainer from "./scroll-component";
import MenuLateral from "./menu-lateral";
import Footer from "./footer";

interface Props {
  projects_information: ProjectsPageWp;
  ready?: boolean;
}

function ProjectsPage({ projects_information, ready }: Props) {
  // const t = await getTranslations();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const leftMenuLinks = [
    // { href: "/es/brands", label: "Brands" },
    // { href: "/es/about-us", label: "Nosotros" },
    { href: "/es/projects", label: "Projectos" },
  ];

  const menuRight = [{ href: "/es/contact", label: "Contacto" }];
  const menuLeft = [
    { href: "/es/projects", label: "Proyectos" },
    // { href: "/es/projects", label: "Contacto" },
  ];

  return (
    <div className="relative h-[100vh] ml-[60px] mr-[30px] w-[calc(100%-90px)] flex bg-body">
      <MenuLateral ready={ready} activeLink="/es/projects" links={menuLeft} />
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar"
      >
        <div className="container lg:hidden bg-[#3F4751] flex items-center">
          <span className="font-regular text-white py-[18px] text-[16px] leading-[20px] tracking-[-0.05em]">
            {/* {`${t("header.projects")}`} */}
          </span>
        </div>
        <ProjectsInformation projects_information={projects_information} />
        <Footer />
      </div>
      {/* <MenuLateral ready={ready} activeLink="/es/projects" links={menuRight} /> */}
    </div>
  );
}

export default ProjectsPage;
