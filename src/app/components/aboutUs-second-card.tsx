"use client";

import { useTranslations } from "next-intl";

interface AboutUsSecondCardProps {
  image?: string;
  title?: string;
  description?: string;
  reverseLayout?: boolean;
}

function AboutUsSecondCard({
  image,
  title,
  description,
  reverseLayout,
}: AboutUsSecondCardProps) {
  const t = useTranslations();

  return (
    <div
      className={`flex flex-col gap-[40px] lg:gap-[50px] lg:grid lg:grid-cols-2 lg:h-full`}
    >
      <div
        className={`px-[27px] lg:px-[0px] flex flex-col lg:justify-between ${
          reverseLayout ? "lg:pr-[30px]" : "lg:pl-[30px]"
        }`}
      >
        <div></div>
        <div className="flex flex-col gap-[30px] lg:gap-[50px]">
          {title && (
            <div
              data-aos="fade-up"
              className="title-card font-regular"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          )}
          <div className="lg:container lg:flex flex-col lg:pr-[50px]">
            {description && (
              <div
                data-aos="fade-up"
                className="description-second-card font-regular"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className={`w-full ${reverseLayout ? "order-first" : "order-last"}`}>
        <img
          data-aos="fade-up"
          src={image}
          alt="base image"
          className="h-[550px] lg:h-[901px] w-full object-cover"
        />
      </div>
    </div>
  );
}

export default AboutUsSecondCard;
