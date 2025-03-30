import { AboutUsPageWp } from "@/app/_interfaces/wordpress-components";
import { getWordPressCustomPage } from "@/app/_services/api";
import AboutUsCard from "@/app/components/aboutUs-card";
import AboutUsSecondCard from "@/app/components/aboutUs-second-card";
import AuthorCard from "@/app/components/author-card";
import Cover from "@/app/components/cover";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

async function AboutUs(nextParams: { params: { locale: "es" | "de" | "en" } }) {
  const {
    params: { locale },
  } = nextParams;

  const data = await getWordPressCustomPage(locale, "about-us");
  const { acf } = data;
  const { aboutUs_information } = acf;

  // const { aboutUs_information } = props;
  const t = await getTranslations();
  return (
    <div className="page-AboutUs relative lg:pl-[60px] lg:pr-[60px]">
      <div className="container lg:hidden bg-[#3F4751] flex items-center">
        <span className="font-regular text-[#E0E0E0] py-[18px] text-[16px] leading-[20px] tracking-[-0.05em]">
          {`${t("header.about-us")}`}
        </span>
      </div>
      <Cover media={aboutUs_information.cover_page} />
      <section className="pt-[30px] lg:pt-[70px]">
        <AboutUsCard
        reverseLayout={true}
          image={aboutUs_information.first_information_section.image}
          title={aboutUs_information.first_information_section.title}
          description={
            aboutUs_information.first_information_section.description
          }
        />
      </section>
      <div
        className="custom-title-authors px-[27px] pt-[30px] lg:pt-[50px] font-regular lg:pr-[53px] lg:pl-[30px]"
        dangerouslySetInnerHTML={{
          __html: aboutUs_information.authors_section.title_section,
        }}
      />
      <section className="pt-[30px]">
        <img
          src={aboutUs_information.first_image}
          className="h-[300px] lg:h-[800px] object-cover w-full"
        />
      </section>
      <section className="grid grid-cols-1 gap-[40px] lg:gap-[50px] lg:grid-cols-2 pt-[40px] lg:pt-[140px]">
        {aboutUs_information.authors_section.authors.map((author, index) => (
          <React.Fragment key={index}>
            <AuthorCard
              authorName={author.author_name}
              description={author.author_description}
            />
            {index === 0 && (
              <section className="pt-[0px]">
                <img
                  src={aboutUs_information.second_image}
                  className="h-[300px] lg:h-[800px] object-cover w-full"
                />
              </section>
            )}
          </React.Fragment>
        ))}
      </section>
      {/* <section className="pt-[70px]">
      <img
        src={aboutUs_information.second_image}
        className="h-[300px] lg:h-[800px] object-cover w-full"
      />
    </section> */}
      <section className="pt-[30px] lg:pt-[65px]">
        <AboutUsSecondCard
          image={aboutUs_information.second_information_section.image}
          title={aboutUs_information.second_information_section.title}
          description={
            aboutUs_information.second_information_section.description
          }
          reverseLayout={true}
        />
      </section>
      <section className="hidden lg:block pt-[70px]">
        <img
          src={aboutUs_information.third_image}
          className="h-[300px] lg:h-[800px] object-cover w-full"
        />
      </section>
      <section className="pt-[30px] lg:mb-[250px]">
        <img
          src={aboutUs_information.last_image}
          className="h-[300px] lg:h-[800px] object-cover w-full"
        />
      </section>
      <section className="pt-[30px] lg:pt-[70px]">
        <AboutUsSecondCard
          image={aboutUs_information.last_information_section.image}
          title={aboutUs_information.last_information_section.title}
          description={aboutUs_information.last_information_section.description}
        />
      </section>
    </div>
  );
}

export default AboutUs;
