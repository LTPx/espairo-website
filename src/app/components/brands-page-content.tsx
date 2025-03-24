import { BrandsPageWp, BrandsWp } from "@/app/_interfaces/wordpress-components";
import { getCategories, getWordPressCustomPage } from "@/app/_services/api";
import BrandCard from "@/app/components/brand-card";
import BrandsPage from "@/app/components/brands-page";
import ClientBrands from "@/app/components/client-brands";
import Link from "next/link";

interface Props {
  brands_information: BrandsPageWp;
  allCategories: any;
}

function BrandsPageContent(props: Props) {
  const { brands_information, allCategories } = props;

  return (
    <>
      <BrandsPage
        brands_information={brands_information}
        allCategories={allCategories}
        // mergedCategories={mergedCategories}
        // brands={brands}
      />
    </>
  );
}

export default BrandsPageContent;
