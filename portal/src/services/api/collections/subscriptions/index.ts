
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import SubscriptionModel from "./model";

export const SubscriptionApis = new DefaultApiService<SubscriptionModel>(ServiceName.SUBSCRIPTIONS);
