import { BrandsPageWp, BrandsWp } from "@/app/_interfaces/wordpress-components";
import { getCategories, getWordPressCustomPage } from "@/app/_services/api";
import BrandCard from "@/app/components/brand-card";
import BrandsPage from "@/app/components/brands-page";
import ClientBrands from "@/app/components/client-brands";

interface Props {
  brands_information: BrandsPageWp;
  allCategories: any;
}
function Brands(props: Props) {
  const { brands_information, allCategories } = props;
  const brands: BrandsWp[] = brands_information.brand;
  // const allCategories = await getCategories(locale);

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
    <BrandsPage
      brands_information={brands_information}
      mergedCategories={mergedCategories}
      brands={brands}
    />
  );
}

export default Brands;
