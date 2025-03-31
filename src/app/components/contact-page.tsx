import { ContactPageWp } from "@/app/_interfaces/wordpress-components";
import { getWordPressCustomPage } from "@/app/_services/api";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import MenuLateral from "./menu-lateral";

interface Props {
  contact_information: ContactPageWp;
}

function ContactPage({ contact_information }: Props) {
  // const t = await getTranslations();
  const leftMenuLinks = [
    { href: "/es/brands", label: "Brands" },
    { href: "/es/about-us", label: "Nosotros" },
    { href: "/es/projects", label: "Proyectos" },
    { href: "/es/contact", label: "Contacto" },
  ];
  return (
    <div className="flex relative">
      <Link href={"/"}>
        <h1 className="hidden lg:block absolute top-[30px] left-[150px] text-[#E0E0E0] text-[30px] leading-[30px] font-regular tracking-[-0.05em] z-[10000000]">
          Espai Rö
        </h1>
      </Link>
      <MenuLateral links={leftMenuLinks} />
      <div className="lg:h-screen lg:flex w-full no-scrollbar">
        <div className="lg:w-1/2 h-full">
          <img
            src={contact_information.cover_page.url}
            alt="Espai Rö contact"
            className="w-full h-[426px] lg:h-full object-cover"
          />
        </div>
        <div className="lg:pl-[30px] lg:py-[30px] pt-[30px] lg:w-1/2 h-full lg:bg-[#3F4751] lg:text-white flex flex-col lg:gap-[0px] justify-between">
          <div className="flex flex-col gap-[40px]">
            <div
              className="custom-subTitle-contact"
              dangerouslySetInnerHTML={{
                __html: contact_information.sub_title,
              }}
            />
            <div
              className="custom-title-contact"
              dangerouslySetInnerHTML={{ __html: contact_information.title }}
            />
          </div>
          <section className="flex flex-col gap-[22px] lg:gap-12">
            <div
              className="custom-content-contact"
              dangerouslySetInnerHTML={{
                __html: contact_information.description,
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
