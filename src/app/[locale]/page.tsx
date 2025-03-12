import { Suspense } from "react";
import Home from "./home";
import { getFrontendPageBySlug, getWordPressCustomPage } from "../_services/api";

export default async function Page() {
  // const data = await getWordPressCustomPage("home-test");

//   const { acf } = data;
//   const { home_information } = acf;
// console.log('information:',home_information.cover_home.url)
  return (
    <Home data={undefined}/>
  );
}
