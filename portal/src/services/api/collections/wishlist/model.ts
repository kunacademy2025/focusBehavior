import { BaseModel } from "@/models/base.model";
import EventModel from "../events/model";
import UserModel from "../user/model";

export default interface WishlistModel extends BaseModel {
  event: EventModel;
  user: UserModel;
}
