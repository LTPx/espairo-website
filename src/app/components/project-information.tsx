"use client";

import { IndividualProjectWp } from "../_interfaces/wordpress-components";
import { useTranslations } from "next-intl";
import Gallery from "./gallery";

interface ProjectsInformationProps {
  project: IndividualProjectWp[];
}

export function ProjectsInformation({ project }: ProjectsInformationProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-[50px]">
      {project.map((projectItem, index) => {
        const { title, description, gallery_project } = projectItem;
        return (
          <div key={index} className="project-container">
            {gallery_project.length > 0 && (
              <section className="pt-[20px] lg:pt-[15px]">
                <Gallery gallery={gallery_project} />
              </section>
            )}
            <section className="container lg:grid lg:grid-cols-2 pt-[30px] lg:pt-[50px] flex flex-col gap-[40px] lg:gap-[15px]">
              <h2 className="text-[35px] leading-[35px] font-regular lg:text-[55px] lg:leading-[55px]">
                {title}
              </h2>
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: description }}
              />
              {/* <p>Test</p> */}
            </section>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectsInformation;
