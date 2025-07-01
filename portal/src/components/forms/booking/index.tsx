"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { formatPrice } from "@/utils/formatPrice";
import { getMediaInfo, parseContent } from "@/utils";
import { CustomImage } from "@/components/controls";
import { useTranslation } from "@/i18n/client";
import { routes } from "@/config";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/booking.context";
import { useModal } from "@/context";

export const BookingForm = ({ event, ticket, user, lang, endDate }: any) => {
  const { t } = useTranslation("common", lang);
  const { setBookingData } = useBooking();
  const { openModal } = useModal();
  const { title, price, description, image, sold_out, id } = ticket;
  const { push } = useRouter();
  const [isLoading, setLoading] = useState(false);

  const { handleSubmit } = useForm<{ quantity: number }>({
    defaultValues: { quantity: 1 },
  });

  const { imgUrl, alt, width, height } = getMediaInfo(image);

  const OnSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true);

    if (!user) {
      openModal("login");
      setLoading(false);
      return;
    }

    const formData = {
      userId: user?.id,
      event: event,
      ticket: ticket,
      ticket_quantity: 1,
      booking_date: new Date().toISOString(),
      access_type: "ticket",
      status: "active",
      subscription: null,
      expiry_date: endDate,
    };

    setBookingData(formData);
    push(routes.checkout(""));
  };

  return (
    <form
      onSubmit={handleSubmit(OnSubmit)}
      className="flex flex-col gap-3 items-center justify-start border px-8 rounded-xl hover:shadow-md cursor-pointer transition bg-white border-primary py-4 h-full"
    >
      <div className="">
        <CustomImage
          src={imgUrl}
          alt={alt}
          width={width}
          height={height}
          className="object-contain object-center h-32"
        />
      </div>
      <span className="text-lg text-center font-semibold uppercase">
        {title}
        <br />
        <span className="text-lg font-bold text-primary">
          {formatPrice(price)}
        </span>
        {description && <div className="mt-2">{parseContent(description)}</div>}
      </span>
      {!sold_out ? (
        <div className="flex flex-col items-center gap-2 mt-4">
          {/* <select
            {...register("quantity", { valueAsNumber: true })}
            className="border rounded-lg px-4 py-2 text-sm font-medium w-full"
            disabled={isLoading}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select> */}
          <Button
            isLoading={isLoading}
            type="submit"
            className="bg-primary text-white hover:bg-primary/95"
          >
            {t("buttons.buy_ticket")}
          </Button>
        </div>
      ) : (
        <span className="uppercase text-sm font-medium bg-gray-100 rounded-lg px-4 py-2">
          {t("buttons.sold_out")}
        </span>
      )}
    </form>
  );
};
