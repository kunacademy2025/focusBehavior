
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import NewsletterModel from "./model";

export const NewsletterApis = new DefaultApiService<NewsletterModel>(ServiceName.NEWSLETTERS);
