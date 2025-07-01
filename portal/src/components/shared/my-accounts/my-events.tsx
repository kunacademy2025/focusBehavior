"use server";
import { Empty } from "rizzui";
import { MyEventCard } from "../card/my-event-card";
import { getTranslation } from "@/i18n";
import Pagination from "@/components/ui/pagination";
import { MetaModel } from "@/models/meta.model";
import { routes } from "@/config";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { TransactionTable } from "@/app/[lang]/(main)/account/events-old/_components/table";

export const MyEvents = async ({
  data,
  payments,
  lang,
  pagination: { pageCount, page },
}: {
  data: any[];
  payments: any[];
  lang: string;
  pagination: MetaModel;
}) => {
  const { t } = await getTranslation("common", lang);

  return (
    <section className="overflow-hidden">
      <div className="container w-full h-full py-4">
        <TabGroup>
          <TabList className="bg-veryLightGray h-16 border-b border-gray-200 flex items-start overflow-x-auto">
            <Tab
              className={
                "text-sm lg:text-base px-6 h-full data-[selected]:border-b-3 border-b-primary outline-note focus:outline-none text-secondary font-medium border-r-1 border-r-gray-200 hover:border-b-3 transition-all duration-[50ms] whitespace-nowrap"
              }
            >
              <h3 className="text-primary font-medium text-lg">
                {t("elements.account.my_event")}
              </h3>
            </Tab>
            <Tab
              className={
                "text-sm lg:text-base px-6 h-full data-[selected]:border-b-3 border-b-primary outline-note focus:outline-none text-secondary font-medium border-r-1 border-r-gray-200 hover:border-b-3 transition-all duration-[50ms] whitespace-nowrap"
              }
            >
              <h3 className="text-primary font-medium text-lg">
                {t("elements.account.transactions")}
              </h3>
            </Tab>
          </TabList>
          <TabPanels className={"rounded-b-lg"}>
            <TabPanel key={"panel1"}>
              <div className="flex items-start gap-x-4">
                <div className="w-full h-full">
                  <div className="grid grid-cols-1 gap-x-4 gap-y-4 divide-y-1 divide-gray-200">
                    {data && data.length > 0 ? (
                      data?.map((item: any, index: number) => (
                        <MyEventCard key={index} item={item} lang={lang} />
                      ))
                    ) : (
                      <div className="col-span-full">
                        <Empty text="No Data" textClassName="mt-2 py-6" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Pagination
                pageCount={pageCount}
                pageIndex={page}
                routeName={routes.accountEvents("", lang)}
                className="mt-10"
              />
            </TabPanel>
            <TabPanel>
              <TransactionTable
                data={payments}
                headers={{
                  order: t("elements.payment.order_code"),
                  name: t("elements.payment.payment_name"),
                  total: t("elements.payment.payment_total"),
                  paymentStatus: t("elements.payment.payment_status"),
                  date: t("elements.payment.payment_date"),
                  title: t("elements.payment.payment_title"),
                  action: t("elements.payment.payment_action"),
                  retry: t("elements.payment.try_again"),
                }}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </section>
  );
};
