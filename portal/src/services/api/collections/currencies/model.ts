import { BaseModel } from "@/models/base.model";

export default interface CurrencyModel extends BaseModel {
  code: string;
  symbol: string;
  exchange_rate: number;
  is_active: boolean;
  is_default: boolean;
}
