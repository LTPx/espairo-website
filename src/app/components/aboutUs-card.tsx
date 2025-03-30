"use client";

import { useTranslations } from "next-intl";

interface AboutUsCardProps {
  image?: string;
  title?: string;
  description?: string;
  reverseLayout?: boolean;
}

function AboutUsCard(props: AboutUsCardProps) {
  const { image, title, description, reverseLayout } = props;
  const t = useTranslations();

  return (
    <div
      className={`flex flex-col gap-[30px] lg:gap-[50px] lg:grid lg:grid-cols-2 lg:h-full ${
        reverseLayout ? "" : ""
      }`}
    >
      <img
        src={image}
        alt="base image"
        className="h-[550px] lg:h-[901px] lg:w-full object-cover"
      />
      <div
        className={`px-[27px] lg:pl-[0px] lg:pr-[30px] flex flex-col lg:justify-between ${
          reverseLayout ? "order-first" : "order-last"
        }`}
      >
        {title && (
          <div
            className="title-card font-regular"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        )}
        <div className="pt-[30px] lg:pt-[0px] lg:flex flex-col lg:pr-[50px]">
          {description && (
            <div
              className="description-card font-regular"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutUsCard;
