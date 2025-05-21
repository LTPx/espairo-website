import { ContactPageWp } from "@/app/_interfaces/wordpress-components";
import { getWordPressCustomPage } from "@/app/_services/api";
import { Metadata } from "next";
import Link from "next/link";
import MenuLateral from "./menu-lateral";
import { useTranslations } from "next-intl";

interface Props {
  contact_information: ContactPageWp;
  ready?: boolean;
  locale: "en" | "es" | "de";
}

function ContactPage({ contact_information, ready, locale }: Props) {
  const t = useTranslations();
  const allLinks = [
    { href: `/${locale}/contact`, label: `${t("header.contact")}` },
  ];

  return (
    <div className="relative flex h-[100vh] ml-[90px] w-[calc(100%-90px)] bg-body">
      <MenuLateral links={allLinks} activeLink="/es/contact" />
      <div className="flex-1 overflow-y-auto">
        <div className="lg:h-screen lg:flex">
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
    </div>
  );
}

export default ContactPage;
