import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import SocialLinksModel from "./model";

export const SocialLinksApis = new DefaultApiService<SocialLinksModel>(
  ServiceName.SOCIAL_LINKS
);
