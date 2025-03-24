import { Suspense } from "react";
import Home from "./home";
import {
  getWordPressCustomPage,
} from "../_services/api";


export default async function Page(nextParams: {
  params: { locale: "es" | "de" | "en" };
}) {
  const {
    params: { locale },
  } = nextParams;

  const data = await getWordPressCustomPage(locale, "home");

  const { acf } = data;
  const { home_information } = acf;
  return <Home home_information={home_information} />;
}
