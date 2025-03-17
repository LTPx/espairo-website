import { BrandsWp } from "@/app/_interfaces/wordpress-components";
import { getCategories, getWordPressCustomPage } from "@/app/_services/api";
import BrandCard from "@/app/components/brand-card";
import ClientBrands from "@/app/components/client-brands";

async function Brands({
  params: { locale },
}: {
  params: { locale: "es" | "de" | "en" };
}) {
  const data = await getWordPressCustomPage(locale, "brands");
  const { acf } = data;
  const { brands_information } = acf;
  const brands: BrandsWp[] = brands_information.brand;
  const allCategories = await getCategories(locale);

  const categories = Array.from(
    new Map(
      brands_information.brand.map((brand) => [
        brand.category_brand.term_id,
        {
          term_id: brand.category_brand.term_id,
          name: brand.category_brand.name,
        },
      ])
    ).values()
  );

  const mergedCategories = allCategories
    .map((cat: any) => {
      const existingCategory = categories.find((c) => c.term_id === cat.id);
      return {
        term_id: cat.id,
        name: cat.name,
        existsInBrands: !!existingCategory,
      };
    })
    .sort((a: any, b: any) => a.term_id - b.term_id);

  return (
    <div className="page-Brands h-full">
      <div className="flex flex-col gap-[20px] lg:grid lg:grid-cols-2 lg:gap-x-[15px]">
        <div className="hidden lg:block lg:sticky lg:top-[0px] lg:left-0 w-full lg:h-[calc(100vh-90px)]">
          <img
            src={brands_information.cover_page.url}
            alt={"alt-projects"}
            className="h-[100vh] w-full object-cover"
          />
        </div>
        <div className="lg:h-full lg:overflow-auto">
          <ClientBrands brands={brands} categories={mergedCategories} />
        </div>
      </div>
      {brands_information.brand.map((brand, index) => (
        <div key={index} className="brand-slug-page h-[100vh]">
          <BrandCard
            image={brand.image}
            title={brand.title}
            description={brand.description}
            urlBrand={brand.url_brand}
            category={brand.category_brand.name}
          />
        </div>
      ))}
    </div>
  );
}

export default Brands;
