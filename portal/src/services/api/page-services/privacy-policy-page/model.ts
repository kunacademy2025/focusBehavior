import { BaseModel } from "@/models/base.model";
import { PagebarModel } from "@/models/pagebar.model";
import { SeoModel } from "@/models/seo.model";

export default interface PrivacyPolicyPageModel extends BaseModel {
  pagebar: PagebarModel;
  content: string;
  seo: SeoModel;
}
