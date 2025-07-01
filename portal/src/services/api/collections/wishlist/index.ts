
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import WishlistModel from "./model";

export const WishlistApis = new DefaultApiService<WishlistModel>(ServiceName.WISHLISTS);
