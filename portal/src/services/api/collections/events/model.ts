import { BaseModel } from "@/models/base.model";
import { DynamicZoneModel } from "@/models/dynamic.model";
import { MediaModel } from "@/models/media.model";
import { SeoModel } from "@/models/seo.model";
import EventTypeModel from "../event-types/model";
import SubscriptionModel from "../subscriptions/model";
import TicketModel from "../tickets/model";
import TrainingScheduleModel from "../training-schedule/model";
import TagModel from "../tags/model";
import BookingModel from "../event-booking/model";

export default interface EventModel extends BaseModel {
  Hero: {
    title: string;
    brief: string;
    media: MediaModel;
  }[];
  slug: string;
  title: string;
  brief: string;
  price: number;
  discounted_price: number;
  search_keywords: string;
  main_image: MediaModel;
  video: MediaModel;
  video_url: string;
  startDate: string;
  endDate: string;
  door_time: string;
  phone_number: string;
  email: string;
  type: string;
  showOnBanner: boolean;
  location: {
    coordinates: { lat: string; lng: string };
  };
  content: DynamicZoneModel[];
  private_content: DynamicZoneModel[];
  include_public: boolean;
  featured_in_hero: boolean;
  featured: boolean;
  event_type: EventTypeModel;
  is_included_in_subscription: boolean;
  training_schedules: TrainingScheduleModel[];
  subscription_plans: SubscriptionModel[];
  tickets: TicketModel[];
  tags: TagModel[];
  seo: SeoModel;
  old_content: {
    title: string;
    content: string;
    date: string;
    publish: boolean;
  }[];
  room: any;
  event_booking: BookingModel;
}
