import { BaseModel } from "@/models/base.model";
import { MediaModel } from "@/models/media.model";
import { SeoModel } from "@/models/seo.model";
import TagModel from "../tags/model";
import EventModel from "../events/model";
import { DynamicZoneModel } from "@/models/dynamic.model";

export default interface SpeakerModel extends BaseModel {
  name: string;
  slug: string;
  brief: string;
  search_keywords: string;
  profession: string;
  phone_number: string;
  email: string;
  location: string;
  address: string;
  social_links: {
    title: string;
    link: string;
    icon: string;
  }[];
  main_image: MediaModel;
  speaker_image: MediaModel;
  tags: TagModel[];
  events: EventModel[];
  content: DynamicZoneModel[];
  seo: SeoModel;
}
