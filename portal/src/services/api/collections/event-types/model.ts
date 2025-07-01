import { BaseModel } from "@/models/base.model";
import { SeoModel } from "@/models/seo.model";

export default interface EventTypeModel extends BaseModel {
  title: string;
  slug: string;
  sort_order: number;
  search_keywords: string;
  parents: EventTypeModel;
  seo: SeoModel;
}
