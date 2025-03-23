"use client";

import { useEffect, useRef, useState } from "react";
import { BrandsPageWp, BrandsWp } from "../_interfaces/wordpress-components";
import BrandCard from "./brand-card";
import ClientBrands from "./client-brands";
import React from "react";
import Link from "next/link";

interface BrandsPageProps {
  brands_information: BrandsPageWp;
  mergedCategories: any;
  brands: BrandsWp[];
}

function BrandsPage(props: BrandsPageProps) {
  const { brands_information, mergedCategories, brands } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const brandRefs = useRef(
    brands.reduce((acc: any, brand: BrandsWp) => {
      acc[brand.title] = React.createRef<HTMLDivElement>();
      return acc;
    }, {})
  );

  const scrollToBrand = (brandTitle: string) => {
    const ref = brandRefs.current[brandTitle];
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // useEffect(() => {
  //   document.body.classList.add("no-scroll");
  //   return () => {
  //     document.body.classList.remove("no-scroll");
  //   };
  // }, []);

  // useEffect(() => {
  //   if (brands.length > 0 && brandRefs.current[brands[currentIndex].title]) {
  //     scrollToBrand(brands[currentIndex].title);
  //   }
  // }, [currentIndex, brands]);

  const goToNextBrand = () => {
    if (currentIndex < brands.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <div className="page-Brands lg:pl-[30px] lg:pr-[90px] relative h-screen">
      <div className="relative h-full">
        <ClientBrands
          brands_information={brands_information}
          categories={mergedCategories}
          onBrandClick={scrollToBrand}
        />
        {brands_information.brand.map((brand, index) => (
          <div
            key={index}
            ref={brandRefs.current[brand.title]}
            className="brand-slug-page h-[100vh]"
          >
            <BrandCard
              image={brand.image}
              title={brand.title}
              description={brand.description}
              urlBrand={brand.url_brand}
              category={brand.category_brand.name}
              index={index}
              totalBrands={brands_information.brand.length}
              onNext={goToNextBrand}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandsPage;
