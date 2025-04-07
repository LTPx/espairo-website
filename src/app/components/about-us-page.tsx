import { AboutUsPageWp } from "@/app/_interfaces/wordpress-components";
import { getWordPressCustomPage } from "@/app/_services/api";
import AboutUsCard from "@/app/components/aboutUs-card";
import AuthorCard from "@/app/components/author-card";
import Cover from "@/app/components/cover";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import AboutUsSecondCard from "./aboutUs-second-card";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface Props {
  aboutUs_information: AboutUsPageWp;
}

function AboutUsPage(props: Props) {
  const { aboutUs_information } = props;

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", offset: 80, once: false });
  }, []);

  // const t = await getTranslations();
  return (
    <div className="hide-title-trigger-container page-AboutUs relative lg:pl-[60px] lg:pr-[60px]">
      <Cover media={aboutUs_information.cover_page} />
      <section className="pt-[40px] lg:pt-[100px]">
        <AboutUsCard
          image={aboutUs_information.first_information_section.image}
          title={aboutUs_information.first_information_section.title}
          description={
            aboutUs_information.first_information_section.description
          }
        />
      </section>
      <section className="pt-[100px]">
        <img
          data-aos="fade-up"
          src={aboutUs_information.first_image}
          className="h-[800px] object-cover w-full"
        />
      </section>
      <div
        data-aos="fade-up"
        className="hide-title-trigger custom-title-authors lg:pt-[50px] font-regular lg:pr-[53px] lg:pl-[30px]"
        dangerouslySetInnerHTML={{
          __html: aboutUs_information.authors_section.title_section,
        }}
      />
      <section className="hide-title-trigger pl-[30px] pr-[30px] grid grid-cols-1 gap-[40px] lg:gap-[50px] lg:grid-cols-2 pt-[40px] lg:pt-[140px]">
        {aboutUs_information.authors_section.authors.map((author, index) => (
          <AuthorCard
            key={index}
            authorName={author.author_name}
            description={author.author_description}
          />
        ))}
      </section>
      <section className="pt-[80px]">
        <img
          data-aos="fade-up"
          src={aboutUs_information.second_image}
          className="h-[800px] object-cover w-full"
        />
      </section>
      <section className="hide-title-trigger pt-[80px]">
        <AboutUsSecondCard
          image={aboutUs_information.second_information_section.image}
          title={aboutUs_information.second_information_section.title}
          description={
            aboutUs_information.second_information_section.description
          }
        />
      </section>
      <section className="pt-[100px]">
        <img
          data-aos="fade-up"
          src={aboutUs_information.third_image}
          className="h-[800px] object-cover w-full"
        />
      </section>
      <section className="pt-[40px] lg:pt-[100px]">
        <AboutUsSecondCard
          image={aboutUs_information.last_information_section.image}
          title={aboutUs_information.last_information_section.title}
          description={aboutUs_information.last_information_section.description}
          reverseLayout={true}
        />
      </section>
      <section className="pt-[100px]">
        <img
          data-aos="fade-up"
          src={aboutUs_information.last_image}
          className="h-[800px] object-cover w-full"
        />
      </section>
    </div>
  );
}

export default AboutUsPage;
