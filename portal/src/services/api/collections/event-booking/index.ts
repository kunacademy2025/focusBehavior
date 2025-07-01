import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import BookingModel from "./model";

export const EventBookingApis = new DefaultApiService<BookingModel>(
  ServiceName.EVENT_BOOKING
);
