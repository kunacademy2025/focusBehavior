import {DefaultApiService} from "@/services/api-services/defaultApiService";
import {ServiceName} from "@/services/api-services/servicesNames";
import EventPageModel from "./model";

export const EventPageApis = new DefaultApiService<EventPageModel>(ServiceName.EVENT_PAGE);