import { DiscountTypes } from "@/config";
import { getStrapiData } from "@/utils";

export const regulateDiscountedPrice = (
  price: number,
  applied_discounts?: any[]
): number => {
  const discounts: number[] =
    applied_discounts
      ?.filter((item: any) => item.salesPrice !== price)
      .reduce((acc: number[], item: any) => [...acc, item.salesPrice], []) ||
    [];
  return (discounts?.length > 0 && Math.max(...discounts)) || 0;
};

export const getAppliedDiscounts = (price: number, discounts?: any[]) => {
  if (discounts?.length) {
    const value = discounts?.reduce(
      (acc: Array<any>, curr: any, index: number) => {
        const {
          type,
          hasPeriod,
          startDate,
          endDate,
          discountValue,
          discountPercent,
        } = getStrapiData(curr);
        if (
          !hasPeriod ||
          (hasPeriod &&
            new Date(startDate) <= new Date() &&
            new Date(endDate) >= new Date())
        ) {
          if (type === DiscountTypes.BuildDiscount) {
            const new_price = calculateDiscount(
              price,
              discountPercent,
              discountValue
            );
            return [
              ...acc,
              {
                salesPrice: new_price,
                isDiscounted: new_price !== price,
                buy1Get1: false,
                freeShipping: false,
              },
            ];
          } else
            return [
              ...acc,
              {
                salesPrice: price,
                isDiscounted: false,
                buy1Get1: type === DiscountTypes.Buy1Get1,
                freeShipping: type === DiscountTypes.FreeShipping,
              },
            ];
        }
      },
      []
    );
    return value;
  }
  return [];
};

function calculateDiscount(
  price: number,
  isPercentage: boolean,
  value: number
) {
  return isPercentage
    ? Math.ceil(price * (1 - value / 100))
    : price - Math.min(price, value);
}
