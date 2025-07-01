
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import FAQModel from "./model";

export const FAQsApis = new DefaultApiService<FAQModel>(ServiceName.FAQS);
