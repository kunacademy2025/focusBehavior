"use client";

import { getMediaInfo } from "@/utils";
import { formatPrice } from "@/utils/formatPrice";
import { motion } from "framer-motion";
import { CustomImage } from "@/components/controls";
import { useTranslation } from "@/i18n/client";
import { CiImageOff } from "react-icons/ci";
import { useBooking } from "@/context/booking.context";
import { useCheckout } from "./utils";
import { Button } from "@/components/ui/forms/button";

export const CheckoutSummary = ({
  lang,
  isPending,
  register,
}: {
  lang?: string;
  isPending: boolean;
  register: any;
}) => {
  const { bookingData } = useBooking();
  const { t } = useTranslation("common", lang);

  if (!bookingData) return null;

  const { ticket, event, ticket_quantity } = bookingData || {};
  const itemTitle = event?.title;
  const itemImage = event?.main_image;
  const itemPrice = (ticket?.price || 0) * (ticket_quantity || 1);

  const { imgUrl, alt, width, height } = getMediaInfo(itemImage);
  const { subtotal, tax, total, discount } = useCheckout(itemPrice);

  const customBookingData = {
    userId: bookingData.userId,
    eventId: bookingData.event.id,
    ticketId: bookingData.ticket.id,
    ticket_quantity: bookingData.ticket_quantity,
    booking_date: bookingData.booking_date,
    access_type: bookingData.access_type,
    status: bookingData.status,
    subscription: bookingData.subscription,
    expiry_date: bookingData.event?.endDate,
  };

  return (
    <>
      <div className="rounded-2xl flex flex-col justify-self-end lg:w-8/12 w-full bg-gray-100 mt-4 lg:mt-0">
        <h3 className="text-primary text-3xl font-medium flex justify-start w-full lg:ltr:ml-6 lg:rtl:mr-6 pt-4">
          {t("titles.summary")}
        </h3>
        <div className="mt-8 w-full min-h-40 bg-[#ececec]">
          <div className="grid grid-cols-2 gap-x-4 h-full px-6 pt-10 pb-10">
            <div className="flex flex-col items-start justify-start">
              {itemTitle && (
                <h3 className="font-medium text-darkGray text-xs sm:text-sm">
                  {itemTitle}
                </h3>
              )}
            </div>
            <div className="flex flex-col items-end justify-start">
              {itemImage ? (
                <CustomImage
                  src={imgUrl}
                  alt={alt}
                  width={width}
                  height={height}
                  className={`h-16 w-16 rounded-xl object-cover object-center`}
                />
              ) : (
                <div className="grid place-content-center h-16 w-16 rounded-xl bg-gray-200">
                  <CiImageOff className="w-8 h-8 text-gray-400" />
                </div>
              )}
              {itemPrice && (
                <p className="text-primary text-lg mt-4 font-medium">
                  {formatPrice(itemPrice)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="py-4 px-6 lg:px-8 mt-auto">
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label
                htmlFor="subtotal"
                className="block font-medium text-darkGray"
              >
                {t("forms.subtotal")}:
              </label>

              <p className="text-primary">{formatPrice(subtotal)}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between mt-2"
            >
              <label
                htmlFor="subtotal"
                className="block font-medium text-darkGray"
              >
                {t("forms.discount")}:
              </label>
              <p className="text-primary">{`${formatPrice(discount)}`}</p>
            </motion.div>

            {tax > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between mt-2"
              >
                <label
                  htmlFor="tax"
                  className="block font-medium text-darkGray"
                >
                  {t("forms.tax")}:
                </label>
                <p className="text-primary">{formatPrice(tax)}</p>
              </motion.div>
            )}

            <div className="flex items-center justify-between mt-8">
              <label
                htmlFor="subtotal"
                className="block font-semibold text-darkGray"
              >
                {t("forms.order_total")}:
              </label>

              <p className="text-primary font-bold text-xl transition-all duration-300">
                {formatPrice(total)}
              </p>
            </div>
          </div>
          <Button
            type="submit"
            isLoading={isPending}
            className="mt-6 mb-4 py-3 w-full bg-primary hover:bg-primary/90 text-white"
          >
            {isPending ? t("forms.processing") : t("forms.proceed_checkout")}
          </Button>
          <a
            href="https://api.whatsapp.com/send?phone=97144202912&text=مرحباً، أرغب في تقسيم الدفعة مع تابي."
            target="_blank"
            className="mt-6 mb-4 py-3 flex justify-items-center justify-center rounded shadow-lg items-center w-full text-black bg-white hover:text-white hover:bg-primary/90"
          >
            <img
              src="https://d37mzwcv0vfzkr.cloudfront.net/media_files/1738839408-2f961ed5-ad9d-4075-b964-0114f20963a5.webp"
              alt="Tabby"
              width={50}
              height={50}
              className="mx-3" 
            />
            { t("forms.proceed_with_tabby")}
          </a>
        </div>
      </div>
      <input
        type="hidden"
        {...register(`bookingData`)}
        value={JSON.stringify(customBookingData)}
      />
      <input
        type="hidden"
        {...register(`ticket_quantity`)}
        value={ticket_quantity}
      />
      <input type="hidden" {...register(`subtotal`)} value={subtotal} />
      <input type="hidden" {...register(`discount`)} value={discount} />
      <input type="hidden" {...register(`tax`)} value={tax} />
      <input type="hidden" {...register(`total`)} value={total} />
    </>
  );
};
