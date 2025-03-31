import {
  IndividualProjectWp,
  ProjectsPageWp,
} from "@/app/_interfaces/wordpress-components";
import ProjectsInformation from "@/app/components/project-information";
import { Metadata } from "next";
import MenuLateral from "./menu-lateral";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Footer from "./footer";

interface Props {
  projects_information: ProjectsPageWp;
}

function ProjectsPage({ projects_information }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/es/projects") {
      document.body.classList.add("no-scroll");
      return () => {
        document.body.classList.remove("no-scroll");
      };
    }
  }, [pathname]);

  const leftMenuLinks = [
    { href: "/es/brands", label: "Brands" },
    { href: "/es/about-us", label: "Nosotros" },
    { href: "/es/projects", label: "Proyectos" },
  ];

  const rightMenuLinks = [{ href: "/es/contact", label: "Contacto" }];

  return (
    <div className="relative h-[100vh] flex">
      <Link href={"/"}>
        <h1 className="hidden lg:block absolute top-[30px] left-[120px] text-[#E0E0E0] text-[30px] leading-[30px] font-regular tracking-[-0.05em] z-[100000]">
          Espai Rö
        </h1>
      </Link>
      <MenuLateral links={leftMenuLinks} />
      <div className="flex-1 overflow-y-auto page-Projects no-scrollbar">
        <ProjectsInformation projects_information={projects_information} />
        <Footer />
      </div>
      <MenuLateral links={rightMenuLinks} />
    </div>
  );
}

export default ProjectsPage;
