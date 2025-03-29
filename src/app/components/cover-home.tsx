"use client";

import { useTranslations } from "next-intl";
import { HomePageWp } from "../_interfaces/wordpress-components";
import { useState } from "react";

interface Props {
  home_information: HomePageWp;
}

export function CoverHome(props: Props) {
  const { home_information } = props;
  const t = useTranslations();
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="relative h-[100vh] w-full">
        <img
          src={home_information.cover_page.url}
          alt="Espai Rö"
          className="h-full w-full object-cover"
        />
        <div className="font-regular absolute bottom-[30px] left-[30px] text-white text-[18px] leading-[22px]">
          <img
            src={
              isDescriptionVisible
                ? "/images/arrow-down-home.svg"
                : "/images/arrow-up.svg"
            }
            alt="Toggle Description"
            className="h-[26px] w-[26px] cursor-pointer"
            onClick={toggleDescription}
          />
          <div className="pt-[15px]">
            <p className="text-[#E0E0E0] text-[18px] leading-[22px] tracking-[-0.04em]">
              Showroom & fine
              <br />
              craftsmanship products.
            </p>
            <div
              className={`custom-text-home pt-[20px] lg:w-[335px] font-regular text-white text-[18px] leading-[22px] overflow-hidden transition-all duration-700 ease-in-out ${
                isDescriptionVisible
                  ? "opacity-100 max-h-[500px]"
                  : "opacity-0 max-h-0"
              }`}
              dangerouslySetInnerHTML={{ __html: home_information.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverHome;
