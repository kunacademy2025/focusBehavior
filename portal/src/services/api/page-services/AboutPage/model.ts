import { BaseModel } from "@/models/base.model";
import { DynamicZoneModel } from "@/models/dynamic.model";
import { MediaModel } from "@/models/media.model";
import { PagebarModel } from "@/models/pagebar.model";
import { SeoModel } from "@/models/seo.model";

export default interface AboutPageModel extends BaseModel {
  pagebar: PagebarModel;
  title: string;
  brief: string;
  mission_title: string;
  mission_brief: string;
  mission_image: MediaModel;
  vision_title: string;
  vision_brief: string;
  vision_image: MediaModel;
  about_title: string;
  about_subtitle: string;
  about_brief: string;
  about_image: MediaModel;
  content: DynamicZoneModel[];
  seo: SeoModel;
}
