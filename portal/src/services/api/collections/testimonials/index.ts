
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import TestimonialModel from "./model";

export const TestimonialsApis = new DefaultApiService<TestimonialModel>(ServiceName.TESTIMONIALS);
