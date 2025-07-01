import {
  getAppliedDiscounts,
  regulateDiscountedPrice,
} from "./getAppliedDiscounts";
import { getStrapiData } from "./getStrapiData";
import { CartItem, CartRevisedItem } from "@/interfaces";

export const getCoursePrice = (
  item: CartItem,
  revisedItems?: CartRevisedItem[]
): number => {
  const { price, discounts } = getStrapiData(item.product);

  // if (outOfStock || item.quantity > stockQuantity) return 0;
  if (revisedItems && revisedItems.length) {
    const revisedItem = revisedItems.find(
      (revised_item) => revised_item.id === item.product_id
    );
    if (
      revisedItem &&
      (revisedItem.outOfStock || revisedItem.stockQuantity < item.quantity)
    )
      return 0;
  }
  const applied_discounts = getAppliedDiscounts(price, discounts?.data);
  const salesPrice = regulateDiscountedPrice(price, applied_discounts);
  let final_price = (salesPrice === 0 ? price : salesPrice) * item.quantity;
  if (item.customizations?.length)
    for (let i = 0; i < item.customizations?.length; i++) {
      const customization_item = item.customizations[i];
      if (
        !customization_item.isDefault &&
        customization_item.priceDifference !== 0
      )
        final_price += customization_item.priceDifference * item.quantity;
    }
  return final_price;
};
