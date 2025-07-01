import { BaseModel } from "@/models/base.model";
import { MediaModel } from "@/models/media.model";
import { SeoModel } from "@/models/seo.model";

export default interface BlogModel extends BaseModel {
  title: string;
  slug: string;
  main_image: MediaModel;
  author: string;
  date: number;
  featured: boolean;
  search_keywords: string;
  category: string;
  content: unknown;
  seo: SeoModel;
}
