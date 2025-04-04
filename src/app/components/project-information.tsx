"use client";

import {
  IndividualProjectWp,
  ProjectsPageWp,
} from "../_interfaces/wordpress-components";
import { useTranslations } from "next-intl";
import Gallery from "./gallery";
import Cover from "./cover";

interface ProjectsInformationProps {
  projects_information: ProjectsPageWp;
  reverseLayout?: boolean;
}

export function ProjectsInformation({
  projects_information,
  reverseLayout = false,
}: ProjectsInformationProps) {
  const t = useTranslations();
  const projectTitles = projects_information.projects.map(
    (project) => project.title
  );

  return (
    <div className="hide-title-trigger-projects flex flex-col gap-[0px]">
      <div className="lg:hidden sticky top-[70px] z-[10] lg:z-[100000]">
        <div className="left-[0px] absolute z-[10] w-full ">
          <div className="pl-[30px] whitespace-nowrap flex gap-[7px] overflow-x-scroll no-scrollbar">
            {projectTitles.map((title, index) => (
              <button
                key={index}
                className="backdrop-blur-sm font-regular uppercase inline-block flex items-center justify-center font-medium text-[15px] leading-[20px] lg:text-[12px] lg:leading-[28px] cursor-pointer border border-[#3F4751] h-[35px] px-[20px] rounded-full transition-colors duration-300 ease-in-out"
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Cover media={projects_information.cover_page} />
      <div className="flex flex-col lg:gap-[40px]">
        {projects_information.projects.map((projectItem, index) => {
          const { title, description, gallery_project } = projectItem;
          return (
            <div key={index} className="project-container">
              {reverseLayout ? (
                <>
                  <section className="hide-title-trigger-project hide-title-trigger-project px-[30px] lg:grid lg:grid-cols-2 pt-[30px] lg:pt-[50px] flex flex-col gap-[40px] lg:gap-[15px]">
                    <h2 className="text-[35px] leading-[35px] font-regular lg:text-[55px] lg:leading-[55px]">
                      {title}
                    </h2>
                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </section>

                  {gallery_project.length > 0 && (
                    <section className=" pt-[40px] lg:pt-[15px]">
                      <Gallery gallery={gallery_project} />
                    </section>
                  )}
                </>
              ) : (
                <>
                  {gallery_project.length > 0 && (
                    <section className="pt-[20px] lg:pt-[15px]">
                      <Gallery gallery={gallery_project} />
                    </section>
                  )}
                  <section className="hide-title-trigger-project px-[30px] lg:grid lg:grid-cols-2 pt-[30px] lg:pt-[50px] flex flex-col gap-[40px] lg:gap-[15px]">
                    <h2 className="text-[35px] leading-[35px] font-regular lg:text-[55px] lg:leading-[55px]">
                      {title}
                    </h2>
                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </section>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsInformation;
