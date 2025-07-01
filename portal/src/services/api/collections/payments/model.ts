import { BaseModel } from "@/models/base.model";
import UserModel from "../user/model";
import EventModel from "../events/model";
import PromoCodeModel from "../promo-codes/model";
import BookingModel from "../event-booking/model";

export default interface PaymentModel extends BaseModel {
  first_name: string;
  last_name: string;
  country: string;
  phone_number: string;
  email: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
  subtotal: number;
  discount: number;
  total: number;
  payment_status: "Cancelled" | "Pending" | "Paid" | "Error";
  reference_id: string;
  tax: number;
  payment_link: string;
  order_code: string;
  customer: UserModel;
  payment_type: "";
  remote_pay_link: string;
  payment_lnk_created: string;
  pay_link_msg: string;
  gateways: {
    request_date: string;
    title: string;
    request_url: string;
    request_body: string;
    response_body: string;
    error_message: string;
  }[];
  promo_code: PromoCodeModel;
  event: EventModel;
  event_booking: BookingModel;
}
