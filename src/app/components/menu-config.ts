// src/app/components/menu-config.ts
import { getTranslations } from "next-intl/server";
import type { Locale } from "../_services/api";

export async function getMenuConfig(locale: Locale) {
  const t = await getTranslations({ locale });

  return {
    menuLinks: [
      { title: t("header.brands"), url: "/brands" },
      { title: t("header.about-us"), url: "/about-us" },
      { title: t("header.projects"), url: "/projects" },
      { title: t("header.contact"), url: "/contact" },
    ],
    languages: [
      { name: "ESP", url: "/es" },
      { name: "ENG", url: "/en" },
      { name: "DEU", url: "/de" },
    ],
  };
}
