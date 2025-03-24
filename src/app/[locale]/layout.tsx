import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import App from "./app";
import "tailwindcss/tailwind.css";
import "../global.css";
import Footer from "../components/footer";
import MenuOptions from "../components/menuOptions";
import CallAllPages from "../components/call-all-pages";
import { getCategories, getWordPressCustomPage } from "../_services/api";
import NavbarSecond from "../components/navbar-second";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: "Espairo",
    description: "New Site",
    // robots: seoData.robots,
    openGraph: {
      title: "Espairo",
      description: "New Site",
      siteName: "",
      locale: locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: "en" | "es" | "de" };
}) {
  const messages = await getMessages();
  const timeZone =
    locale === "es"
      ? "Europe/Madrid"
      : locale === "de"
      ? "Europe/Berlin"
      : "America/New_York";
  const ProjectsData = await getWordPressCustomPage(locale, "projects");
  const { acf: acfProjects } = ProjectsData;

  const HomeData = await getWordPressCustomPage(locale, "home");
  const { acf: acfHome } = HomeData;

  const BrandData = await getWordPressCustomPage(locale, "brands");
  const { acf: acfBrand } = BrandData;
  const allCategories = await getCategories(locale);

  const AboutUs = await getWordPressCustomPage(locale, "about-us");
  const { acf: acfAboutUs } = AboutUs;
  const { aboutUs_information } = acfAboutUs;

  const ContactData = await getWordPressCustomPage(locale, "contact");
  const { acf: acfContact } = ContactData;
  const { contact_information } = acfContact;

  const { projects_information } = acfProjects;
  const { home_information } = acfHome;
  const { brands_information } = acfBrand;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} timeZone={timeZone}>
          {/* <MenuOptions
            params={{
              locale: locale,
            }}
          /> */}
          {/* <NavbarSecond/> */}
          <CallAllPages
            home={home_information}
            projects={projects_information}
            brands={brands_information}
            categories={allCategories}
            aboutUs_information={aboutUs_information}
            contact_information={contact_information}
          />
          {/* <App locale={locale}><CallAllPages/></App> */}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
