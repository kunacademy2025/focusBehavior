import {DefaultApiService} from "@/services/api-services/defaultApiService";
import {ServiceName} from "@/services/api-services/servicesNames";
import AboutPageModel from "./model";

export const AboutPageApis = new DefaultApiService<AboutPageModel>(ServiceName.ABOUT_PAGE);