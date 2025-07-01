import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import HomePageModel from "./model";

export const HomePageApis = new DefaultApiService<HomePageModel>(
  ServiceName.HOME_PAGE
);
