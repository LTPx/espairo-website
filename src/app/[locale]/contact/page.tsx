import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

async function Contact(nextParams: { params: { locale: "es" | "de" | "en" } }) {
  const {
    params: { locale },
  } = nextParams;
  const t = await getTranslations();

  return (
    <div className="lg:h-screen lg:flex">
      <div className="container lg:hidden bg-[#3F4751] flex items-center">
        <span className="font-regular text-white py-[18px] text-[16px] leading-[20px] tracking-[-0.05em]">
          {`${t("header.contact")}`}
        </span>
      </div>
      <div className="lg:w-1/2 h-full">
        <img
          src="https://s3-alpha-sig.figma.com/img/2f73/ae68/76498deda39fd62b36440370acff5970?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gpCeT3DdtPjpdLnYNy27lA59-U1Rvkdsvdanc93rFDPlZiQL4c4R5yJK0BlWBulnm8xL17IGpHVmRlvbH-IVk~2SBmDHB7owekTCt2VQ2JrqzxcyWiX4vbspWAk0IVCPidjHncS~tBH7CyqSt0ENPCx8a-cauF2ZCWj-MsDRJgE94pGO0bYs6~q9eD~L9fPuY0N2GbLLBZ7HZuAC9geL9Z~4E4~YR7XQCQm-7-YJJsrMswi9sApGlFnc2nQoircWqP6R8JZqQVD5ACxg~OefFas-5e6hrzvrMC2aYeciTU9NuNTRbFl8QVNxUYAqTTAVAnhWsUSzNZAPNjn7Nup2yg__"
          alt="Espai Rö"
          className="w-full h-[426px] lg:h-full object-cover"
        />
      </div>
      <div className="container pt-[30px] lg:w-1/2 h-full lg:bg-[#3F4751] lg:text-white flex flex-col lg:gap-[0px] justify-between lg:p-12">
        <h1 className="font-bold lg:font-regular text-[16px] leading-[22px] lg:text-[50px] lg:leading-[55px]">
          Showroom y estudio de arquitectura.
        </h1>
        <section className="flex flex-col gap-[22px] lg:gap-12">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="lg:text-[18px] lg:leading-[24px] text-[14px] leading-[18px] tracking-[-0.04em]">
                c/ Ferran Agulló 14
                <br />
                08021 Barcelona
              </p>
              <Link
                className="lg:text-[18px] lg:leading-[24px] text-[14px] leading-[18px] tracking-[-0.04em]"
                href={`tel:+34936672962`}
              >
                <p className="lg:text-[18px] lg:leading-[24px] text-[14px] leading-[18px] tracking-[-0.04em]">
                  (+34)936672962
                </p>
              </Link>
            </div>
            <div className="flex flex-col">
              <Link
                href={`mailto:info@espairo.com`}
                className="lg:text-[18px] lg:leading-[24px] text-[14px] leading-[18px] tracking-[-0.04em]"
              >
                info@espairo.com
              </Link>
            </div>
          </div>
          <div>
            <label className="font-bold lg:text-[18px] lg:leading-[24px] text-[14px] leading-[18px] tracking-[-0.04em]">
              Horario
            </label>
            <div className="flex flex-col">
              <p className="lg:text-[18px] lg:leading-[24px] text-[14px] leading-[18px] tracking-[-0.04em]">
                Lunes a Viernes
                <br />
                10:00 a 14:00 | 15:00 a 20:00{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-bold lg:text-[18px] lg:leading-[24px] text-[14px] leading-[18px] tracking-[-0.04em]">
              ¡Síguenos!
            </label>
            <Link
              href={"/"}
              target="_blank"
              className="lg:text-[18px] lg:leading-[24px] text-[14px] leading-[18px] tracking-[-0.04em]"
            >
              @espai_ro
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
