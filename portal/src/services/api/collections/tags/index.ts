
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import TagModel from "./model";

export const TagsApis = new DefaultApiService<TagModel>(ServiceName.TAGS);
