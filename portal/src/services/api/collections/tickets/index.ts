
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import TicketModel from "./model";

export const TicketsApis = new DefaultApiService<TicketModel>(ServiceName.TICKETS);
