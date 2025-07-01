"use server";

import { formatEmail, getStrapiData } from "@/utils";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { cn } from "@/utils";
import { EmailLink, PhoneLink } from "@/components/controls";
import { FC } from "react";
import { Divider } from "@nextui-org/react";
import { MdLocalPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import ReactGoogleMap from "@/components/ui/react-google-map";
import Link from "next/link";
import ContactPageModel from "@/services/api/page-services/contact-page/model";
import { getTranslation } from "@/i18n";
import { FaEnvelope } from "react-icons/fa6";

interface Props {
  data: ContactPageModel;
  lang: string;
}

export const ContactInfo: FC<Props> = async ({ data, lang }) => {
  const { t } = await getTranslation("common", lang);
  const { title, phone_numbers, whatsapp_numbers, locations } = data;

  return (
    <section className="bg-white">
      <div className={cn("relative overflow-hidden py-10")}>
        <div
          className={cn("global-container w-full h-full pb-16 overflow-hidden")}
        >
          {title && (
            <h2 className="capitalize text-xl md:text-2xl lg:text-3xl leading-normal text-primary mb-6">
              {title}
            </h2>
          )}
          <div
            className={cn("grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8")}
          >
            <FadeAnimation direction={"left"}>
              <div
                className={cn(
                  "w-full h-full lg:h-[400px] p-6 bg-veryLightGray rounded-2xl"
                )}
              >
                <div className="flex flex-col gap-y-3 text-lg">
                  <h5 className="title text-xl lg:text-2xl">{locations?.title}</h5>
                  <p className="text-sm lg:text-base leading-none">{locations?.intro}</p>
                  <p className="text-sm lg:text-base leading-none">{locations?.address}</p>

                  <div className="flex flex-col md:flex-row font-medium lg:items-center gap-x-4 text-sm lg:text-base">
                    <h3 className="font-medium text-primary flex items-center ltr:mr-2 rtl:ml-2">
                      <FaEnvelope className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                      {t("contact.email")}:{" "}
                    </h3>
                    <EmailLink email={locations?.email}>
                      <p className="text-base">
                        {formatEmail(locations?.email)}
                      </p>
                    </EmailLink>
                  </div>
                  <Divider className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    {phone_numbers && phone_numbers?.length > 0 && (
                      <div className="flex flex-col gap-y-4">
                        <h3 className="text-lg font-medium text-primary flex items-center">
                          <MdLocalPhone className="w-6 h-6 ltr:mr-2 rtl:ml-2" />
                          {t("contact.phone")}
                        </h3>
                        <ul className="flex flex-col gap-y-1 font-medium text-base lg:text-lg">
                          {phone_numbers?.map((p: any, index: number) => {
                            const { phone, label } = getStrapiData(p);
                            return (
                              <li key={index} className="text-secondary">
                                <PhoneLink phone_number={phone}>
                                  {phone}
                                </PhoneLink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                    {whatsapp_numbers && whatsapp_numbers?.length > 0 && (
                      <div className="flex flex-col gap-y-4 ">
                        <h3 className="text-lg text-primary font-medium flex items-center">
                          <FaWhatsapp className="w-6 h-6 ltr:mr-2 rtl:ml-2" />
                          {t("contact.whatsapp")}
                        </h3>
                        <ul className="flex flex-col gap-y-1 font-medium text-base lg:text-lg">
                          {whatsapp_numbers.map((w: any, index: number) => {
                            const { phone } = getStrapiData(w);
                            const whatsappLink = `https://wa.me/${phone?.replace(
                              /\D/g,
                              ""
                            )}`;

                            return (
                              <li key={index} className="text-secondary">
                                <Link
                                  href={whatsappLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {phone}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeAnimation>
            <FadeAnimation direction={"right"}>
              <div
                className={cn(
                  "w-full h-full lg:h-[400px] rounded-2xl overflow-hidden"
                )}
              >
                <ReactGoogleMap
                  lat={parseFloat(locations?.latitude as string) || 0}
                  lng={parseFloat(locations?.longitude as string) || 0}
                />
              </div>
            </FadeAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};
