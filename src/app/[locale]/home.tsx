import React from "react";
import { HomePageWp } from "../_interfaces/wordpress-components";
import Link from "next/link";

interface Props {
  home_information: HomePageWp;
  navOptions?: { label: string; section: string; route: string }[];
}

function Home({ home_information, navOptions }: Props) {
  return (
    <div className="relative flex min-h-screen bg-gray-100 lg:pr-[120px]">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative h-[100vh] w-full">
          <img
            src={home_information.cover_page.url}
            alt="Espai Rö"
            className="h-full w-full"
          />
          <h1 className="absolute top-[50px] left-[50px] text-white text-[30px] leading-[30px] font-regular tracking-[-0.05em]">
            {home_information.title}
          </h1>
          <div
            className="fonte-regular absolute bottom-[50px] left-[50px] text-white text-[18px] leading-[22px]"
            dangerouslySetInnerHTML={{ __html: home_information.description }}
          />
        </div>
        <div className="fixed right-0 z-[1000] h-screen">
          <div className="h-full bg-[#E0E0E0] flex">
            {navOptions && navOptions.map((option) => (
              <div key={option.section} className="h-full w-[30px] border-l border-[#3F4751] text-center">
                <Link
                  href={option.route}
                  className="h-full lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] text-start pt-[48px] text-gray-600 hover:text-black transition duration-300 font-medium rotate-180"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {option.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
