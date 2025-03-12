import AboutUsCard from "@/app/components/aboutUs-card";
import Cover from "@/app/components/cover";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

async function AboutUs(nextParams: { params: { locale: "es" | "de" | "en" } }) {
  const {
    params: { locale },
  } = nextParams;
  const t = await getTranslations();

  return (
    <div className="page-AboutUs">
      <div className="container lg:hidden bg-[#3F4751] flex items-center">
        <span className="font-regular text-white py-[18px] text-[16px] leading-[20px] tracking-[-0.05em]">
          {`${t("header.about-us")}`}
        </span>
      </div>
      <Cover img="https://s3-alpha-sig.figma.com/img/c050/63c7/65deb1bc5507def5a3b792331a3d4928?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eYNkc8798~QpfEiSJtV7GpjJHubA~dFlgvvrAfoqFyMLNCcDpNBsdWyd1JrGqjgpGltKh0Ff5qxrn4bwfryvbM8b6q0o-Os3BVf6-ESsWJjdvUMzZW14hgun6UzIQIsysmPFXYEE3D3TJs-3p8GqOdKu4mjqY9GWL0lUh93KvTu0PZfn9bnK5Y3rl9o3gX4TVal6vNMO994CTvjLuJgXz2rrU64eGEawwgvS-oyCn21zzkr3MZyAbl8Heumj8THVpnuTv1lwDQig6L0t~tXuue5xulehE0cZ-ihJ31txrBzUSmXREXVomehY8kZfRfeO6lpWT3yjYZFb0796rcJ2xA__" />
      <section className="pt-[40px] lg:pt-[70px]">
        <AboutUsCard
          image="https://s3-alpha-sig.figma.com/img/ae7d/6e0c/f09fc7c724a16ab990793bafefc1dfe8?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mudKQNaHzyGEsYvHwZlS6Br7gj7doIH9RfSknhclUjNNoM0Pn-boTlLVg7fnKBHe6q6cSB316cL1pudfpseIbxkgMToaFirklfX8q-NYf-pklw1fX6TAeSGvNm4plGlbVExTUeeW~1AogoNQoMeWHh47SYT64Ci5DiA7fMtbhj0yA9tDL6l0p-00EPGa3f5BOyKwD6I2wHn-yNK~D~Vcr7DijUpBviFRrufh50g-MFoTo6p2wJhahzeyckHJYm5jl~DAui~-4WGTzhw~NL-aLvd-Ucc7fLuitlncMVMF0wzq3lM0SDGMGUK8ezAQm2jL12cHlp-KflUlCtx1wjrOfQ__"
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
