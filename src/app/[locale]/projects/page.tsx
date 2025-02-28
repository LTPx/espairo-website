import { IndividualProjectWp } from "@/app/_interfaces/wordpress-components";
import Cover from "@/app/components/cover";
import Gallery from "@/app/components/gallery";
import ProjectsInformation from "@/app/components/project-information";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

async function Projects(nextParams: {
  params: { locale: "es" | "de" | "en" };
}) {
  const {
    params: { locale },
  } = nextParams;

  const fakeProjects = [
    {
      title: "Proyecto Alpha",
      description:
        "<p>Proyecto Alpha Nuestra visión de la arquitectura está fuertemente comprometida con la materialidad de las cosas, con su textura y su composición. La sencillez es nuestro objetivo; el material y la tradición de los oficios, nuestras herramientas.</p>",
      gallery_project: [
        {
          image: {
            ID: 1,
            id: 1,
            title: "Imagen 1",
            filename: "imagen1.jpg",
            filesize: 1024,
            url: "https://s3-alpha-sig.figma.com/img/4e59/525a/b2a1d7a69d7f6a5e3a04eae40ecb15ad?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Lyqr1BShefu2UGGakas2H8v~xPKNdYEa-rm8wIfUAPWHCWZFbZlB4WvYOkQa7cH9NcaJquvcJZ9NvhugsqER3XTi3Zzdh-9f4c6V8EirYTHLBsPPRcRqeotpFHz5WaLcxS36h~7BVNnmaAD~FaB4bgPhIl0dgA8BaspzfB1pupUE09~lCK8ID0h0veZ4hPfNQ4o0M1jVafPgCz2T2ewyUoZUASww~nc-dB0XVPn0HGGDMRDgeC7Vc1OepuFXgZ0g1s310tFnnJoqwK71lanbmHk0RzmJv8tL44J-1m35Uz3BOlPPDtUAE6OZK2clMn2NZArXZErpDrpYnLX8MSj6gQ__",
            link: "https://s3-alpha-sig.figma.com/img/4e59/525a/b2a1d7a69d7f6a5e3a04eae40ecb15ad?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Lyqr1BShefu2UGGakas2H8v~xPKNdYEa-rm8wIfUAPWHCWZFbZlB4WvYOkQa7cH9NcaJquvcJZ9NvhugsqER3XTi3Zzdh-9f4c6V8EirYTHLBsPPRcRqeotpFHz5WaLcxS36h~7BVNnmaAD~FaB4bgPhIl0dgA8BaspzfB1pupUE09~lCK8ID0h0veZ4hPfNQ4o0M1jVafPgCz2T2ewyUoZUASww~nc-dB0XVPn0HGGDMRDgeC7Vc1OepuFXgZ0g1s310tFnnJoqwK71lanbmHk0RzmJv8tL44J-1m35Uz3BOlPPDtUAE6OZK2clMn2NZArXZErpDrpYnLX8MSj6gQ__",
            alt: "Imagen 1",
            author: "Autor 1",
            description: "Descripción de la imagen 1",
            caption: "Caption de la imagen 1",
            name: "imagen1",
            status: "publish",
            uploaded_to: 10,
            date: new Date(),
            modified: new Date(),
            menu_order: 1,
            mime_type: "image/jpeg",
            type: "image",
            subtype: "jpeg",
            icon: "",
            width: 600,
            height: 400,
            sizes: {} as any, // Puedes definir `SizesAcf` si es necesario
          },
          layout: "half-width",
        },
        {
          image: {
            ID: 2,
            id: 2,
            title: "Imagen 2",
            filename: "imagen2.jpg",
            filesize: 2048,
            url: "https://s3-alpha-sig.figma.com/img/4e59/525a/b2a1d7a69d7f6a5e3a04eae40ecb15ad?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Lyqr1BShefu2UGGakas2H8v~xPKNdYEa-rm8wIfUAPWHCWZFbZlB4WvYOkQa7cH9NcaJquvcJZ9NvhugsqER3XTi3Zzdh-9f4c6V8EirYTHLBsPPRcRqeotpFHz5WaLcxS36h~7BVNnmaAD~FaB4bgPhIl0dgA8BaspzfB1pupUE09~lCK8ID0h0veZ4hPfNQ4o0M1jVafPgCz2T2ewyUoZUASww~nc-dB0XVPn0HGGDMRDgeC7Vc1OepuFXgZ0g1s310tFnnJoqwK71lanbmHk0RzmJv8tL44J-1m35Uz3BOlPPDtUAE6OZK2clMn2NZArXZErpDrpYnLX8MSj6gQ__",
            link: "https://s3-alpha-sig.figma.com/img/4e59/525a/b2a1d7a69d7f6a5e3a04eae40ecb15ad?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Lyqr1BShefu2UGGakas2H8v~xPKNdYEa-rm8wIfUAPWHCWZFbZlB4WvYOkQa7cH9NcaJquvcJZ9NvhugsqER3XTi3Zzdh-9f4c6V8EirYTHLBsPPRcRqeotpFHz5WaLcxS36h~7BVNnmaAD~FaB4bgPhIl0dgA8BaspzfB1pupUE09~lCK8ID0h0veZ4hPfNQ4o0M1jVafPgCz2T2ewyUoZUASww~nc-dB0XVPn0HGGDMRDgeC7Vc1OepuFXgZ0g1s310tFnnJoqwK71lanbmHk0RzmJv8tL44J-1m35Uz3BOlPPDtUAE6OZK2clMn2NZArXZErpDrpYnLX8MSj6gQ__",
            alt: "Imagen 2",
            author: "Autor 2",
            description: "Descripción de la imagen 2",
            caption: "Caption de la imagen 2",
            name: "imagen2",
            status: "publish",
            uploaded_to: 10,
            date: new Date(),
            modified: new Date(),
            menu_order: 2,
            mime_type: "image/jpeg",
            type: "image",
            subtype: "jpeg",
            icon: "",
            width: 600,
            height: 400,
            sizes: {} as any,
          },
          layout: "half-width",
        },
      ],
    },
    {
      title: "Proyecto Beta",
      description:
        "<p>En Espai Rö trabajamos con un selecto equipo de profesionales. La experiencia acumulada es nuestro bagaje y manteniendo una actitud de búsqueda permanente nos enfrentamos a cada nuevo proyecto sin ideas preconcebidas.</p>",
      gallery_project: [
        {
          image: {
            ID: 3,
            id: 3,
            title: "Imagen 3",
            filename: "imagen3.jpg",
            filesize: 1024,
            url: "https://s3-alpha-sig.figma.com/img/4e59/525a/b2a1d7a69d7f6a5e3a04eae40ecb15ad?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Lyqr1BShefu2UGGakas2H8v~xPKNdYEa-rm8wIfUAPWHCWZFbZlB4WvYOkQa7cH9NcaJquvcJZ9NvhugsqER3XTi3Zzdh-9f4c6V8EirYTHLBsPPRcRqeotpFHz5WaLcxS36h~7BVNnmaAD~FaB4bgPhIl0dgA8BaspzfB1pupUE09~lCK8ID0h0veZ4hPfNQ4o0M1jVafPgCz2T2ewyUoZUASww~nc-dB0XVPn0HGGDMRDgeC7Vc1OepuFXgZ0g1s310tFnnJoqwK71lanbmHk0RzmJv8tL44J-1m35Uz3BOlPPDtUAE6OZK2clMn2NZArXZErpDrpYnLX8MSj6gQ__",
            link: "https://via.placeholder.com/600x400",
            alt: "Imagen 3",
            author: "Autor 3",
            description: "Descripción de la imagen 3",
            caption: "Caption de la imagen 3",
            name: "imagen3",
            status: "publish",
            uploaded_to: 11,
            date: new Date(),
            modified: new Date(),
            menu_order: 1,
            mime_type: "image/jpeg",
            type: "image",
            subtype: "jpeg",
            icon: "",
            width: 600,
            height: 400,
            sizes: {} as any,
          },
          layout: "full-width",
        },
      ],
    },
    {
      title: "Proyecto Gamma",
      description:
        "<p>Nuestra visión de la arquitectura está fuertemente comprometida con la materialidad de las cosas, con su textura y su composición.</p>",
      gallery_project: [],
    },
  ];
  

  return (
    <div className="page-Projects">
      <Cover img="https://s3-alpha-sig.figma.com/img/3fe2/8288/2e7648fd53535d81b0304c6665647d1e?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J4MFh5L4L58vbqHTmVeptFdZs7zQoUBIXl1-S6wnZoAjIMv-LINJoYVvlfE-3DUsIvJbxhCXMx9Cx9gzKoAQ2Cj2oyp5~g4~--RrEn6kwVpFWBBmHY8PPjiXgkZGcM9LQBY7MpKCIaLhGQhXBDEfq4us9o~4NHpGq5VT95zor0OdBuXQY7X1N7XsjMtVvErdNd9T9kbUqf8BdhX3RsDgwM9atHNErafpyyHyItr389ZIYeTMBXVRn4J--nyNMnkCyMzfFmm1VNp9WCIgmN0eiB117iQvPrWEA88dcRe9d7M-g~0mKlpxmpZ8V8k6RTTw9i4rgB9SQsLRHeJoxWDIng__" />
      <div>
        <ProjectsInformation project={fakeProjects} />
      </div>
    </div>
  );
}

export default Projects;
