import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import TermsConditionsPageModel from "./model";

export const TermsConditionsPageApis =
  new DefaultApiService<TermsConditionsPageModel>(
    ServiceName.TERMS_CONDITIONS_PAGE
  );
