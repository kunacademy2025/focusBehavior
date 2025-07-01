import {DefaultApiService} from "@/services/api-services/defaultApiService";
import {ServiceName} from "@/services/api-services/servicesNames";
import PrivacyPolicyPageModel
    from "./model";

export const PrivacyPolicyPageApis = new DefaultApiService<PrivacyPolicyPageModel>(ServiceName.PRIVACY_POLICY);