"use client";

import { useTranslations } from "next-intl";
import { HomePageWp } from "../_interfaces/wordpress-components";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          className="h-full w-full"
        />
        <div className="font-regular absolute bottom-[50px] left-[50px] text-white text-[18px] leading-[22px]">
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
            <p className="text-[18px} leading-[22px] tracking-[-0.04em]">
              Showroom & fine
              <br />
              craftsmanship products.
            </p>
            <AnimatePresence>
              {isDescriptionVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="custom-text-home pt-[20px] lg:w-[335px] font-regular text-white text-[18px] leading-[22px]"
                  dangerouslySetInnerHTML={{
                    __html: home_information.description,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverHome;
