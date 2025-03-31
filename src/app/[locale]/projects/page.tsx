import { getWordPressCustomPage } from "@/app/_services/api";
import Cover from "@/app/components/cover";
import ProjectsInformation from "@/app/components/project-information";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

// interface Props {
//   projects_information: ProjectsPageWp;
// }

//  function Projects({ projects_information }: Props) {
async function Projects(nextParams: {
  params: { locale: "es" | "de" | "en" };
}) {
  const {
    params: { locale },
  } = nextParams;
  const data = await getWordPressCustomPage(locale, "projects");
  const { acf } = data;
  const { projects_information } = acf;

  const t = await getTranslations();
  return (
    <div className="w-full page-Projects">
      <div className="sticky top-[0px] z-[10] container lg:hidden bg-[#3F4751] flex items-center">
        <span className="font-regular text-[#E0E0E0] py-[18px] text-[16px] leading-[20px] tracking-[-0.05em]">
          {`${t("header.projects")}`}
        </span>
      </div>
      <ProjectsInformation
        reverseLayout={true}
        projects_information={projects_information}
      />
      <section className="pt-[30px] pl-[30px] pb-[50px]">
        <div className="flex flex-col">
          <label className="font-bold text-[14px] leading-[18px] tracking-[-0.05em]">
            Espai Rö
          </label>
          <p className="text-[14px] leading-[18px] tracking-[-0.05em]">
            Showroom y Estudio <br /> de Arquitectura
          </p>
          <div className="flex flex-col pt-[30px]">
            <Link
              href={`mailto:info@espairo.com`}
              className="text-[14px] leading-[18px] tracking-[-0.05em]"
            >
              info@espairo.com
            </Link>
            <div className="w-full flex justify-between">
              <Link
                href={"https://www.instagram.com/espai_ro/"}
                target="_blank"
                className="text-[14px] leading-[18px] tracking-[-0.05em]"
              >
                ig: @espai_ro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
