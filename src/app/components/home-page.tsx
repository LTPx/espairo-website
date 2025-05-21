import React from "react";
import { HomePageWp } from "../_interfaces/wordpress-components";
import Link from "next/link";
import CoverHome from "../components/cover-home";

interface Props {
  home_information: HomePageWp;
  locale: "en" | "es" | "de";
}

function Home({ home_information, locale }: Props) {
  return (
    <div className="relative flex h-[100dvh]">
      <CoverHome locale={locale} home_information={home_information} />
    </div>
  );
}

export default Home;
