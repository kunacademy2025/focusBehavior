import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import FaqPageModel from "./model";

export const FaqPageApis = new DefaultApiService<FaqPageModel>(
  ServiceName.FAQ_PAGE
);
