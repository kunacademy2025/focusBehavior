import { BaseModel } from "@/models/base.model";
import { MediaModel } from "@/models/media.model";

export default interface TestimonialModel extends BaseModel {
  name: string;
  profession: string;
  feedback: string;
  image: MediaModel;
}
