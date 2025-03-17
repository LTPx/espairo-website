import React from "react";
import { HomePageWp } from "../_interfaces/wordpress-components";

interface Props {
  home_information: HomePageWp;
}

function Home(props: Props) {
  const { home_information } = props;
  return (
    <div className="relative flex min-h-screen bg-gray-100">
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
      </div>
    </div>
  );
}

export default Home;
