import { BaseModel } from "@/models/base.model";

export default interface SocialLinksModel extends BaseModel {
  title: string;
  url: string;
  icon: string;
  sort_order: number;
}
