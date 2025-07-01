import React from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "@/i18n/client";
import SearchInput from "../forms/search";
import { getTranslation } from "@/i18n";

export const SearchListing = async ({ lang }: { lang: string }) => {
  const { t } = await getTranslation("common", lang);
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 justify-between lg:justify-start pb-6">
      <div className="flex items-center gap-x-4 cursor-pointer">
        <SearchInput />
      </div>
    </div>
  );
};
