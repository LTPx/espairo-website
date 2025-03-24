"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BrandsPageWp, BrandsWp } from "../_interfaces/wordpress-components";
import BrandCard from "./brand-card";
import ClientBrands from "./client-brands";
import React from "react";

interface BrandsPageProps {
  brands_information: BrandsPageWp;
  mergedCategories: any;
  brands: BrandsWp[];
}

function BrandsPage(props: BrandsPageProps) {
  const { brands_information, mergedCategories, brands } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathname = usePathname();

  const calculateScrollPosition = (index: number) => {
    return index * window.innerHeight;
  };

   useEffect(() => {
    if (pathname === "/es/brands") {
      document.body.classList.add("no-scroll");
      return () => {
        document.body.classList.remove("no-scroll");
      };
    }
  }, [pathname]);

  const scrollToBrand = (index: number) => {
    console.log('index-r',index)
    const scrollPosition = calculateScrollPosition(index);
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  const onBrandClick = (index: number) => {
    setCurrentIndex(index + 1);
    console.log('index-c',index)
  };

  useEffect(() => {
    scrollToBrand(currentIndex);
  }, [currentIndex]);

  const goToNextBrand = () => {
    if (currentIndex < brands.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    }
  };

  const goToPreviousBrand = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="page-Brands lg:pl-[30px] lg:pr-[90px] relative h-screen">
      <div className="relative h-full">
        <ClientBrands
          brands_information={brands_information}
          categories={mergedCategories}
          onBrandClick={onBrandClick}
        />
      </div>
      {brands_information.brand.map((brand, index) => (
        <div key={index} className="brand-slug-page h-[100vh]">
          <BrandCard
            images={brand.images_brand}
            title={brand.title}
            description={brand.description}
            urlBrand={brand.url_brand}
            category={brand.category_brand.name}
            index={index}
            totalBrands={brands_information.brand.length}
            onNext={goToNextBrand}
            onPrevious={goToPreviousBrand}
          />
        </div>
      ))}
    </div>
  );
}

export default BrandsPage;
