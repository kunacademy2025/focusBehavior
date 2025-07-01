import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import SpeakerPageModel from "./model";

export const SpeakerPageApis = new DefaultApiService<SpeakerPageModel>(
  ServiceName.SPEAKER_PAGE
);
