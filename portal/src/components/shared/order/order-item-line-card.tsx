"use client";

import Link from "next/link";

import { getMediaInfo, getStrapiData, path } from "@/utils/index";
import { CustomImage } from "@/components/controls";
import { formatPrice } from "@/utils/formatPrice";
import { routes } from "@/config";

export const OrderItemLineCard = ({ item }: { item: any }) => {
  const { quantity, product, unit_price } = getStrapiData(item);
  const { title, main_image, slug, category } = getStrapiData(product);
  const { imgUrl, width, height, alt } = getMediaInfo(main_image);

  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-border-base text-[12px] md:text-[14px]">
      <div className="self-center col-span-1">
        <Link href={routes.events(slug)}>
          <CustomImage
            src={imgUrl}
            alt={alt}
            width={width}
            height={height}
            resizeHeight={400}
            resizeWidth={400}
          />
        </Link>
      </div>
      <div className="self-center col-span-7 px-2">
        <h2 className="text-primary">
          <Link href={routes.events(slug)} className="hover:text-secondary">
            {title}
          </Link>
        </h2>
      </div>
      <div className="self-center sm:col-span-2 col-span-1 text-center md:ltr:text-left md:rtl:text-right px-2">
        <p>x{quantity}</p>
      </div>
      <div className="self-center sm:col-span-2 col-span-3 px-2">
        <p>{formatPrice(quantity * unit_price)}</p>
      </div>
    </div>
  );
};
