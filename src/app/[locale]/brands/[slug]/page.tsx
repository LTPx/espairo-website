import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import BrandCard from "@/app/components/brand-card";

async function BrandSlugPage(nextParams: {
  params: { locale: "es" | "de" | "en"; slug: string };
}) {
  const {
    params: { locale, slug },
  } = nextParams;

  return (
    <div className="brand-slug-page h-[100vh]">
      {/* <BrandCard
        image="https://s3-alpha-sig.figma.com/img/6c50/2e20/f5e070ec5300720200f0b54a97f703d1?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=h6GITxOMiHo0nRWWqzRJkj8vr6I2bnFLANs1Uye7DvsPHaPCNk9D~CVPU77qjUPXEYhM~aX2tZPGlQQNRThl4sqzCrYPn0NEDjK2orMgQyNpArh7lZdYtVG-vlFu7m-4diL0M1CmYFfkKFip4Z64jS2x8Fo34BLi2hV7hjoKm3M7vtAON6Drd1EstaXtoTbJZ0dtlD3RYIK0KyJnncMN6~kL11B6uP~2dhhkxNszNuYEVNKZ-z5awlT3IqM2LLZVVC0TA-QR-i~wsU2szekIeV9B6JeRSsfooNeDEniCaHDq3Vnu~mm2TtNmVR8-gfOLz2nujOYVBQBCH021i-Qt6A__"
        title="Vaselli"
        description="Artesano de la piedra nacido en Rapolano Terme, cuenta con una experiencia de más de 100 años, muy enraizado en el territorio e identificado por su gran maestría en el trabajo de la piedra autóctona, el travertino. Vaselli crea soluciones de diseño de interiores y exteriores a medida que satisfacen las diferentes necesidades de los arquitectos, diseñadores y clientes. La cuidadosa selección de materiales (piedra, mármol, madera y metales) y una ejecución perfecta han hecho de Vaselli un punto de referencia para arquitectos y escultores internacionales, que encuentran en la marca todo el apoyo que necesitan para crear sus obras. En cocina Vaselli elabora auténticas piezas escultóricas atemporales con una potente materialidad y dotando de gran calidez los espacios."
      /> */}
    </div>
  );
}

export default BrandSlugPage;
