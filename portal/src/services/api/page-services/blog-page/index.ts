import {DefaultApiService} from "@/services/api-services/defaultApiService";
import {ServiceName} from "@/services/api-services/servicesNames";
import BlogPageModel from "./model";

export const BlogPageApis = new DefaultApiService<BlogPageModel>(ServiceName.BLOG_PAGE);