"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuLateralProps {
    links: { href: string; label: string }[];
    scrollToClientBrands?: () => void;
    selectedBrandTitle?: string | null;
    ready?: boolean;
    activeLink?: string;  // <-- prop para controlar link activo
  }
  
  export const MenuLateral = ({
    links,
    scrollToClientBrands,
    selectedBrandTitle,
    ready = false,
    activeLink,
  }: MenuLateralProps) => {
    const pathname = usePathname();
  
    const handleLinkClick = (href: string) => {
      scrollToClientBrands && scrollToClientBrands();
    };
  
    return (
      <div className="lg:flex hidden relative z-[1000000]">
        {links.map((link) => {
          // Determinar si es activo por prop o por ruta
          const isActive = activeLink === link.href || pathname === link.href;
  
          // Si es brands y ready, aplicamos clases fijas con z-index alto
          const fixedClasses =
            link.href === "/es/brands" && ready
              ? "fixed left-0 top-0 z-[9999]"
              : "";
  
          return (
            <div
              key={link.href}
              className={`transition duration-300 h-full w-[30px] border-l border-[#3F4751] flex items-center ${fixedClasses} ${
                isActive
                  ? "bg-[#3F4751] text-white"
                  : "bg-[#E0E0E0] text-[#3F4751] hover:bg-[#3F4751] hover:text-white"
              }`}
            >
              <Link
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`pt-[30px] font-regular w-full h-full flex items-center lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] rotate-180 transition duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-[#3F4751] hover:bg-[#3F4751] hover:text-white"
                }`}
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                {link.label}
                {pathname.includes("brands") && selectedBrandTitle && (
                  <>
                    <span className="my-[7px] text-white">|</span>
                    <span className="text-white">{selectedBrandTitle}</span>
                  </>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default MenuLateral;
  
