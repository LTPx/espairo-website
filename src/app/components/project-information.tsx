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
    <div className="">
      {project.map((projectItem, index) => {
        const { title, description, gallery_project } = projectItem;
        return (
          <div key={index} className="project-container">
            {gallery_project.length > 0 && (
              <section className="pt-[20px] lg:pt-[15px]">
                <Gallery gallery={gallery_project} />
              </section>
            )}
            <section className="pt-[30px] lg:pt-[50px] flex flex-col gap-[20px] lg:gap-[15px] lg:grid lg:grid-cols-2">
              <h1 className="font-mediumFont tracking-[-0.05em]">
                {title}
              </h1>
              <div
                className="pl-[8px] font-regularFont lg:pr-[119px]"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </section>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectsInformation;
