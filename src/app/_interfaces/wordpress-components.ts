import { ImageAcf } from "./wordpress-page";

export interface MediaFileWp {
  url: string;
  type: "video" | "image";
}

export interface DescriptionWp {
  title: string;
  description: string;
}

export interface IndividualProjectWp {
  title: string;
  description: string;
  gallery_project: GalleryProjectWp[];
}

export interface GalleryProjectWp {
  image: ImageAcf;
  layout: string;
}

export interface HomePageWp {
  cover_page: MediaFileWp;
  title: string;
  description: string;
}

export interface ContactPageWp {
  cover_page: MediaFileWp;
  sub_title: string;
  title: string;
  description: string;
}

export interface BrandsPageWp {
  cover_page: MediaFileWp;
  cover_categories: CoverCategoriesWp[];
  description: string;
  brand: BrandsWp[];
}

export interface CoverCategoriesWp {
  image_cover: string;
  category: number;
}

export interface BrandsWp {
  image: string;
  title: string;
  description: string;
  url_brand: string;
  category_brand: CategoryBrandWp;
}

export interface CategoryBrandWp {
  term_id: number;
  name: string;
  slug: string;
}

export interface ProjectsPageWp {
  cover_page: MediaFileWp;
  projects: ProjectsInformationWp[];
}

export interface ProjectsInformationWp {
  gallery_project: GalleryProjectWp[];
  title: string;
  description: string;
}

export interface AboutUsPageWp {
  cover_page: MediaFileWp;
  first_information_section: AboutUsCardsWp;
  first_image: string;
  authors_section: AuthorsSectionWp;
  second_image: string;
  second_information_section: AboutUsCardsWp;
  third_image: string;
  last_information_section: AboutUsCardsWp;
  last_image: string;
}

export interface AboutUsCardsWp {
  image: string;
  title: string;
  description: string;
}

export interface AuthorsSectionWp {
  image: ImageAcf;
  title_section: string;
  authors: AuthorWp[];
}

export interface AuthorWp {
  author_name: string;
  author_description: string;
}
