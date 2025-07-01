import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import BlogModel from "./model";

export const BlogsApis = new DefaultApiService<BlogModel>(
  ServiceName.BLOGS
);
