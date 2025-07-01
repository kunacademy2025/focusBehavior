"use client";

import toast from "react-hot-toast";
import { Button } from "rizzui";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import { startTransition, useEffect, useRef, useState } from "react";
import { getStrapiId } from "@/utils";
import { useRouter } from "next/navigation";
import { routes } from "@/config";
import { recreatePaymentLink } from "@/services/api/collections/payments/actions";
import { useTranslation } from "@/i18n/client";
import { useForm } from "react-hook-form";
import { processPaymentAction } from "./action";
import { useForms } from "@/hooks/useForms";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { processPaymentSchema } from "./schema";
import { formatPrice } from "@/utils/formatPrice";

export const ProcessPayment = ({ data }: { data: any }) => {
  const { t } = useTranslation("common");
  const { payment_status, total, order_code, payment_link } = data;
  const id = getStrapiId(data);

  const {
    state: formState,
    formAction,
    isPending,
    captcha,
  } = useForms(processPaymentAction, { success: false });

  const formRef = useRef<HTMLFormElement>(null);

  const {
    formState: { errors, isSubmitSuccessful },
    setValue,
    register,
    handleSubmit,
  } = useForm<z.output<typeof processPaymentSchema>>({
    resolver: zodResolver(processPaymentSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("captcha", "");
  }, [captcha]);

  const { push } = useRouter();

  useEffect(() => {
    if (
      isSubmitSuccessful &&
      formState.success &&
      formState.payment_lnk_created
    ) {
      toast.success(`Your request submitted successfully`);

      if (formState.remote_pay_link) {
        push(formState.remote_pay_link);
      }
    } else if (isSubmitSuccessful && formState.success) {
      toast.error(formState.pay_link_msg);
      if (formState.payment_link) {
        push(formState.payment_link);
      }
    }
  }, [isSubmitSuccessful, formState.success, t, formState.message]);

  const getUrl = () => {
    const { event_booking } = data;
    if (event_booking) return routes.accountEvents("");
    return "/";
  };

  const link = payment_link || "/";
  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(() => {
          startTransition(() => formAction(new FormData(formRef.current!)));
        })(evt);
      }}
    >
      {payment_status === "Pending" ? (
        <div className="flex flex-col items-center space-y-4 pt-40">
          <p className="text-2xl">{t("elements.payment.payment_pending")}</p>
          <p className="text-lg text-center">
            {t("elements.payment.payment_pending_message")}
          </p>

          <Button
            type="submit"
            variant="text"
            className="mt-6 uppercase text-white bg-[#ff9d3b] hover:bg-[#ffaa3b] hover:text-white"
            isLoading={isPending}
          >
            {t("elements.payment.retry_payment")}
          </Button>
        </div>
      ) : payment_status === "Paid" ? (
        <div className="flex flex-col items-center space-y-4 pt-40">
          <p className="text-2xl">{t("elements.payment.payment_successful")}</p>
          <p className="text-lg text-center">
            {t("elements.payment.payment_received_message")}{" "}
            {formatPrice(total)}
            .
            <br />
            {t("elements.payment.order_code")}:{" "}
            <span className="font-medium">{order_code}</span>.
          </p>

          <Link href={getUrl()}>
            <Button
              variant="text"
              className="mt-6 uppercase text-white bg-[#a7c957] hover:bg-[#b1d55c] hover:text-white"
            >
              {t("elements.payment.continue")}
            </Button>
          </Link>
        </div>
      ) : payment_status === "Error" ? (
        <div className="flex flex-col items-center space-y-4 pt-40">
          <p className="text-2xl">{t("elements.payment.payment_failed")}</p>
          <p className="text-lg text-center">
            {t("elements.payment.payment_failed_message")}
          </p>

          <Button
            type="submit"
            variant="text"
            className="mt-6 uppercase text-white bg-red-600 hover:bg-red-500 hover:text-white"
            isLoading={isPending}
          >
            {t("elements.payment.try_again")}
          </Button>
        </div>
      ) : payment_status === "Cancelled" ? (
        <div className="flex flex-col items-center space-y-4 pt-40">
          <p className="text-2xl">{t("elements.payment.payment_cancelled")}</p>
          <p className="text-lg text-center">
            {t("elements.payment.payment_cancelled_message")}
          </p>

          <Button
            type="submit"
            variant="text"
            className="mt-6 uppercase text-white bg-red-600 hover:bg-red-500 hover:text-white"
            isLoading={isPending}
          >
            {t("elements.payment.try_again")}
          </Button>
        </div>
      ) : (
        <></>
      )}
      <input type="hidden" id="captcha" {...register(`captcha`)} />
      <input type="hidden" id="id" {...register(`id`)} value={id} />
    </form>
  );
};
