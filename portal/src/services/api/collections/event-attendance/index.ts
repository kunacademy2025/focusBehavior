import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import EventAttendanceModel from "./model";

export const EventAttendanceApis = new DefaultApiService<EventAttendanceModel>(
  ServiceName.EVENT_ATTENDANCE
);
