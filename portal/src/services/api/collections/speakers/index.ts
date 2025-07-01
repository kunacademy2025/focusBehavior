
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import SpeakerModel from "./model";

export const SpeakerApis = new DefaultApiService<SpeakerModel>(ServiceName.SPEAKERS);
