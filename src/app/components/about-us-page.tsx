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
import { useEffect, useRef } from "react";
import MenuLateral from "./menu-lateral";
import useAOSInScrollContainer from "./scroll-component";
import { usePathname } from "next/navigation";
import Footer from "./footer";

interface Props {
  aboutUs_information: AboutUsPageWp;
  ready?: boolean;
}

function AboutUsPage(props: Props) {
  const { aboutUs_information, ready } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // useEffect(() => {
  //   if (pathname === "/es/about-us") {
  //     document.body.classList.add("no-scroll");
  //     return () => {
  //       document.body.classList.remove("no-scroll");
  //     };
  //   }
  // }, [pathname]);

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
      mirror: false,
      disableMutationObserver: true,
    });
  }, []);

  useAOSInScrollContainer(scrollContainerRef);

  const leftMenuLinks = [
    { href: "/es/brands", label: "Brands" },
    { href: "/es/about-us", label: "Nosotros" },
  ];

  // const t = await getTranslations();
  return (
    <div className="relative h-[100vh] ml-[30px] w-[calc(100%-30px)] flex bg-body">
      <MenuLateral
        links={leftMenuLinks}
        ready={ready}
        activeLink="/es/about-us" // forzar que "Nosotros" aparezca activo
      />{" "}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar"
      >
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
            description={
              aboutUs_information.last_information_section.description
            }
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
        <Footer />
      </div>
    </div>
  );
}

export default AboutUsPage;
