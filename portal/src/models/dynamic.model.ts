import { ActionButtonModel } from "./global.model";
import { MediaModel } from "./media.model";

export type DynamicZoneModel =
  | ContentBlockModel
  | ContentColumnsModel
  | HighlightListModel
  | MediaBlockModel
  | TextAndImageModel;

export interface ContentBlockModel {
  title: string;
  content: string;
  action_buttons: ActionButtonModel;
  media: MediaModel;
}

export interface ContentColumnsModel {
  title: string;
  hide_title: boolean;
  gray_bg: boolean;
  items: {
    title: string;
    brief: string;
    image: MediaModel;
    icon: MediaModel;
  };
}

export interface HighlightListModel {
  title: string;
  hide_title: boolean;
  gray_bg: boolean;
  items: {
    title: string;
    brief: string;
    icon: MediaModel;
  };
}

export interface MediaBlockModel {
  title: string;
  hide_title: boolean;
  media: MediaModel;
  video_url: string;
  cover: MediaModel;
}

export interface TextAndImageModel {
  title: string;
  subtitle: string;
  full_width_image: boolean;
  content: string;
  image: MediaModel;
  image_on_left: boolean;
  action_buttons: ActionButtonModel;
  highlights: {
    title: string;
    brief: string;
    icon: MediaModel;
  };
}
