import { BaseModel } from "@/models/base.model";
import { HeroModel } from "@/models/hero.model";
import { MediaModel } from "@/models/media.model";
import { SeoModel } from "@/models/seo.model";

export default interface HomePageModel extends BaseModel {
  hero: HeroModel[];
  title: string;
  intro: string;
  journey_title: string;
  journey_intro: string;
  journey_image: MediaModel;
  about_title: string;
  about_subtitle: string;
  about_brief: string;
  about_image: MediaModel;
  testimonials_intro: string;
  blog_intro: string;
  newsletter_title: string;
  newsletter_intro: string;
  newsletter_image: MediaModel;
  floating_whatsapp_label: string;
  floating_whatsapp_url: string;
  upcoming_events_intro: string;
  footer_slogan: string;
  footer_intro: string;
  banner: {
    title: string;
    link_title: string;
    link: string;
  };
  gallery: {
    title: string;
    brief: string;
    images: MediaModel[];
    url: string;
  };
  seo: SeoModel;
}
