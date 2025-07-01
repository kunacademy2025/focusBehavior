import { BaseModel } from "@/models/base.model";
import EventModel from "../events/model";

export default interface SubscriptionModel extends BaseModel {
  plan_name: string;
  caption: string;
  price: number;
  features: string;
  duration: string;
  discounts: number;
  renewal_notifications: boolean;
  events: EventModel;
}
