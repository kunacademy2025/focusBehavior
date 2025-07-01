import { MediaModel } from "./media.model";
export interface HeroModel {
  title: string;
  brief: string;
  action_buttons: {
    label: string;
    link: string;
    download: MediaModel;
    style: "";
  }[];
  media: MediaModel;
}
