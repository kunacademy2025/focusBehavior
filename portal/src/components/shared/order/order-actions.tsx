"use client";

import { confirmAlert } from "react-confirm-alert";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStrapiData, getStrapiId } from "@/utils/index";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  cancelPayment,
  recreatePaymentLink,
} from "@/services/api/collections/payments/actions";
import { PaymentStatus } from "./PaymentStatus";
import { Button } from "@/components/ui/forms/button";
import toast from "react-hot-toast";
import { useApp } from "@/context/app.context";
import { useTranslation } from "@/i18n/client";

export const OrderActions = ({
  item,
  id,
  lang,
}: {
  item: any;
  id: number;
  lang: string;
}) => {
  interface AppUser {
    id?: number | string;
    [key: string]: any;
  }

  interface AppState {
    user?: {
      user?: AppUser;
      [key: string]: any;
    };
    [key: string]: any;
  }

  const { state } = useApp() as { state: AppState };

  const [cancelLoading, setCancelLoading] = useState<boolean>(false);

  const { push, refresh } = useRouter();

  const { t } = useTranslation("common", lang);

  const {
    payment_status,
    customer,
  }: {
    payment_status: PaymentStatus;
    [x: string]: any;
  } = getStrapiData(item);

  const orderId = getStrapiId(item);

  const handleCancel = () => {
    const setCancel = async () => {
      const customerId = getStrapiId(customer);

      if (customerId === (Number(state.user?.user?.id) || 0)) {
        setCancelLoading(true);
        await cancelPayment(orderId);
        setCancelLoading(false);
        refresh();
      }
    };

    confirmAlert({
      title: t("elements.payment.cancel_order"),
      message: t("elements.payment.cancel_order_msg"),
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setCancel();
          },
        },
        { label: "No" },
      ],
    });
  };

  const handlePay = async () => {
    try {
      const response = await recreatePaymentLink(Number(id));
      if (response.success) {
        const {
          payment_lnk_created,
          remote_pay_link,
          pay_link_msg,
          payment_link,
        } = response.data;

        if (payment_lnk_created) {
          if (remote_pay_link) {
            toast.success("Redirecting to payment...");
            push(remote_pay_link);
          }
        } else {
          toast.error(pay_link_msg ?? "Failed to create payment link.");
          if (payment_link) {
            push(payment_link);
          }
        }
      }
    } catch (error) {}
  };

  return (
    <>
      {(payment_status === "Error" || payment_status === "Pending") && (
        <Button
          className="px-4 py-2 bg-red-950 text-white hover:bg-red-900"
          onClick={() => handleCancel()}
          isLoading={cancelLoading}
        >
          {t("elements.payment.cancel_order")}
        </Button>
      )}
      {(payment_status === "Error" || payment_status === "Pending") && (
        <Button
          className="px-4 py-2 bg-primary hover:bg-secondary text-white border border-primary"
          onClick={() => handlePay()}
        >
          {t("elements.payment.pay_now")}
        </Button>
      )}
    </>
  );
};
