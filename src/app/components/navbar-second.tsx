"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Section } from "./call-all-pages";

interface NavbarSecondProps {
  navOptions: { label: string; route: string; section: string }[];
  selectedBrandTitle?: string | null;
  setSelectedBrandTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
}

export default function NavbarSecond({
  navOptions,
  selectedBrandTitle,
  setSelectedBrandTitle,
  setActiveSection,
}: NavbarSecondProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showTitle, setShowTitle] = useState(true);
  const locale = pathname.split("/")[1]

  const currentIndex = navOptions.findIndex(
    (option) => pathname === option.route
  );

  const sectionsInPath =
    currentIndex !== -1 ? navOptions.slice(0, currentIndex + 1) : [];
  const remainingOptions = navOptions.slice(currentIndex + 1);
  console.log("sections", sectionsInPath);

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

  const rightPosition =
    pathname === "/"
      ? "150px"
      : pathname.includes("brands")
      ? "120px"
      : pathname.includes("about-us")
      ? "90px"
      : pathname.includes("projects")
      ? "60px"
      : pathname.includes("contact")
      ? "30px"
      : "150px";

  const handleLinkClick = (route: string, section: string) => {
    setSelectedBrandTitle(null);
    setActiveSection(section as Section);
    router.push(route);
    console.log(setActiveSection);
    console.log(section);
    console.log(route);
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
        if (isAboveTrigger) shouldHide = true;
      });

      setShowTitle(!shouldHide);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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
        if (isAboveTrigger) shouldHide = true;
      });

      setShowTitle(!shouldHide);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      {showTitle && (
        <div>
          <div
            onClick={() => handleLinkClick(`/${locale}`, "home")}
            className="fixed top-[30px] text-[#E0E0E0] text-[30px] leading-[30px] font-regular tracking-[-0.05em] z-[100000]"
            style={{ left: leftPosition, cursor: "pointer" }}
          >
            Espai Rö
          </div>
          <div
            className="fixed top-[30px] z-[100000] text-[#E0E0E0] text-[16px] font-regular tracking-[-0.05em] flex items-center space-x-2"
            style={{ right: rightPosition, cursor: "pointer" }}
          >
            <span
              onClick={() => {
                const newPath = pathname.replace(/^\/(en|es|de)/, "/es");
                router.push(newPath);
              }}
              className={`text-[15px] leading-[22px] tracking-[-0.04em] cursor-pointer hover:underline ${
                pathname.startsWith("/es") ? "" : "opacity-50"
              } ${
                pathname.includes("brands")
                  ? "text-[#3F4751]"
                  : "text-[#E0E0E0]"
              }`}
            >
              ESP
            </span>
            <span
              className={`text-[15px] leading-[22px] tracking-[-0.04em] ${
                pathname.includes("brands")
                  ? "text-[#3F4751]"
                  : "text-[#E0E0E0]"
              }`}
            >
              |
            </span>
            <span
              onClick={() => {
                const newPath = pathname.replace(/^\/(en|es|de)/, "/en");
                router.push(newPath);
              }}
              className={`text-[15px] leading-[22px] tracking-[-0.04em] cursor-pointer hover:underline ${
                pathname.startsWith("/en") ? "" : "opacity-50"
              } ${
                pathname.includes("brands")
                  ? "text-[#3F4751]"
                  : "text-[#E0E0E0]"
              }`}
            >
              ENG
            </span>
          </div>{" "}
        </div>
      )}

      <div className="fixed left-0 z-[100000] h-screen flex">
        {sectionsInPath.map((option) => (
          <div
            key={option.section}
            className={`transition duration-300 hover:bg-[#3F4751] h-full w-[30px] border-r border-[#3F4751] flex items-center ${
              pathname === option.route ? "bg-[#3F4751]" : "bg-[#E0E0E0]"
            }`}
            onClick={() => handleLinkClick(option.route, option.section)}
            style={{ cursor: "pointer" }}
          >
            <div
              className={`pt-[30px] font-regular w-full h-full flex items-center lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] rotate-180 transition duration-300 ${
                pathname === option.route ? "text-white" : "text-[#3F4751]"
              } hover:text-white`}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              {option.label}
              {pathname.includes("brands") && selectedBrandTitle && (
                <>
                  <span className="my-[7px] text-white">|</span>
                  <span className="text-white">{selectedBrandTitle}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed right-0 z-[1000] h-screen">
        <div className="h-full hover:text-white bg-[#E0E0E0] flex">
          {remainingOptions.map((option) => (
            <div
              key={option.section}
              className="h-full w-[30px] flex items-center text-center border-l border-[#3F4751] transition duration-300 hover:bg-[#3F4751]"
              onClick={() => handleLinkClick(option.route, option.section)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="pt-[30px] font-regular w-full h-full flex items-center lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] text-[#3F4751] hover:text-white transition duration-300 font-medium rotate-180"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              >
                {option.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
