"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BrandsPageWp, BrandsWp } from "../_interfaces/wordpress-components";
import BrandCard from "./brand-card";
import ClientBrands from "./client-brands";
import React from "react";

interface BrandsPageProps {
  brands_information: BrandsPageWp;
  allCategories: any;
  setSelectedBrandTitle: React.Dispatch<React.SetStateAction<string | null>>;
}

function BrandsPage(props: BrandsPageProps) {
  const { brands_information, allCategories, setSelectedBrandTitle } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Estado de la categoría seleccionada
  const pathname = usePathname();

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

  const calculateScrollPosition = (index: number) => {
    return index === 0 ? 0 : index * window.innerHeight;
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
    console.log("index-r", index);
    const scrollPosition = calculateScrollPosition(index + 1);
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  const onBrandClick = (selectedBrand: BrandsWp) => {
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Brand:", selectedBrand.title);
    setSelectedBrandTitle(selectedBrand.title); 
    console.log(filteredBrands)
    const realIndex = filteredBrands.findIndex((b) => {
      console.log("Brand in iteration:", b.title);
      console.log("Selected Brand Title:", selectedBrand.title); 
      return b.title === selectedBrand.title;
    });    
    console.log("Real Index:", realIndex);

    if (realIndex !== -1) {
      setTriggeredByClick(true);
      setCurrentIndex(realIndex);
      setCurrentIndex(realIndex);
      scrollToBrand(realIndex);
    }
  };

  const [hasMounted, setHasMounted] = useState(false);
  const [triggeredByClick, setTriggeredByClick] = useState(false);
  
  useEffect(() => {
    if (hasMounted && !triggeredByClick) {
      scrollToBrand(currentIndex);
    }
    setTriggeredByClick(false);
  }, [currentIndex]);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const goToNextBrand = () => {
    if (currentIndex < filteredBrands.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedBrandTitle(filteredBrands[nextIndex].title); 
    }
  };

  const goToPreviousBrand = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedBrandTitle(filteredBrands[prevIndex].title); 
    }
  };

  return (
    <div className="page-Brands lg:pl-[30px] lg:pr-[90px] relative h-screen">
      <div className="relative h-full">
        <ClientBrands
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
              setSelectedBrandTitle(null);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default BrandsPage;
