"use client";

import { Button, cn, Divider } from "@nextui-org/react";
import { GoShareAndroid } from "react-icons/go";
import Link from "next/link";
import React from "react";
import { useModal } from "@/context";
import { formatEmail, getStrapiData } from "@/utils";
import SpeakerModel from "@/services/api/collections/speakers/model";
import { EmailLink, PhoneLink } from "@/components/controls";
import { useTranslation } from "@/i18n/client";

export const SideContent = ({
  data,
  lang,
}: {
  data: SpeakerModel;
  lang: string;
}) => {
  const { openModal } = useModal();
  const { t } = useTranslation("common", lang);

  const {
    name,
    profession,
    phone_number,
    email,
    location,
    address,
    social_links,
  } = data || {};

  return (
    <>
      <div className="bg-white flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-6 bg-veryLightGray rounded-lg">
          {/* title and share */}
          <div className="pt-8 flex gap-4 flex-wrap items-center justify-between  p-4 ">
            <h3 className="text-lg lg:text-xl font-bold text-secondary">
              {t("titles.speaker_details")}
            </h3>
            <div className="flex items-center gap-x-2 ">
              <Button
                startContent={<GoShareAndroid className="w-5 h-5" />}
                variant="solid"
                className="text-primary bg-white font-medium rounded-lg"
                onPress={() => openModal("share", { title: name })}
              >
                {t("terms.share")}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 px-4 pb-4">
            {/* description */}
            <div className="flex flex-col gap-4 w-full items-start justify-between sm:text-lg">
              {name && (
                <h3 className="text-lg font-semibold text-primary">{name}</h3>
              )}
              {profession && (
                <div className="flex flex-col">
                  <>
                    <p className="text-secondary"> {t("titles.profession")}</p>
                    <p className="text-primary">{profession}</p>
                  </>
                </div>
              )}
              <div className="flex flex-col lg:items-end">
                <>
                  <p className="text-secondary"></p>
                  <p className="text-primary text-lg sm:text-xl font-bold"></p>
                </>
              </div>
            </div>
            {(phone_number || email) && <Divider className="my-2" />}
            {/* Description */}
            <div className="flex flex-wrap gap-4 w-full sm:flex-row items-start justify-between sm:text-lg">
              {phone_number && (
                <InfoSection
                  title="Phone"
                  icon="fa-sharp fa-regular fa-phone"
                  text={
                    <PhoneLink phone_number={phone_number}>
                      {phone_number}
                    </PhoneLink>
                  }
                />
              )}
              {email && (
                <InfoSection
                  title="Email"
                  icon="fa-sharp fa-regular fa-envelope"
                  text={
                    <EmailLink email={email}>{formatEmail(email)}</EmailLink>
                  }
                />
              )}
            </div>
          </div>
        </div>
        {(location || address) && (
          <div className="flex flex-col gap-y-6 bg-veryLightGray rounded-lg p-4 lg:p-8">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <div className="flex items-center justify-between">
                  <h4 className="text-primary font-semibold text-lg">
                    {t("titles.details")}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-4 w-full sm:flex-row items-start justify-between sm:text-lg">
                  {location && (
                    <InfoSection
                      title={t("titles.location")}
                      icon="fa-regular fa-map"
                      text={location}
                    />
                  )}
                  {address && (
                    <InfoSection
                      title={t("titles.address")}
                      icon="fa-regular fa-location-dot"
                      text={address}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {social_links && social_links?.length > 0 && (
          <div className="flex flex-col gap-y-6 bg-veryLightGray rounded-lg p-4 lg:p-8">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <div className="flex items-center justify-between">
                  <h4 className="text-primary font-semibold text-lg">
                    {t("titles.network")}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-4 w-full sm:flex-row items-start justify-between sm:text-lg">
                  <ul
                    className={cn(
                      ` flex items-center list-none caret-transparent gap-x-3 mt-2`
                    )}
                  >
                    <li>
                      <i className="fa-sharp fa-regular fa-share-nodes text-primary fa-lg lg:fa-xl ltr:mr-2 rtl:ml-2"></i>
                    </li>
                    {social_links?.map((item: any, index: number) => {
                      const { link, title, icon } = getStrapiData(item);
                      return (
                        <li key={index}>
                          <Link
                            href={link}
                            target="_blank"
                            rel="nofollow"
                            className={cn("transition duration-500 w-9 h-9")}
                            title={title}
                          >
                            <i
                              className={`fa-brands fa-${icon} text-secondary/85 hover:text-primary transition`}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const InfoSection = ({
  title,
  icon,
  text,
}: {
  title: string;
  icon: string;
  text: any;
}) => (
  <div className="flex flex-col gap-y-2">
    <h4 className="text-secondary font-semibold text-lg">{title}</h4>
    <div className="text-secondary text-base lg:text-lg flex flex-wrap">
      <i className={`${icon} text-primary fa-lg ltr:mr-2 rtl:ml-2`} />
      {text}
    </div>
  </div>
);
