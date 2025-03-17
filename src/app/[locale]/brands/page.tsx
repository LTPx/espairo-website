import { getWordPressCustomPage } from "@/app/_services/api";
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
  
  const data = await getWordPressCustomPage(locale, "brands");
  const { acf } = data;
  const { brands_information } = acf;

  return (
    <div className="page-Brands h-full">
      <div className="flex flex-col gap-[20px] lg:grid lg:grid-cols-2 lg:gap-x-[15px]">
        <div className="hidden lg:block lg:sticky lg:top-[0px] lg:left-0 w-full lg:h-[calc(100vh-90px)]">
          <img
            src={brands_information.cover_page.url}
            alt={'alt-projects'}
            className="h-[100vh] w-full object-cover"
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
