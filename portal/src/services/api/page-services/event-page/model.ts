import { BaseModel } from "@/models/base.model";
import { PagebarModel } from "@/models/pagebar.model";
import { SeoModel } from "@/models/seo.model";

export default interface EventPageModel extends BaseModel {
  pagebar: PagebarModel;
  seo: SeoModel;
}
