import { BaseModel } from "@/models/base.model";
import { SeoModel } from "@/models/seo.model";

export default interface TagModel extends BaseModel {
  tag: string;
  slug: string;
  seo: SeoModel;
}
