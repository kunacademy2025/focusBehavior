import {DefaultApiService} from "@/services/api-services/defaultApiService";
import {ServiceName} from "@/services/api-services/servicesNames";
import SubscriptionPageModel from "./model";

export const SubscriptionPageApis = new DefaultApiService<SubscriptionPageModel>(ServiceName.SUBSCRIPTION_PAGE);