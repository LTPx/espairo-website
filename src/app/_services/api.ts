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
): Promise<WordPressFrontendPage | null> {
  const url = `http://www.staging.espairo.com.mialias.net/wp-json/wp/v2/pages?slug=${slug}&acf_format=standard`;
  console.log('url: ', url);

  try {
    const pageData = await fetch(url, {
      next: {
        revalidate: 0,
      },
    });

    // Verifica si la respuesta es exitosa
    if (!pageData.ok) {
      console.error('Error en la respuesta de la API', pageData.status);
      return null;
    }

    // Hacer log del contenido de la respuesta antes de intentar convertirla
    const pageText = await pageData.text();
    console.log('Contenido de la respuesta: ', pageText);

    const pageJson = JSON.parse(pageText);  // Asegurándonos de analizar el texto de la respuesta

    // Verifica si la respuesta tiene datos antes de acceder
    if (Array.isArray(pageJson) && pageJson.length > 0) {
      console.log('Página encontrada:', pageJson[0]);
      return pageJson[0];
    } else {
      console.log('No se encontró ninguna página con ese slug');
      return null;
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    return null;
  }
}


export async function getWordPressCustomPage(
  slug: string
): Promise<WordPressFrontendPage> {
  const WORDPRESS_API_URL = "http://www.staging.espairo.com.mialias.net/wp-json";
  const url = `${WORDPRESS_API_URL}/custom/v1/page_by_slug?slug=${slug}`;
  
  console.log("url custom page: ", url);
  
  const response = await fetch(url);

  // Verificar si la respuesta es OK (status 200)
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error en la respuesta del servidor:', errorText);
    throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
  }

  const page = await response.json();
  return page;
}



