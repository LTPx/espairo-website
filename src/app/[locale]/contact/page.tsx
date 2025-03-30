import { ContactPageWp } from "@/app/_interfaces/wordpress-components";
import { getWordPressCustomPage } from "@/app/_services/api";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

async function Contact(nextParams: { params: { locale: "es" | "de" | "en" } }) {
  const {
    params: { locale },
  } = nextParams;
  const data = await getWordPressCustomPage(locale, "contact");
  const { acf } = data;
  const { contact_information } = acf;
  const t = await getTranslations();
  return (
    <div className="lg:h-screen lg:flex lg:pl-[120px]">
      <div className="container lg:hidden bg-[#3F4751] flex items-center">
        <span className="font-regular text-white py-[18px] text-[16px] leading-[20px] tracking-[-0.05em]">
          {`${t("header.contact")}`}
        </span>
      </div>
      <div className="lg:w-1/2 h-full">
        <img
          src={contact_information.cover_page.url}
          alt="Espai Rö contact"
          className="w-full h-[426px] lg:h-full object-cover"
        />
      </div>
      <div className="pl-[30px] lg:pl-[30px] lg:py-[30px] pt-[30px] lg:w-1/2 h-full lg:bg-[#3F4751] lg:text-white flex flex-col lg:gap-[0px] justify-between">
        <div className="flex flex-col gap-[40px]">
          <div
            className="custom-subTitle-contact"
            dangerouslySetInnerHTML={{ __html: contact_information.sub_title }}
          />
          <div
            className="hidden lg:block custom-title-contact"
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
  );
}

export default Contact;
