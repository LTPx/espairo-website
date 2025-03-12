"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import MenuMobile from "./menu-mobile";
import Navbar from "./navbar";

function MenuOptions(nextParams: { params: { locale: "en" | "es" | "de" } }) {
  const {
    params: { locale },
  } = nextParams;

  const t = useTranslations();

  const menuLinks = [
    { title: `${t("header.brands")}`, url: `/brands` },
    { title: `${t("header.about-us")}`, url: `/about-us` },
    { title: `${t("header.projects")}`, url: `/projects` },
    { title: `${t("header.contact")}`, url: "/contact" },
  ];

  const allLanguages = ["/es", "/en", "/de"];

  const languages = [
    { name: "ESP", url: "/es" },
    { name: "ENG", url: "/en" },
    { name: "DEU", url: "/de" },
  ];

  return (
    <>
      <Navbar />
      <div className="lg:hidden block">
        <MenuMobile locale={locale} languages={languages} links={menuLinks} />
      </div>
    </>
  );
}

export default MenuOptions;
