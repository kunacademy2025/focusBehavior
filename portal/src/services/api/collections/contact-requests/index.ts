import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import ContactRequestModel from "./model";

export const ContactRequestApis = new DefaultApiService<ContactRequestModel>(
  ServiceName.CONTACTS
);
