import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import EventModel from "./model";

export const EventsApis = new DefaultApiService<EventModel>(ServiceName.EVENTS);
