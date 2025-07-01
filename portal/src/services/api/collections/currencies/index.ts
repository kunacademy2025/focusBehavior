import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import CurrencyModel from "./model";

export const CurrenciesApis = new DefaultApiService<CurrencyModel>(
  ServiceName.CURRENCY
);
