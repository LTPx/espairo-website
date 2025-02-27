import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

async function Brands(nextParams: { params: { locale: "es" | "de" | "en" } }) {
  const {
    params: { locale },
  } = nextParams;

  return (
    <div className="page-Brands grid lg:grid-cols-2">
      <div>
        <img
          src="https://s3-alpha-sig.figma.com/img/b80f/1e5b/aa913f7312897ba8af0c8bc0605f0cbc?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VqSRQOJRAEl0MKNOyjwahVqHvF6v3FBGqfTFOX99d1S84MsVO42PcVRumA9bQflSZYGvd0z2EZuozunBVvLly8Hv-ve7QAV4XmrwZ8icKam6dYqQEMwR1T6poSjQspBm88Hl66HnmFk2eBQHmsAT~IXkIt~N7QYB~CHvhBis-wwKmWUg4w81owdpNSLYmO2nfV~nDKMEo6-dH7HqfwBk6C-CLs016wGHz2QmC1z3RONa0nShnNoLYe-XV4VXiItL1A-BB9RXtf~rTXfOZUjm3s6z1CJuXQmRBBPpZV8fArzcFFpLhxngR-wcvkgAwK976s0jdJ2VIZXrvbgxBhQoqQ__" // Reemplaza con tu imagen
          alt="Espai Rö"
          className="h-[100vh] w-full"
        />
      </div>
      <div>Content</div>
    </div>
  );
}

export default Brands;
