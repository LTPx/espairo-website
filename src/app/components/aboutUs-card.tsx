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
}

function AboutUsCard(props: AboutUsCardProps) {
  const { imageHover, image, title, className, date, description, url } = props;
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-[15px] lg:gap-[0px] lg:grid lg:grid-cols-2 lg:h-full">
      <img
        src={image}
        alt="base image"
        className={`h-[500px] lg:h-[901px] w-[689] object-cover`}
      />
      <div className="pl-[30px] pr-[89px] flex flex-col lg:justify-between">
        {title && (
          <h1 className="font-mediumFont text-[40px] leading-[44px] lg:text-[40px] lg:leading-[44px] tracking-[-0.05em]">
            {title}
          </h1>
        )}
        <div className="hidden lg:flex flex-col pr-[50px]">
          {description && (
            <div
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
