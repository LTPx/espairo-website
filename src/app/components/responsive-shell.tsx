// src/app/components/responsive-shell.tsx
"use client";

import dynamic from "next/dynamic";
import { useIsDesktop } from "../hooks/use-is-desktop";
import MenuMobile from "./menu-mobile";
import type { Locale } from "../_services/api";

const CallAllPages = dynamic(() => import("./call-all-pages"), {
  ssr: false,
});

type DesktopProps = React.ComponentProps<typeof CallAllPages>;

interface Props {
  locale: Locale;
  desktopData: Omit<DesktopProps, "locale">;
  menuLinks: { title: string; url: string }[];
  children: React.ReactNode;
}

export default function ResponsiveShell({
  locale,
  desktopData,
  menuLinks,
  children,
}: Props) {
  const isDesktop = useIsDesktop();

  if (isDesktop === null) return null;

  if (isDesktop) {
    return <CallAllPages locale={locale} {...desktopData} />;
  }

  return (
    <>
      <MenuMobile locale={locale} links={menuLinks} />
      <div className="bg-body">{children}</div>
    </>
  );
}
