"use client";

import React, { useEffect } from "react";
import { HomePageWp } from "../_interfaces/wordpress-components";

interface Props {
  home_information: HomePageWp;
}

function Home({ home_information }: Props) {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div className="relative w-full">
      <h1 className="absolute left-[30px] top-[20px] text-[#E0E0E0] text-[16px] leading-[16px] font-regular tracking-[-0.04em] z-[100]">
        Espai Rö
      </h1>
      <img
        src={home_information.cover_page.url}
        alt="Espai Rö"
        className="w-full object-cover"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      />
      <div className="font-regular absolute bottom-[45px] lg:bottom-[30px] left-[30px] text-white text-[18px] leading-[22px]">
        <div className="pt-[15px]">
          <p className="text-[#E0E0E0] text-[16px] leading-[20px] lg:text-[18px] lg:leading-[22px] tracking-[-0.04em]">
            Showroom & <br className="lg:hidden" /> fine
            <br className="hidden lg:block" />
            craftsmanship <br className="lg:hidden" /> products.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
