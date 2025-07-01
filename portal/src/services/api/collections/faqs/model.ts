import { BaseModel } from "@/models/base.model";

export default interface FAQModel extends BaseModel {
  question: string;
  answer: unknown;
  sort_order: number;
}
