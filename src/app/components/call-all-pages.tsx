"use client";

import React, { useRef } from "react";
import Home from "../[locale]/home";
import Projects from "../[locale]/projects/page";
import {
  AboutUsPageWp,
  BrandsPageWp,
  HomePageWp,
  ProjectsPageWp,
} from "../_interfaces/wordpress-components";
import Brands from "../[locale]/brands/page";
import AboutUs from "../[locale]/about-us/page";

interface PageProps {
  home: HomePageWp;
  projects: ProjectsPageWp;
  brands: BrandsPageWp;
  categories: any;
  aboutUs_information: AboutUsPageWp;
}

function CallAllPages(props: PageProps) {
  const { home, projects, brands, categories, aboutUs_information } = props;

  const homeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      {/* Botones de navegación */}
      <div className="absolute z-[100000] top-0 flex space-x-2 p-4">
        <button
          onClick={() => scrollToSection(homeRef)}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded"
        >
          Ir a Home
        </button>
        <button
          onClick={() => scrollToSection(brandsRef)}
          className="cursor-pointer px-4 py-2 bg-purple-500 text-white rounded"
        >
          Ir a Brands
        </button>
        <button
          onClick={() => scrollToSection(aboutUsRef)}
          className="cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Ir a Nosotros
        </button>
        <button
          onClick={() => scrollToSection(projectsRef)}
          className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded"
        >
          Ir a Projects
        </button>
      </div>

      {/* Contenedor de páginas con scroll horizontal */}
      <div className="flex overflow-x-auto flex-nowrap space-x-4 no-scroll">
        {/* Página Home */}
        <div ref={homeRef} className="w-full h-auto flex-shrink-0">
          <Home home_information={home} />
        </div>

        {/* Página Brands */}
        <div ref={brandsRef} className="w-full h-auto flex-shrink-0">
          <Brands brands_information={brands} allCategories={categories} />
        </div>

        {/* Página About Us */}
        <div ref={aboutUsRef} className="w-full h-auto flex-shrink-0">
          <AboutUs aboutUs_information={aboutUs_information} />
        </div>

        {/* Página Projects */}
        <div ref={projectsRef} className="w-full h-auto flex-shrink-0">
          <Projects projects_information={projects} />
        </div>
      </div>
    </div>
  );
}

export default CallAllPages;
