
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import SponsorModel from "./model";

export const SponsorApis = new DefaultApiService<SponsorModel>(ServiceName.SPONSORS);
