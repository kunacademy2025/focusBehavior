import { BaseModel } from "@/models/base.model";
import EventModel from "../events/model";
import { MediaModel } from "@/models/media.model";

export default interface TicketModel extends BaseModel {
  title: string;
  price: string;
  initial_quantity: number;
  sold_quantity: number;
  remaining_quantity: number;
  event: EventModel;
  sold_out: boolean;
  expiration_date: string;
  description: unknown;
  image: MediaModel;
}
