import { getWordPressCustomPage } from "@/app/_services/api";
import AboutUsCard from "@/app/components/aboutUs-card";
import AuthorCard from "@/app/components/author-card";
import Cover from "@/app/components/cover";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

async function AboutUs(nextParams: { params: { locale: "es" | "de" | "en" } }) {
  const {
    params: { locale },
  } = nextParams;
  const t = await getTranslations();
  const data = await getWordPressCustomPage(locale, "about-us");
  const { acf } = data;
  const { aboutUs_information } = acf;

  return (
    <div className="page-AboutUs">
      <div className="container lg:hidden bg-[#3F4751] flex items-center">
        <span className="font-regular text-white py-[18px] text-[16px] leading-[20px] tracking-[-0.05em]">
          {`${t("header.about-us")}`}
        </span>
      </div>
      <Cover media={aboutUs_information.cover_page} />
      <section className="pt-[40px] lg:pt-[70px]">
        <AboutUsCard
          image={aboutUs_information.first_information_section.image}
          title={aboutUs_information.first_information_section.title}
          description={
            aboutUs_information.first_information_section.description
          }
        />
      </section>
      <section className="pt-[70px]">
        <img
          src={aboutUs_information.first_image}
          className="h-[800px] object-cover w-full"
        />
      </section>
      <section className="grid grid-cols-2">
        {aboutUs_information.authors_section.authors.map((author, index) => (
          <AuthorCard
            key={index}
            authorName={author.author_name}
            description={author.author_description}
          />
        ))}
      </section>
      <section className="pt-[70px]">
        <img
          src={aboutUs_information.second_image}
          className="h-[800px] object-cover w-full"
        />
      </section>
      <AboutUsCard
        image={aboutUs_information.second_information_section.image}
        title={aboutUs_information.second_information_section.title}
        description={aboutUs_information.second_information_section.description}
      />
      <section className="pt-[70px]">
        <img
          src={aboutUs_information.last_image}
          className="h-[800px] object-cover w-full"
        />
      </section>
    </div>
  );
}

export default AboutUs;
