
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import LeadModel from "./model";

export const LeadsApis = new DefaultApiService<LeadModel>(ServiceName.LEADS);
