"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface AboutUsCardProps {
  imageHover?: string;
  image?: string;
  title?: string;
  date?: string;
  description?: string;
  className?: string;
  url?: string;
  reverseLayout?: boolean;
}

function AboutUsCard(props: AboutUsCardProps) {
  const { imageHover, image, title, className, date, description, url, reverseLayout } = props;
  const t = useTranslations();

  return (
    <div
      className={`flex flex-col-reverse lg:flex-row gap-[40px] lg:gap-[0px] lg:grid lg:grid-cols-2 lg:h-full ${
        reverseLayout ? "flex-row-reverse" : ""
      }`}
    >
      <img
        src={image}
        alt="base image"
        className="h-[550px] lg:h-[901px] w-[689px] object-cover"
      />
      <div className="lg:pr-[89px] flex flex-col lg:justify-between">
        {title && (
          <h1 className="hidden lg:block font-regular text-[40px] leading-[44px] lg:text-[40px] lg:leading-[44px] tracking-[-0.05em]">
            {title}
          </h1>
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
