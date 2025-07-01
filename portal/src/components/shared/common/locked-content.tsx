"use client";
import React, { PropsWithChildren } from "react";
import { Text } from "rizzui";
import { MdOutlineLockPerson } from "react-icons/md";
import { useTranslation } from "@/i18n/client";
import { useUserInfo } from "@/hooks";
export const LockedContent = ({
  buttonLbl,
  hasPurchased = false,
}: {
  buttonLbl?: string;
  hasPurchased?: boolean;
}) => {
  const { t } = useTranslation("common");
  const { loggedIn } = useUserInfo();

  // const { openCourseEnquire } = useModal();

  const Wrapper = ({
    children,
    className,
  }: PropsWithChildren<{ className?: string }>) => {
    return <>{children}</>;
  };

  return (
    <div className="relative container w-full my-4">
      <div className="p-4 flex flex-col gap-y-4">
        <h2 className="title">{t("titles.locked_content")}</h2>
        <p className="text-lg text-secondary">
          {loggedIn && !hasPurchased
            ? t("messages.please_login_to_view_content")
            : t("messages.buy_ticket_to_view_content")}
        </p>
      </div>
      {/* backdrop-blur-lg */}
      <div className="absolute inset-0 backdrop-blur-md grid place-content-center">
        <Wrapper className="py-2 px-3 group hover:bg-primary/80 bg-primary text-white hover:text-white rounded-lg flex items-center justify-between lg:gap-x-4 transition-all duration-300">
          <div className="p-4 flex flex-col gap-y-4">
            <div className="flex items-center gap-3">
              <MdOutlineLockPerson className="w-8 h-8" />
              <h2 className="title text-xl">{t("titles.locked_content")}</h2>
            </div>
            <p className="text-base lg:text-lg text-secondary">
              {loggedIn && !hasPurchased
                ? t("messages.please_login_to_view_content")
                : t("messages.buy_ticket_to_view_content")}
            </p>
          </div>
          <Text className="capitalize whitespace-nowrap font-medium hidden 2xl:block">
            {buttonLbl ? buttonLbl : t("buttons.enroll_now")}
          </Text>
        </Wrapper>
      </div>
    </div>
  );
};
