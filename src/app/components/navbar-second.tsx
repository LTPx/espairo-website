"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Section } from "./call-all-pages";

interface NavbarSecondProps {
  navOptions: { label: string; route: string; section: string }[];
  selectedBrandTitle?: string | null;
  setSelectedBrandTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
  ready?: boolean;
  isBackward?: boolean;
  direction: "left" | "right";
  fromSection: Section;
  toSection: Section;
}

export default function NavbarSecond({
  navOptions,
  selectedBrandTitle,
  setSelectedBrandTitle,
  setActiveSection,
  ready = false,
  isBackward = false,
  fromSection,
  toSection,
  direction,
}: NavbarSecondProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [showTitle, setShowTitle] = useState(true);
  const [currentPath, setCurrentPath] = useState(pathname);
  const [showDelayedBackward, setShowDelayedBackward] = useState(false);
  const [customSliceOffset, setCustomSliceOffset] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (direction === "left") {
      if (fromSection === "projects" && toSection === "home") {
        setCustomSliceOffset(4);
      } else if (fromSection === "aboutUs" && toSection === "home") {
        setCustomSliceOffset(3);
      } else if (fromSection === "brands" && toSection === "home") {
        setCustomSliceOffset(2);
      } else {
        return;
      }

      const timeout = setTimeout(() => {
        setCustomSliceOffset(null);
      }, 2400);

      return () => clearTimeout(timeout);
    }
  }, [direction, fromSection, toSection]);

  useEffect(() => {
    if (isBackward && fromSection === "contact" && toSection === "home") {
      setShowDelayedBackward(false);
      const timer = setTimeout(() => {
        setShowDelayedBackward(true);
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setShowDelayedBackward(true);
    }
  }, [isBackward, fromSection, toSection]);

  const locale = currentPath.split("/")[1];

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const currentIndex = navOptions.findIndex(
    (option) => currentPath === option.route
  );

  const sectionsInPath =
    currentIndex !== -1 ? navOptions.slice(0, currentIndex + 1) : [];

  const sliceStart =
    direction === "left"
      ? customSliceOffset !== null
        ? currentIndex + customSliceOffset
        : currentPath === `/${locale}` || currentPath === "/"
        ? currentIndex + 1
        : currentIndex + 2
      : currentIndex + 1;

  const remainingOptions = navOptions.slice(sliceStart);

  const leftPosition =
    currentPath === "/"
      ? "30px"
      : currentPath.includes("brands")
      ? "60px"
      : currentPath.includes("about-us")
      ? "90px"
      : currentPath.includes("projects")
      ? "120px"
      : currentPath.includes("contact")
      ? "150px"
      : "30px";

  const rightPosition =
    currentPath === "/"
      ? "150px"
      : currentPath.includes("brands")
      ? "120px"
      : currentPath.includes("about-us")
      ? "90px"
      : currentPath.includes("projects")
      ? "60px"
      : currentPath.includes("contact")
      ? "30px"
      : "150px";

  const handleLinkClick = (route: string, section: string) => {
    setSelectedBrandTitle(null);
    setActiveSection(section as Section);
    setCurrentPath(route);
    router.push(route);
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
            Espai Rö {direction} {fromSection} to {toSection} {ready.valueOf()}
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
          </div>
        </div>
      )}

      {ready && !pathname.includes("brands") && (
        <div className="fixed left-0 z-[100000] h-screen flex">
          {sectionsInPath.map((option) => (
            <div
              key={option.section}
              className={`transition duration-300 hover:bg-[#3F4751] h-full w-[30px] border-r border-[#3F4751] flex items-center ${
                currentPath === option.route ? "bg-[#3F4751]" : "bg-[#E0E0E0]"
              }`}
              onClick={() => handleLinkClick(option.route, option.section)}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`pt-[30px] font-regular w-full h-full flex items-center lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] rotate-180 transition duration-300 ${
                  currentPath === option.route ? "text-white" : "text-[#3F4751]"
                } hover:text-white`}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              >
                {option.label}
                {currentPath.includes("brands") && selectedBrandTitle && (
                  <>
                    <span className="my-[7px] text-white">|</span>
                    <span className="text-white">{selectedBrandTitle}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isBackward &&
        showDelayedBackward &&
        !(
          (fromSection === "contact" && toSection === "brands") ||
          (fromSection === "projects" && toSection === "brands")
        ) && (
          <div className="fixed right-0 z-[100000] h-screen flex">
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
        )}
    </>
  );
}
