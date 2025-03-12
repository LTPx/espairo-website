"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface LinksFooter {
  title: string;
  url: string;
}

interface FooterProps {
  // links: LinksFooter[];
}

export function Footer(props: FooterProps) {
  // const { links } = props;
  const currentYear = new Date().getFullYear();
  const t = useTranslations();
  const [showContact, setShowContact] = useState(false);

  const handleContactClick = () => {
    setShowContact((prev) => !prev);
  };

  const linksFooter = [
    { title: `${t("footer.home")}`, url: "/" },
    { title: `${t("footer.projects")}`, url: "/projects" },
    { title: `${t("footer.about-us")}`, url: `/about-us` },
    { title: `${t("footer.blog")}`, url: "/news" },
  ];

  const languages = ["/es", "/en", "/de"];

  return (
    <>
      <footer className="lg:bg-body pt-[20px] pb-[40px] px-[30px]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-[60px]">
            <div className="flex gap-[40px]">
              <label className="text-[14px] leading-[18px] tracking-[-0.04em]">
                Espai Rö
              </label>
              <p className="text-[14px] leading-[18px] tracking-[-0.04em] w-[156px]">
                Showroom & fine craftsmanship products.
              </p>
            </div>
            <div className="flex flex-col lg:flex-no-wrap lg:flex-row gap-[0px] lg:gap-[5px]">
              <Link
                href={"/legal-notice"}
                className="text-[14px] leading-[18px] tracking-[-0.04em] cursor-pointer hover:underline"
              >
                {`${t("footer.legal-notice")} |`}
              </Link>
              <Link
                href={"/cookies-policy"}
                className="text-[14px] leading-[18px] tracking-[-0.04em] cursor-pointer hover:underline"
              >
                {`${t("footer.cookies-policy")} |`}
              </Link>
              <Link
                href={"/privacy-policy"}
                className="text-[14px] leading-[18px] tracking-[-0.04em] cursor-pointer hover:underline"
              >
                {`${t("footer.privacy-policy")}`}
              </Link>
            </div>
          </div>
          <div className="flex gap-[55px]">
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
            <div className="flex flex-col">
              <Link
                href={`mailto:info@espairo.com`}
                className="text-[14px] leading-[18px] tracking-[-0.04em]"
              >
                info@espairo.com
              </Link>
              <Link
                href={"/"}
                target="_blank"
                className="text-[14px] leading-[18px] tracking-[-0.04em]"
              >
                ig: @espai_ro
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
