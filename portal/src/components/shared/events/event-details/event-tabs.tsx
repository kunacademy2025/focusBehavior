"use client";
import React, { useEffect, useRef, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { SpeakerCardTwo } from "../../card/speaker-card-two";
import { Accordion } from "@/components/ui";
import { cn, formatDate, getStrapiId } from "@/utils";
import { SpeakerCardThree } from "../../card/speaker-card-three";
import ReactGoogleMap from "@/components/ui/react-google-map";
import EventModel from "@/services/api/collections/events/model";
import Link from "next/link";
import { useUserInfo } from "@/hooks";
import { BookingForm } from "@/components/forms/booking";
import SpeakerModel from "@/services/api/collections/speakers/model";
import moment from "moment";
import { useTranslation } from "@/i18n/client";

export const EventTabs = ({
  data,
  lang,
  canPurchase,
  canAccessContent,
}: {
  data: EventModel;
  lang: string;
  canPurchase: boolean;
  canAccessContent: boolean;
}) => {
  const { t } = useTranslation("common");
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const {
    training_schedules,
    tickets,
    location,
    startDate,
    endDate,
    type: eventType,
  } = data || {};

  const today = moment();
  const start = moment(startDate);
  const end = moment(endDate);

  const isShowing = today.isSameOrAfter(start) && today.isSameOrBefore(end);

  const allSpeakers = training_schedules?.flatMap((schedule) =>
    schedule?.session.flatMap((session) => session.speakers || [])
  );

  // Optional: Group speakers by their name or ID (if available)
  const groupedSpeakers = allSpeakers?.reduce(
    (acc: SpeakerModel[], speaker) => {
      if (!acc.some((item: SpeakerModel) => item.id === speaker.id)) {
        acc.push(speaker);
      }
      return acc;
    },
    []
  );

  const handleToggle = (index: number) => {
    setOpenIndexes((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(index)) {
        newState.delete(index);
      } else {
        newState.add(index);
      }
      return newState;
    });
  };

  const { user } = useUserInfo();
  const eventId = getStrapiId(data);

  const tabs = [
    training_schedules?.length > 0 && t("titles.schedule"),
    canPurchase && tickets?.length > 0 && t("titles.tickets"),
    groupedSpeakers?.length > 0 && t("titles.speakers"),
    location?.coordinates?.lat && t("titles.map"),
  ].filter(Boolean);

  useEffect(() => {
    if (window.location.hash === "#tickets") {
      const ticketIndex = tabs.indexOf("Tickets");
      if (ticketIndex !== -1) {
        setSelectedIndex(ticketIndex);

        // Scroll smoothly to tabs
        setTimeout(() => {
          tabsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, []);

  useEffect(() => {
    const handleTabChange = (event: any) => {
      const index =
        training_schedules?.length > 0
          ? event.detail
          : Number(event.detail) - 1;

      setSelectedIndex(index);
    };

    window.addEventListener("changeTab", handleTabChange);

    return () => {
      window.removeEventListener("changeTab", handleTabChange);
    };
  }, []);

  return (
    <div ref={tabsRef} id="ticket-section">
      <TabGroup
        id="session-section"
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <TabList className="bg-veryLightGray h-20 border-b border-gray-200 flex items-start overflow-x-auto">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={
                "text-sm lg:text-base px-6 h-full data-[selected]:border-b-3 border-b-primary outline-note focus:outline-none text-secondary font-medium border-r-1 border-r-gray-200 hover:border-b-3 transition-all duration-[50ms] whitespace-nowrap"
              }
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels className={"bg-veryLightGray rounded-b-lg"}>
          {training_schedules && training_schedules?.length > 0 && (
            <TabPanel key={"panel1"}>
              <TabGroup>
                <TabList className="bg-primary h-14 px-6 uppercase">
                  {training_schedules.map((schedule, index: number) => {
                    return (
                      <Tab
                        key={index}
                        className={
                          "px-6 h-full text-white data-[selected]:bg-white/25 outline-note focus:outline-none font-medium transition-all duration-[50ms]"
                        }
                      >
                        {t("titles.day")} {index + 1}
                      </Tab>
                    );
                  })}
                </TabList>
                <TabPanels className={"bg-veryLightGray rounded-b-lg p-6"}>
                  {training_schedules?.length > 0 &&
                    training_schedules.map((schedule, index: number) => {
                      return (
                        <TabPanel
                          key={index}
                          className={"flex flex-col gap-y-4"}
                        >
                          {schedule?.session.length > 0 &&
                            schedule?.session.map((session, index) => {
                              const {
                                title,
                                description,
                                startTime,
                                endTime,
                                speakers,
                                type,
                                url,
                                room_code,
                              } = session;

                              return (
                                <Accordion
                                  key={index}
                                  title={
                                    <span className="flex flex-col md:flex-row md:items-center items-start text-sm gap-x-5">
                                      <span className="font-normal">
                                        {formatDate(schedule?.date)}
                                      </span>
                                      {startTime && <span>{startTime}</span>}
                                      {title && (
                                        <span className="font-semibold">
                                          {title}
                                        </span>
                                      )}
                                    </span>
                                  }
                                  className="bg-white"
                                  isOpen={openIndexes.has(index)}
                                  onOpenChange={() => handleToggle(index)}
                                >
                                  <div className="border-t border-t-gray-200 pt-4">
                                    {description && (
                                      <p className="text-sm">{description}</p>
                                    )}
                                    {eventType === "online" &&
                                      canAccessContent &&
                                      isShowing && (
                                        <div>
                                          {room_code && type === "webinar" ? (
                                            <div className="btn-primary mt-4 ">
                                              <Link
                                                href={`/room?roomCode=${room_code}&eventId=${eventId}`}
                                              >
                                                {t("titles.join_session")}
                                              </Link>
                                            </div>
                                          ) : (
                                            url && (
                                              <button className="btn-primary mt-4 ">
                                                <Link
                                                  href={`/session/call/video?url=${url}`}
                                                >
                                                  {t("titles.join_session")}
                                                </Link>
                                              </button>
                                            )
                                          )}
                                        </div>
                                      )}
                                    {speakers?.length > 0 && (
                                      <div className="mt-4 flex flex-col lg:flex-row items-start lg:items-center gap-x-4">
                                        <span className="text-sm font-semibold text-secondary">
                                          Speakers:
                                        </span>
                                        <ul className="flex items-start gap-x-3 gap-y-3 flex-wrap">
                                          {speakers?.map(
                                            (item: any, index: number) => (
                                              <SpeakerCardThree
                                                key={index}
                                                item={item}
                                                lang={lang}
                                              />
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </Accordion>
                              );
                            })}
                        </TabPanel>
                      );
                    })}
                </TabPanels>
              </TabGroup>
            </TabPanel>
          )}
          {canPurchase && tickets && tickets.length > 0 && (
            <TabPanel key={"panel2"}>
              <ul className="py-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-6">
                {tickets &&
                  tickets.map((ticket, index: number) => {
                    // const { title, price, sold_out, id } = ticket;
                    return (
                      <li key={index}>
                        <BookingForm
                          ticket={ticket}
                          event={data}
                          user={user}
                          lang={lang}
                          endDate={endDate}
                        />
                      </li>
                    );
                  })}
              </ul>
            </TabPanel>
          )}
          {groupedSpeakers && groupedSpeakers.length > 0 && (
            <TabPanel key={"panel3"}>
              <div className="grid grid-cols-2 gap-6 p-8">
                {groupedSpeakers?.map((item: any, index: number) => (
                  <SpeakerCardTwo key={index} item={item} lang={lang} />
                ))}
              </div>
            </TabPanel>
          )}
          <TabPanel key={"panel4"}>
            <div
              className={cn(
                "w-full h-full lg:h-[400px] rounded-2xl overflow-hidden"
              )}
            >
              <ReactGoogleMap
                lat={Number(location?.coordinates?.lat) || 0}
                lng={Number(location?.coordinates?.lng) || 0}
              />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
