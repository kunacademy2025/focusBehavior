import { BaseModel } from "@/models/base.model";
import PaymentModel from "../payments/model";

export default interface PromoCodeModel extends BaseModel {
  code: string;
  discount_amount: number;
  percentage: boolean;
  used: number;
  unlimited: boolean;
  limit: number;
  payments: PaymentModel
}
