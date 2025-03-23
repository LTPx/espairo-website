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
      className={`flex flex-col gap-[40px] lg:gap-[50px] lg:grid lg:grid-cols-2 lg:h-full ${
        reverseLayout ? "flex-row-reverse" : ""
      }`}
    >
      <img
        src={image}
        alt="base image"
        className="h-[550px] lg:h-[901px] lg:w-full object-cover"
      />
      <div className="lg:pr-[30px] flex flex-col lg:justify-between">
        {title && (
          <div
            className="title-card font-regular"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        )}
        <div className="container lg:flex flex-col lg:pr-[50px]">
          {description && (
            <div
              className="font-regular"
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
