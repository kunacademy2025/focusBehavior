import { BaseModel } from "@/models/base.model";
import EventModel from "../events/model";
import UserModel from "../user/model";
import PaymentModel from "../payments/model";
import TicketModel from "../tickets/model";
import SubscriptionModel from "../subscriptions/model";

export default interface BookingModel extends BaseModel {
  event: EventModel;
  user: UserModel;
  booking_date: string;
  ticket: TicketModel;
  ticket_quantity: number;
  subscription: SubscriptionModel;
  access_type: "ticket" | "subscription";
  status: "active" | "cancelled";
  payment: PaymentModel;
  expiry_date: string;
}
