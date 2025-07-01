"use server";
import React from "react";
import Link from "next/link";
import { cn, getStrapiData } from "@/utils";
import { SocialLinksApis } from "@/services/api/collections/social-links";
import { getLanguage } from "@/i18n/utils/getLanguage";

interface Props {
  className?: string;
  iconClass?: string;
  size?: string;
}

export const SocialLinks: React.FC<Props> = async ({
  className = "",
  iconClass = "",
  size = "",
}) => {
  const lang = await getLanguage();
  const { data } = await SocialLinksApis.getAll({
    queryParams: {
      populate: "deep",
      locale: lang,
    },
  });

  return (
    <ul
      className={`flex items-center list-none caret-transparent ${className}`}
    >
      {data
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((item: unknown, index: number) => {
          const { title, url, icon } = getStrapiData(item);

          return (
            <li key={index}>
              <Link
                href={url || "#"}
                target="_blank"
                rel="nofollow"
                className={cn("transition duration-300 w-9 h-9", iconClass)}
                title={title}
              >
                <i
                  className={cn(
                    `fa-brands fa-${icon} ${size} transition duration-300`,
                    iconClass
                  )}
                />
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
