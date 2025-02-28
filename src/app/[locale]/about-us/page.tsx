import AboutUsCard from "@/app/components/aboutUs-card";
import Cover from "@/app/components/cover";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

async function AboutUs(nextParams: { params: { locale: "es" | "de" | "en" } }) {
  const {
    params: { locale },
  } = nextParams;

  return (
    <div className="page-AboutUs">
      <Cover img="https://s3-alpha-sig.figma.com/img/c050/63c7/65deb1bc5507def5a3b792331a3d4928?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uAFsdilG4iUfQn3fx2ALnWXWHVLrIHYK8R-07zGtCRWxAghWlm1G4NhVULUG1mCJPEqmb0W~ODjnNSEdsK5vN8gRxOIP2aIukTDeBc1-IGaTig7EXSq0AL9jGGDo9iDUu8vuef7n-XxitxypIde8mEo6lK~jP2C1cBiROxhejiQvai3QsWfwAM76whhsakudJ7BUKS9On4vdKgSmxsHjABkwZ~1YcPPybGvJO9m4Pcn063MYy3Em6~Co1ShiWSu8tOEWehpf-pNqS~hqbhnD6Kicp7IaA2UmBsZ1bU-GJQ3W1x4dRaLQ8P-XVuEnk7VnK6XjDh4uRdr0IXhwKI3WlA__" />
      <section className="lg:pt-[70px]">
        <AboutUsCard
          image="https://s3-alpha-sig.figma.com/img/ae7d/6e0c/f09fc7c724a16ab990793bafefc1dfe8?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YTKPgcjGX6tOFVaRyiwnXNviBe3svpHQIgAtY5v60R2k1fhBcykhMeH3T4Bzrm3kcIZr54MaL9qUHgECoK2B9QP8xA1T-jzR~PAkcSxZRd5UdLZVmhOB2N4g0VgWDgEVg7DhGXBFATj6xMFf2KZuutgtl2hfv0fglme55j1~JNsFcsylPjdrNvFd3ba-fRKPvz~tBuNNHoq6ihJD9Qp9fSVQYmBxaXxMSLY0F3nJygz3fHYZGyXtSVaCq6BBf3O3J98SSZPfRngk6xkau6iFW7Se9Jupn88ALWsZGFkBRa0KfwnO8t2PeHWup2-e7vwC9EKeIWT0GHgB7EUZYF95yw__"
          title="Espai Rö nace en 2010 de la pasión por el diseño, el interiorismo y la ebanistería artesanal."
          description="Espai Rö nace en 2010 de la pasión por el diseño, el interiorismo y la ebanistería artesanal, de la mano de arquitectos amantes del detalle, la calidad y la excelencia. Siempre en actitud de búsqueda permanente, nuestra visión de la arquitectura está fuertemente comprometida con la materialidad de las cosas, su textura y su composición. La sencillez es nuestro objetivo y el material y la tradición de los oficios nuestras herramientas. En Espai Rö se enontrarán soluciones altamente personalizadas, para ello nos gusta conocer a nuestro cliente, cómo piensa, qué prefiere, cómo trabaja, especialmente qué sensaciones tiene, para evocarlas en el espacio que pensamos y siempre sobre la base de nuestro experiencia y conocimiento. El resultado es genuino, único, diferente para cada cliente, es un traje a medida que le aportará el máximo de los beneficios, el bienestar."
        />
      </section>
      <section className="pt-[70px]">
        <img
          src={
            "https://s3-alpha-sig.figma.com/img/a9b6/2fe2/6ba1c6813dc0318457fddd3b9dbf3249?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bKgSS9s7jdGIFo2zjpFiAAifXinADVyVHusy9BCfcQgrPVt19oSp4XhQIWlkteKEjv4ZdhMC-VYxY3~ZxTtROj-R-FHK4h6rF0tVXFk7TEIWNdwHKecQqy4dsQrDxRRXozoLmkixPZKNY57AdBclhj9eJWDMK6KBssWouPab1U8Z2K-DLFDiL6OccSxv8Se49aCyfWOnOEY4EFjwx8B1iY-oY9PgEi4K1lLIHlNe2qKYcj9F3WYCMVSL8IO4S8Uk-tDcWqizshOrwI9ERBu5Y3R4dUC70K-PyUPdchMD8Ts2MU7v0kr7AILJznHAO~vWe88URO6nnjZeoAkTxi9Odg__"
          }
          className="h-[800px] object-cover w-full"
        />
      </section>
    </div>
  );
}

export default AboutUs;
