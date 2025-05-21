"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { BrandsPageWp, BrandsWp } from "../_interfaces/wordpress-components";
import BrandCard from "./brand-card";
import ClientBrands from "./client-brands";
import React from "react";
import MenuLateral from "./menu-lateral";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface BrandsPageProps {
  brands_information: BrandsPageWp;
  allCategories: any;
  setSelectedBrandTitle: React.Dispatch<React.SetStateAction<string | null>>;
  locale: "en" | "es" | "de";
}

function BrandsPage(props: BrandsPageProps) {
  const { brands_information, allCategories, setSelectedBrandTitle, locale } =
    props;
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const clientBrandsRef = useRef<HTMLDivElement | null>(null);
  const [selectedBrandTitle, setSelectedBrandTitleTest] = useState<
    string | null
  >(null);
  const t = useTranslations();

  const brands: BrandsWp[] = brands_information.brand;

  const categories = Array.from(
    new Map(
      brands_information.brand.map((brand) => [
        brand.category_brand.term_id,
        {
          term_id: brand.category_brand.term_id,
          name: brand.category_brand.name,
        },
      ])
    ).values()
  );

  const mergedCategories = allCategories
    .map((cat: any) => {
      const existingCategory = categories.find((c) => c.term_id === cat.id);
      return {
        term_id: cat.id,
        name: cat.name,
        existsInBrands: !!existingCategory,
      };
    })
    .sort((a: any, b: any) => a.term_id - b.term_id);

  const filteredBrands = selectedCategory
    ? brands.filter(
        (brand) => brand.category_brand.term_id === selectedCategory
      )
    : brands;

  useEffect(() => {
    if (pathname === `/${locale}/brands`) {
      document.body.classList.add("no-scroll");
      return () => {
        document.body.classList.remove("no-scroll");
      };
    }
  }, [pathname]);

  const scrollToBrand = (index: number) => {
    if (index !== null) {
      const brandElement = document.querySelectorAll(".brand-slug-page")[index];
      if (brandElement) {
        brandElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const onBrandClick = (selectedBrand: BrandsWp) => {
    setSelectedBrandTitleTest(selectedBrand.title);
    const realIndex = filteredBrands.findIndex(
      (b) => b.title === selectedBrand.title
    );

    if (realIndex !== -1) {
      setCurrentIndex(realIndex);
      scrollToBrand(realIndex);
    }
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (currentIndex !== null) {
      scrollToBrand(currentIndex);
    }
  }, [currentIndex]);

  const goToNextBrand = () => {
    if (currentIndex !== null && currentIndex < filteredBrands.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedBrandTitleTest(filteredBrands[nextIndex].title);
    }
  };

  const goToPreviousBrand = () => {
    if (currentIndex !== null && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedBrandTitleTest(filteredBrands[prevIndex].title);
    }
  };

  const scrollToClientBrands = () => {
    if (clientBrandsRef.current) {
      clientBrandsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setSelectedBrandTitleTest(null);
  };

  const left = [{ href: `/${locale}/brands`, label: `${t("header.brands")}` }];

  const menuRight = [
    { href: `/${locale}/about-us`, label: `${t("header.about-us")}` },
    { href: `/${locale}/projects`, label: `${t("header.projects")}` },
    { href: `/${locale}/contact`, label: `${t("header.contact")}` },
  ];

  return (
    <div className="relative flex h-[100vh]  bg-body">
      <MenuLateral
        links={left}
        scrollToClientBrands={scrollToClientBrands}
        selectedBrandTitle={selectedBrandTitle}
        activeLink="/es/brands"
      />
      <div className="flex-1 overflow-y-auto">
        <div className="no-scroll page-Brands relative h-screen">
          <div className="relative h-full">
            <ClientBrands
              ref={clientBrandsRef}
              brands_information={brands_information}
              categories={mergedCategories}
              onBrandClick={onBrandClick}
              onCategorySelect={setSelectedCategory}
            />
          </div>
          {filteredBrands.map((brand, index) => (
            <div key={index} className="brand-slug-page h-[100vh]">
              <BrandCard
                images={brand.images_brand}
                title={brand.title}
                description={brand.description}
                urlBrand={brand.url_brand}
                category={brand.category_brand.name}
                index={index}
                totalBrands={filteredBrands.length}
                onNext={goToNextBrand}
                onPrevious={goToPreviousBrand}
                onCategoryClick={() => {
                  setSelectedBrandTitleTest(null);
                  scrollToClientBrands();
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <MenuLateral links={menuRight} />
    </div>
  );
}

export default BrandsPage;
