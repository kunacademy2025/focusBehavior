import { BaseModel } from "@/models/base.model";
import { PagebarModel } from "@/models/pagebar.model";
import { SeoModel } from "@/models/seo.model";

export default interface BlogPageModel extends BaseModel {
  pagebar: PagebarModel;
  featured_intro: string;
  listing_intro: string;
  seo: SeoModel;
}
