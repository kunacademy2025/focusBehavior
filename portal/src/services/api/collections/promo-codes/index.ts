
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import PromoCodeModel from "./model";

export const PromoCodesApis = new DefaultApiService<PromoCodeModel>(ServiceName.PROMO_CODES);
