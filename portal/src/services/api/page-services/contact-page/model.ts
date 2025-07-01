import { BaseModel } from "@/models/base.model";
import { MediaModel } from "@/models/media.model";
import { PagebarModel } from "@/models/pagebar.model";
import { SeoModel } from "@/models/seo.model";

export default interface ContactPageModel extends BaseModel {
  pagebar: PagebarModel;
  title: string;
  phone_numbers: {
    label: string;
    phone: string;
  }[];
  whatsapp_numbers: {
    phone: string;
  }[];
  locations: {
    title: string;
    intro: string;
    address: string;
    phone_numbers: {
      label: string;
      phone: string;
    };
    email: string;
    latitude: string;
    longitude: string;
  };
  main_image: MediaModel;
  form_image: MediaModel;
  seo: SeoModel;
}
