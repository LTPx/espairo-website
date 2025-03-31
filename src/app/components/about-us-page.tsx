import { AboutUsPageWp } from "@/app/_interfaces/wordpress-components";
import AboutUsCard from "@/app/components/aboutUs-card";
import AuthorCard from "@/app/components/author-card";
import Cover from "@/app/components/cover";
import AboutUsSecondCard from "./aboutUs-second-card";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import MenuLateral from "./menu-lateral";

interface Props {
  aboutUs_information: AboutUsPageWp;
}

function AboutUsPage(props: Props) {
  const { aboutUs_information } = props;
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/es/about-us") {
      document.body.classList.add("no-scroll");
      return () => {
        document.body.classList.remove("no-scroll");
      };
    }
  }, [pathname]);

  const leftMenuLinks = [
    { href: "/es/brands", label: "Brands" },
    { href: "/es/about-us", label: "Nosotros" },
  ];

  const rightMenuLinks = [
    { href: "/es/projects", label: "Proyectos" },
    { href: "/es/contact", label: "Contacto" },
  ];

  return (
    <div className="relative h-[100vh] flex">
      <MenuLateral links={leftMenuLinks} />
      <div className="flex-1 overflow-y-auto pb-[60px]">
        <Cover media={aboutUs_information.cover_page} />
        <section className="pt-[40px] lg:pt-[100px]">
          <AboutUsCard
            image={aboutUs_information.first_information_section.image}
            title={aboutUs_information.first_information_section.title}
            description={aboutUs_information.first_information_section.description}
          />
        </section>
        <section className="pt-[100px]">
          <img
            src={aboutUs_information.first_image}
            className="h-[800px] object-cover w-full"
          />
        </section>
        <div
          className="custom-title-authors lg:pt-[50px] font-regular lg:pr-[53px] lg:pl-[30px]"
          dangerouslySetInnerHTML={{
            __html: aboutUs_information.authors_section.title_section,
          }}
        />
        <section className="pl-[30px] pr-[30px] grid grid-cols-1 gap-[40px] lg:gap-[50px] lg:grid-cols-2 pt-[40px] lg:pt-[140px]">
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
            src={aboutUs_information.second_image}
            className="h-[800px] object-cover w-full"
          />
        </section>
        <section className="pt-[80px]">
          <AboutUsSecondCard
            image={aboutUs_information.second_information_section.image}
            title={aboutUs_information.second_information_section.title}
            description={aboutUs_information.second_information_section.description}
          />
        </section>
        <section className="pt-[100px]">
          <img
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
        <section className="pt-[100px] mb-[250px]">
          <img
            src={aboutUs_information.last_image}
            className="h-[800px] object-cover w-full"
          />
        </section>
      </div>
      <MenuLateral links={rightMenuLinks} />
    </div>
  );
}

export default AboutUsPage;
