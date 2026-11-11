"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/navigation";

interface MenuLink {
  title: string;
  url: string;
}

export interface MenuMobileProps {
  links: MenuLink[];
  locale: "en" | "es" | "de";

  buttonClassName?: string;

  hideOnBrands?: boolean;
}

const LOCALES = [
  { code: "es", label: "ESP" },
  { code: "en", label: "ENG" },
] as const;

export function MenuMobile({
  links,
  locale,
  buttonClassName = "fixed bottom-[33px] right-[30px]",
  hideOnBrands = true,
}: MenuMobileProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  if (hideOnBrands && pathname.includes("/brands")) {
    return null;
  }

  const close = () => setMenuOpen(false);

  return (
    <>
      <button
        className={`${buttonClassName} z-[300000] w-[82px] h-[82px] bg-[#3F4751] rounded-full flex items-center justify-center`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <img
          src={menuOpen ? "/images/less.svg" : "/images/more.svg"}
          alt=""
          className="w-auto h-auto"
        />
      </button>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[200000] bg-black bg-opacity-50"
          onClick={close}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-[200000] w-full h-full bg-[#E0E0E0] transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col flex-grow">
            <div className="pl-[28px] items-center flex justify-between h-[50px]">
              <Link href="/" onClick={close}>
                <p className="font-regular text-[16px] leading-[16px] tracking-[-0.04em]">
                  Espai Rö
                </p>
              </Link>
            </div>

            <div className="flex flex-col justify-end">
              <nav>
                <hr className="border-t border-black border-1" />
                {links.map((link) => (
                  <div key={link.url}>
                    <Link
                      className="pl-[28px] hover:bg-[#3F4751] hover:text-[#E0E0E0] block font-regular text-[40px] py-[20px] leading-[48px] tracking-[-0.05em]"
                      href={link.url}
                      onClick={close}
                    >
                      {link.title}
                    </Link>
                    <hr className="border-t border-black border-1" />
                  </div>
                ))}
              </nav>

              <div className="pl-[28px] pt-[28px] flex items-center font-regular text-[18px] leading-[25px] tracking-[-0.04em] text-[#3F4751]">
                {LOCALES.map(({ code, label }, i) => (
                  <React.Fragment key={code}>
                    {i > 0 && <span className="mx-[4px]">|</span>}
                    <Link
                      href={pathname}
                      locale={code}
                      onClick={close}
                      className={locale === code ? "opacity-100" : "opacity-40"}
                    >
                      {label}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
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

export default MenuMobile;
