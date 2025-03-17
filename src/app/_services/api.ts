import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import { WORDPRESS_API_URL } from "../constants";

export async function getWordPressPage(
  locale: "en" | "es" | "de",
  page: string
): Promise<WordPressFrontendPage> {
  const url = `${WORDPRESS_API_URL}/wp/v2/pages/${page}`;
  console.log("url: ", url);
  const response = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getFrontendPageBySlug(
  slug: string
): Promise<WordPressFrontendPage> {
  const url = `https://staging.espairo.com/wp-json/wp/v2/pages?slug=${slug}&acf_format=standard`;
  console.log("url: ", url);
  const pageData = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });
  const pageJson = await pageData.json();
  return pageJson[0];
}

export async function getWordPressCustomPage(
  locale: "en" | "es" | "de",
  slug: string
): Promise<WordPressFrontendPage> {
  const parentPages = {
    es: "spanish-pages",
    de: "german-pages",
    en: "english-pages",
  };
  const parentPage = parentPages[locale];
  const WORDPRESS_API_URL = "https://staging.espairo.com/wp-json";
  const url = `${WORDPRESS_API_URL}/custom/v1/page_by_slug?slug=${slug}&parent_slug=${parentPage}&lang=${locale}`;
  console.log("url custom page: ", url);
  const response = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });
  const page = await response.json();
  if (!response.ok) throw new Error(page.message);
  return page;
}

export async function getCategories(locale: "en" | "es" | "de") {
  const WORDPRESS_API_URL = "https://staging.espairo.com/wp-json";
  const url = `${WORDPRESS_API_URL}/wp/v2/categories?lang=${locale}`;

  console.log("Fetching categories from: ", url);

  const response = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });

  const categories = await response.json();

  if (!response.ok) throw new Error(categories.message);

  return categories;
}
