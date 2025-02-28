import ClientBrands from "@/app/components/client-brands";

async function Brands({
  params: { locale },
}: {
  params: { locale: "es" | "de" | "en" };
}) {
  const brandNames = [
    "Abimis",
    "Agape",
    "Alki",
    "Atelier Février",
    "Blanco",
    "Bora",
    "Ceadesign",
    "Davide Groppi",
    "De Castelli",
    "Dedar",
    "Dk3",
    "Edra",
    "Font Barcelona",
    "Gaggenau",
    "Giorgetti",
    "Glasitalia",
    "Gloster",
    "Haberdashery",
    "Kasthall",
    "Lambert & Fils",
    "Lin Brasil",
    "Loro Piana",
    "Man Of Parts",
    "Mingardo",
    "Moroso",
    "Nic",
    "Overgaard & Dyrman",
    "Paola Lenti",
    "Perrin & Rowe",
    "Plh Italia",
    "Pp Mobler",
    "Röthlisberger Kollektion",
    "Siemens",
    "Team7",
    "Thut Mobel",
  ];

  const categories = [
    "Mobiliario",
    "Iluminación",
    "Cocina",
    "Téxtil",
    "Baño",
    "Electrodomésticos",
    "Grifería",
    "Exterior",
  ];

  return (
    <div className="page-Brands h-full">
      <div className="flex flex-col gap-[20px] lg:grid lg:grid-cols-2 lg:gap-x-[15px]">
        <div className="lg:sticky lg:top-[0px] lg:left-0 w-full lg:h-[calc(100vh-90px)]">
          <img
            src="https://s3-alpha-sig.figma.com/img/b80f/1e5b/aa913f7312897ba8af0c8bc0605f0cbc?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VqSRQOJRAEl0MKNOyjwahVqHvF6v3FBGqfTFOX99d1S84MsVO42PcVRumA9bQflSZYGvd0z2EZuozunBVvLly8Hv-ve7QAV4XmrwZ8icKam6dYqQEMwR1T6poSjQspBm88Hl66HnmFk2eBQHmsAT~IXkIt~N7QYB~CHvhBis-wwKmWUg4w81owdpNSLYmO2nfV~nDKMEo6-dH7HqfwBk6C-CLs016wGHz2QmC1z3RONa0nShnNoLYe-XV4VXiItL1A-BB9RXtf~rTXfOZUjm3s6z1CJuXQmRBBPpZV8fArzcFFpLhxngR-wcvkgAwK976s0jdJ2VIZXrvbgxBhQoqQ__"
            alt="Espai Rö"
            className="h-[100vh] w-full"
          />
        </div>
        <div className="lg:h-full lg:overflow-auto">
          <ClientBrands brandNames={brandNames} categories={categories} />
        </div>
      </div>
    </div>
  );
}

export default Brands;
