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
  cover_home: MediaFileWp;
  title: string;
  description: string;
}

