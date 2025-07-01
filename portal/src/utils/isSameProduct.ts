import { CartItem, CartItemCustomization } from "@/interfaces";
import { getStrapiId } from "@/utils/index";

export const isSameProduct = (
  cartItem: CartItem,
  product: any,
  customizations?: any[]
) => {
  const sameProduct = cartItem.product_id === getStrapiId(product);
  if (!sameProduct) return false;

  let sameCustomizations = true;
  cartItem.customizations?.forEach(
    (customization_item: CartItemCustomization) => {
      if (sameCustomizations)
        sameCustomizations =
          sameCustomizations &&
          customizations?.find(
            (custom_item: CartItemCustomization) =>
              custom_item.classId === customization_item.classId &&
              getStrapiId(custom_item.product) ===
                getStrapiId(customization_item.product)
          );
    }
  );
  return sameProduct && sameCustomizations;
};
