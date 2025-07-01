import { BaseModel } from "@/models/base.model";
import EventModel from "../events/model";
import SpeakerModel from "../speakers/model";

export default interface TrainingScheduleModel extends BaseModel {
  date: string;
  type: string;
  event: EventModel;
  session: {
    title: string;
    description: number;
    startTime: string;
    endTime: string;
    speakers: SpeakerModel[];
    type: "webinar" | "youtube" | "facebook";
    url: string;
    room_code: string;
  }[];
}
