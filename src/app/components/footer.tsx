"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  let footerPadding = "px-[30px]";
  if (pathname === "/es/about-us") {
    footerPadding = "pl-[90px] pr-[90px]";
  } else if (pathname === "/es/projects") {
    footerPadding = "pl-[120px] pr-[60px]";
  }
  if (pathname !== "/es/projects" && pathname !== "/es/about-us") {
    return null;
  }

  return (
    <>
      <footer
        className={`lg:block hidden lg:bg-body pt-[250px] pb-[30px] ${footerPadding}`}
      >
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <label className="text-[14px] leading-[18px] tracking-[-0.04em]">
              Espai Rö
            </label>
            <p className="text-[14px] leading-[18px] tracking-[-0.04em] w-[156px]">
              Showroom & fine craftsmanship products.
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[14px] leading-[18px] tracking-[-0.04em]">
              c/ Ferran Agulló 14
              <br />
              08021 Barcelona
            </p>
            <Link
              className="text-[14px] leading-[18px] tracking-[-0.04em]"
              href={`tel:+34936672962`}
            >
              <p className="text-[14px] leading-[18px] tracking-[-0.04em]">
                (+34)936672962
              </p>
            </Link>
          </div>
          <div className="flex flex-col items-end">
            <Link
              href={`mailto:info@espairo.com`}
              className="text-[14px] leading-[18px] tracking-[-0.04em]"
            >
              info@espairo.com
            </Link>
            <div className="w-full flex justify-between">
              <Link
                href={"https://www.instagram.com/espai_ro/"}
                target="_blank"
                className="text-[14px] leading-[18px] tracking-[-0.04em]"
              >
                ig: @espai_ro
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[0px]">
            <Link
              href={"/legal-notice"}
              className="text-[14px] leading-[18px] tracking-[-0.04em] cursor-pointer hover:underline"
            >
              {`${t("footer.legal-notice")}`}
            </Link>
            <Link
              href={"/cookies-policy"}
              className="text-[14px] leading-[18px] tracking-[-0.04em] cursor-pointer hover:underline"
            >
              {`${t("footer.cookies-policy")}`}
            </Link>
            <Link
              href={"/privacy-policy"}
              className="text-[14px] leading-[18px] tracking-[-0.04em] cursor-pointer hover:underline"
            >
              {`${t("footer.privacy-policy")}`}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
