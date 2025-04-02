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
        <h1 className="lg:hidden absolute left-[30px] top-[20px] text-[#E0E0E0] text-[16px] leading-[16px] font-regular tracking-[-0.04em] z-[100]">
          Espai Rö
        </h1>
        <div className="font-regular absolute bottom-[45px] lg:bottom-[30px] left-[30px] text-white text-[18px] leading-[22px]">
          <img
            src={
              isDescriptionVisible
                ? "/images/arrow-up.svg"
                : "/images/arrow-down-home.svg"
            }
            alt="Toggle Description"
            className="hidden lg:block h-[26px] w-[26px] cursor-pointer"
            onClick={toggleDescription}
          />
          <div className="pt-[15px]">
            <p className="text-[#E0E0E0] text-[16px] leading-[20px] lg:text-[18px] lg:leading-[22px] tracking-[-0.04em]">
              Showroom & <br className="lg:hidden" /> fine
              <br className="hidden lg:block" />
              craftsmanship <br className="lg:hidden" /> products.
            </p>
            <div
              className={`lg:block hidden custom-text-home lg:w-[335px] font-regular text-white text-[18px] leading-[22px] overflow-hidden transition-all duration-700 ease-in-out ${
                isDescriptionVisible
                  ? "opacity-100 max-h-[500px] visible pt-[20px]"
                  : "opacity-0 max-h-0 invisible h-auto"
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
