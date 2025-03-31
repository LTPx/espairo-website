import {
  IndividualProjectWp,
  ProjectsPageWp,
} from "@/app/_interfaces/wordpress-components";
import { getWordPressCustomPage } from "@/app/_services/api";
import Cover from "@/app/components/cover";
import Gallery from "@/app/components/gallery";
import ProjectsInformation from "@/app/components/project-information";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props { 
  projects_information: ProjectsPageWp;
}

 function ProjectsPage({ projects_information }: Props) {
  // const t = await getTranslations();
  return (
    <div className="pl-[90px] pr-[30px] w-full page-Projects">
      <div className="container lg:hidden bg-[#3F4751] flex items-center">
        <span className="font-regular text-white py-[18px] text-[16px] leading-[20px] tracking-[-0.05em]">
          {/* {`${t("header.projects")}`} */}
        </span>
      </div>
      <ProjectsInformation projects_information={projects_information} />
      <div></div>
    </div>
  );
}

export default ProjectsPage;
