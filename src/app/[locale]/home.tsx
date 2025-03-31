import React from "react";
import { HomePageWp } from "../_interfaces/wordpress-components";
import Link from "next/link";
import CoverHome from "../components/cover-home";
import MenuLateral from "../components/menu-lateral";

interface Props {
  home_information: HomePageWp;
}

function Home({ home_information }: Props) {
  const menu = [
    { href: "/es/brands", label: "Brands" },
    { href: "/es/about-us", label: "Nosotros" },
    { href: "/es/projects", label: "Proyectos" },
    { href: "/es/contact", label: "Contacto" },
  ];
  return (
    <div className="relative flex min-h-screen bg-gray-100">
      <h1 className="hidden lg:block fixed top-[30px] left-[30px] text-[#E0E0E0] text-[30px] leading-[30px] font-regular tracking-[-0.05em] z-[100000]">
        Espai Rö
      </h1>
      <CoverHome home_information={home_information} />
      <MenuLateral links={menu} />
    </div>
  );
}

export default Home;
