"use client";

import { BiCheck, BiX } from "react-icons/bi";
import cn from "classnames";
import { useCallback, useMemo } from "react";
import { PaymentStatus } from "./PaymentStatus";
import { Scrollbar } from "./scrollbar";
import { useTranslation } from "@/i18n/client";

export const OrderStatusProgress = ({
  status,
  lang,
}: {
  status: "Cancelled" | "Pending" | "Paid" | "Error";
  lang: string;
}) => {
  const { t } = useTranslation("common", lang);

  const statusFlow: string[] = useMemo(() => {
    switch (status) {
      case "Cancelled":
        return ["pending", "cancelled"];
      case "Error":
        return ["pending", "error"];
      case "Paid":
        return ["pending", "paid"];
      case "Pending":
      default:
        return ["pending"];
    }
  }, [status]);

  const isCompleted = useCallback(
    (step: string) => {
      const stepIndex = statusFlow.indexOf(step);
      const currentIndex = statusFlow.indexOf(status.toLowerCase());
      return currentIndex >= stepIndex;
    },
    [status, statusFlow]
  );

  return (
    <Scrollbar className="w-full h-full">
      <div className="flex flex-row flex-nowrap w-full pt-8 pb-10">
        {statusFlow.map((item, index) => {
          const isCurrent = item === status;

          const failed =
            (item === "Error" || item === "Cancelled") && isCurrent;

          return (
            <div className="block w-3/12" key={index}>
              <div className="text-center">
                <div className="relative">
                  <span
                    className={cn(
                      "h-[33px] w-[33px] md:h-[55px] md:w-[55px] mx-auto border-solid border-2 md:border-4 border-white flex items-center justify-center rounded-full mb-3 z-10 relative",
                      {
                        "bg-primary": isCompleted(item),
                        "bg-[#E2E7EC]": !isCompleted(item),
                      }
                    )}
                  >
                    {failed ? (
                      <BiX className="text-white" size={25} />
                    ) : (
                      <BiCheck className="text-white" size={25} />
                    )}
                  </span>
                  <div
                    className={cn("absolute top-1/2 transform-[1/2] h-[5px]", {
                      "w-1/2 ltr:right-0 rtl:left-0": index === 0,
                      "w-full ltr:left-0 rtl:right-0":
                        index !== 0 && index !== statusFlow.length - 1,
                      "w-1/2 ltr:left-0 rtl:right-0":
                        index === statusFlow.length - 1,
                      "bg-primary": isCompleted(item),
                      "bg-[#E2E7EC]": !isCompleted(item),
                    })}
                  ></div>
                </div>
                <p className="text-[12px] md:text-[14px] font-medium">
                  {t(item)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Scrollbar>
  );
};
