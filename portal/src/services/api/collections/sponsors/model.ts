import { BaseModel } from "@/models/base.model";
import { MediaModel } from "@/models/media.model";

export default interface SponsorModel extends BaseModel {
  title: string;
  sort_order: number;
  image: MediaModel;
}
