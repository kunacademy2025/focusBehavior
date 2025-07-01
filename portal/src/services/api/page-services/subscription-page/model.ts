import { BaseModel } from "@/models/base.model";
import { PagebarModel } from "@/models/pagebar.model";
import { SeoModel } from "@/models/seo.model";

export default interface SubscriptionPageModel extends BaseModel {
  pagebar: PagebarModel;
  title: string;
  brief: string;
  seo: SeoModel;
}
