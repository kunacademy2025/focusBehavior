import { MediaModel } from "./media.model";

export interface ActionButtonModel {
  label: string;
  link: string;
  download: MediaModel;
  style: "primary" | "secondary";
}
