import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import { WORDPRESS_API_URL } from "../constants";

export type Locale = "en" | "es" | "de";

const REVALIDATE_SECONDS = 0;

const PARENT_PAGES: Record<Locale, string> = {
  es: "spanish-pages",
  de: "german-pages",
  en: "english-pages",
};

async function wpFetch<T>(url: string, tags: string[]): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message ?? `WP error ${response.status}`);
  return data as T;
}

export function getWordPressCustomPage(locale: Locale, slug: string) {
  const url = `${WORDPRESS_API_URL}/custom/v1/page_by_slug?slug=${slug}&parent_slug=${PARENT_PAGES[locale]}&lang=${locale}`;
  return wpFetch<WordPressFrontendPage>(url, [
    "wp-pages",
    `page:${locale}:${slug}`,
  ]);
}

export function getCategories(locale: Locale) {
  const url = `${WORDPRESS_API_URL}/wp/v2/categories?lang=${locale}`;
  return wpFetch<any>(url, ["wp-categories", `categories:${locale}`]);
}

export async function getSiteData(locale: Locale) {
  const [home, projects, brands, aboutUs, contact, categories] =
    await Promise.all([
      getWordPressCustomPage(locale, "home"),
      getWordPressCustomPage(locale, "projects"),
      getWordPressCustomPage(locale, "brands"),
      getWordPressCustomPage(locale, "about-us"),
      getWordPressCustomPage(locale, "contact"),
      getCategories(locale),
    ]);

  return {
    home: home.acf.home_information,
    projects: projects.acf.projects_information,
    brands: brands.acf.brands_information,
    aboutUs_information: aboutUs.acf.aboutUs_information,
    contact_information: contact.acf.contact_information,
    categories,
  };
}
