"use client";

import React, { useRef, useState } from "react";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";

interface MenuTestProps {
  customClassName?: string;
}

export function MenuTest({ customClassName }: MenuTestProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const pathname = usePathname();
  const menuLinks = [
    { title: `${t("header.brands")}`, url: `/brands` },
    { title: `${t("header.about-us")}`, url: `/about-us` },
    { title: `${t("header.projects")}`, url: `/projects` },
    { title: `${t("header.contact")}`, url: "/contact" },
  ];

  const menuButtonClass = customClassName || "fixed bottom-[33px] right-[30px]";

  return (
    <>
      <button
        className={`${menuButtonClass} z-[300000] w-[82px] h-[82px] bg-[#3F4751] rounded-full flex items-center justify-center`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <img
          src={menuOpen ? "/images/less.svg" : "/images/more.svg"}
          alt="Menu Toggle"
          className="w-auto h-auto"
        />
      </button>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[200000] bg-black bg-opacity-50"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-[200000] w-full h-full bg-[#E0E0E0] transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col justify-between" ref={menuRef}>
          <div className="flex flex-col flex-grow">
            <div className="pl-[28px] items-center flex justify-between h-[50px]">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <p className="font-regular text-[16px] leading-[16px] tracking-[-0.04em]">
                  Espai Rö
                </p>
              </Link>
            </div>
            <div className="flex flex-col justify-end">
              <nav>
                <hr className="border-t border-black border-1" />
                {menuLinks.map((link, index) => (
                  <div key={index}>
                    <Link
                      className="pl-[28px] hover:bg-[#3F4751] hover:text-[#E0E0E0] block font-regular text-[40px] py-[20px] leading-[48px] tracking-[-0.05em]"
                      href={link.url}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                    <hr className="border-t border-black border-1" />
                  </div>
                ))}
              </nav>
            </div>
          </div>
          <div className="pl-[22px] pb-[43px] flex flex-col">
            <p className="text-[16px] leading-[20px]">
              Showroom &
              <br />
              fine craftsmanship
              <br />
              products.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuTest;
