import { BaseModel } from "@/models/base.model";

export default interface LeadModel extends BaseModel {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  source: unknown;
  related_items: string;
}
