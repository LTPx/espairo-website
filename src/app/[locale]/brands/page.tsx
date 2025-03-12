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
        <div className="hidden lg:block lg:sticky lg:top-[0px] lg:left-0 w-full lg:h-[calc(100vh-90px)]">
          <img
            src="https://s3-alpha-sig.figma.com/img/b80f/1e5b/aa913f7312897ba8af0c8bc0605f0cbc?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DedwGdKyq~szDhl6NOHb6KrJ~z~jo4MryHJtKQfEhtoebgwENkhmM-kmDJYwvk3QcLUWAIdXclijXE9pk4ogy8xrPIP2ppcWGGwBzL5LjdcyswqVbua771FmZMGdvXWa-zOTznu9nMOKPbgwVKGdXBU30lA4wdLyzaMdwHDHAZEPQaKKZ33nVf9~nUS4zE15U7GecAWiNP0fFk0~~FURaFyfOoWmcNUGBGuMlq6Eu973rW6gS1IjSoZINusZDL5nrVJWKjOzXRLUoh80nLSp8HELGurWwozo6IdJckkE2PvuRRAwkVbGVZRFfo~xVCxZjBHuHRKkspRF3flqIqsqHQ__"
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
