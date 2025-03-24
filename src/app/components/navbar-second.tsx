"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarSecondProps {
  navOptions: { label: string; route: string; section: string }[];
}

export default function NavbarSecond({ navOptions }: NavbarSecondProps) {
  const pathname = usePathname();

  const currentIndex = navOptions.findIndex((option) =>
    pathname.includes(option.section)
  );
  const sectionsInPath =
    currentIndex !== -1 ? navOptions.slice(0, currentIndex + 1) : [];
  const remainingOptions = navOptions.slice(currentIndex + 1);

  const leftPosition =
    pathname === "/" ? "50px" :
    pathname.includes("brands") ? "60px" :
    pathname.includes("about-us") ? "90px" :
    pathname.includes("projects") ? "120px" :
    pathname.includes("contact") ? "150px" : "50px";

  return (
    <>
      <Link href={'/'}>
        <h1
          className="fixed top-[50px] text-white text-[30px] leading-[30px] font-regular tracking-[-0.05em] z-[100000]"
          style={{ left: leftPosition }}
        >
          Espai Rö
        </h1>
      </Link>
      <div className="fixed left-0 z-[100000] h-screen flex">
        {sectionsInPath.map((option) => (
          <div
            key={option.section}
            className={`h-full w-[30px] border-r border-[#3F4751] text-center ${
              pathname.includes(option.section)
                ? "bg-[#3F4751]"
                : "bg-[#E0E0E0]"
            }`}
          >
            <Link
              href={option.route}
              className={`font-regular h-full lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] text-start pt-[48px] font-medium rotate-180 transition duration-300 ${
                pathname.includes(option.section)
                  ? "text-white hover:text-gray-300"
                  : "text-gray-600 hover:text-black"
              }`}
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
      <div className="fixed right-0 z-[1000] h-screen">
        <div className="h-full bg-[#E0E0E0] flex">
          {remainingOptions.map((option, index) => (
            <div
              key={option.section}
              className={`h-full w-[30px] text-center ${
                remainingOptions.length === 1 ? "" : "border-l border-[#3F4751]"
              }`}
            >
              <Link
                href={option.route}
                className="font-regular h-full lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] text-start pt-[48px] text-gray-600 hover:text-black transition duration-300 font-medium rotate-180"
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