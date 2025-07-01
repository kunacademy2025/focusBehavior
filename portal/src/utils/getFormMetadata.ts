"use server"
import { fetchCountryData } from "@/services/countries";
import { headers } from "next/headers";

export const getFormMetadata = async () => {
  const headersList = headers();
  const referer = (await headersList).get("referer") || "";
  const url = (await headersList).get("x-current-path") || "";
  const ip = (await headersList).get("x-forwarded-for") || "";
  const countryData = await fetchCountryData();
  const country = countryData?.name || "";

  return {
    referer,
    url,
    ip,
    country,
  };
};
