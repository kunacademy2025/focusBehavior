import { BaseModel } from "@/models/base.model";
import BookingModel from "../event-booking/model";

export default interface EventAttendanceModel extends BaseModel {
  event_booking: BookingModel;
  checked_in_at: string;
  checked_out_at: string;
}
