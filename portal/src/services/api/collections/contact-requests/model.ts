import { BaseModel } from "@/models/base.model";

export default interface ContactRequestModel extends BaseModel {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: number;
  source_url: string;
  source_page: string;
  source_ip: string;
  source_country: string;
  source_referrer: string;
  request_status: "New" | "Resolved";
}
