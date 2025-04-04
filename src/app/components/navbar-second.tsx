"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarSecondProps {
  navOptions: { label: string; route: string; section: string }[];
  selectedBrandTitle?: string | null;
  setSelectedBrandTitle: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function NavbarSecond({
  navOptions,
  selectedBrandTitle,
  setSelectedBrandTitle,
}: NavbarSecondProps) {
  const pathname = usePathname();
  const [showTitle, setShowTitle] = useState(true);

  const currentIndex = navOptions.findIndex((option) =>
    pathname.includes(option.section)
  );
  const sectionsInPath =
    currentIndex !== -1 ? navOptions.slice(0, currentIndex + 1) : [];
  const remainingOptions = navOptions.slice(currentIndex + 1);

  const leftPosition =
    pathname === "/"
      ? "30px"
      : pathname.includes("brands")
      ? "60px"
      : pathname.includes("about-us")
      ? "90px"
      : pathname.includes("projects")
      ? "120px"
      : pathname.includes("contact")
      ? "150px"
      : "30px";

  const handleLinkClick = (section: string) => {
    if (!section.includes("/es/brands")) {
      setSelectedBrandTitle(null);
    }
  };

  useEffect(() => {
    if (!pathname.includes("brands")) {
      setSelectedBrandTitle(null);
    }
  }, [pathname, setSelectedBrandTitle]);

  useEffect(() => {
    if (!pathname.includes("/about-us")) {
      setShowTitle(true);
      return;
    }

    const handleScroll = () => {
      const container = document.querySelector(".hide-title-trigger-container");

      if (!container) {
        setShowTitle(true);
        return;
      }

      const triggers = container.querySelectorAll(".hide-title-trigger");

      let shouldHide = false;

      triggers.forEach((trigger) => {
        const rect = trigger.getBoundingClientRect();
        const isAboveTrigger = rect.top <= 30 && rect.bottom >= 0;

        if (isAboveTrigger) {
          shouldHide = true;
        }
      });

      setShowTitle(!shouldHide);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!pathname.includes("/projects")) {
      setShowTitle(true);
      return;
    }

    const handleScroll = () => {
      const container = document.querySelector(".hide-title-trigger-projects");

      if (!container) {
        setShowTitle(true);
        return;
      }

      const triggers = container.querySelectorAll(
        ".hide-title-trigger-project"
      );

      let shouldHide = false;

      triggers.forEach((trigger) => {
        const rect = trigger.getBoundingClientRect();
        const isAboveTrigger = rect.top <= 30 && rect.bottom >= 0;

        if (isAboveTrigger) {
          shouldHide = true;
        }
      });

      setShowTitle(!shouldHide);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <>
      {showTitle && (
        <Link href={"/"}>
          <h1
            className="fixed top-[30px] text-[#E0E0E0] text-[30px] leading-[30px] font-regular tracking-[-0.05em] z-[100000]"
            style={{ left: leftPosition }}
          >
            Espai Rö
          </h1>
        </Link>
      )}
      <div className="fixed left-0 z-[100000] h-screen flex">
        {sectionsInPath.map((option) => (
          <div
            key={option.section}
            className={`transition duration-300 hover:bg-[#3F4751] h-full w-[30px] border-r border-[#3F4751] flex items-center  ${
              pathname.includes(option.section)
                ? "bg-[#3F4751]"
                : "bg-[#E0E0E0]"
            }`}
          >
            <Link
              href={option.route}
              className={`pt-[30px] font-regular w-full h-full flex items-center  lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] rotate-180 transition duration-300 ${
                pathname.includes(option.section)
                  ? "text-white"
                  : "text-[#3F4751]"
              } hover:text-white`}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
              onClick={() => handleLinkClick(option.section)}
            >
              {option.label}
              {pathname.includes("brands") && selectedBrandTitle && (
                <>
                  <span className="my-[7px] text-white">|</span>
                  <span className="text-white">{selectedBrandTitle}</span>
                </>
              )}
            </Link>
          </div>
        ))}
      </div>
      <div className="fixed right-0 z-[1000] h-screen">
        <div className="h-full hover:text-white bg-[#E0E0E0] flex">
          {remainingOptions.map((option) => (
            <div
              key={option.section}
              className={`h-full w-[30px] flex items-center text-center ${"border-l border-[#3F4751]"} transition duration-300 hover:bg-[#3F4751]`}
            >
              <Link
                href={option.route}
                className="pt-[30px] font-regular w-full h-full flex items-center lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] text-[#3F4751] hover:text-white transition duration-300 font-medium rotate-180"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              >
                {option.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
