import { BaseModel } from "@/models/base.model";

export default interface UserModel extends BaseModel {
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: boolean;
  blocked: boolean;
  role: unknown;
  first_name: string;
  last_name: string;
  phone_number: string;
  display_name: string;
}
