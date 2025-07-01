import { CountryDataModel } from "@/models/country.model";
import { getCookie, setCookie } from "cookies-next";
interface CountryCookieModel {
  ip: string;
  country: CountryDataModel;
}

const fetchCountryFromAPI = async (
  ip?: string
): Promise<{
  ip: string;
  code: string;
  name: string;
  region: string;
  city: string;
  code_iso3: string;
} | null> => {
  try {
    let url = "https://ipapi.co/json/";
    if (ip && ip !== "::1") url = `https://ipapi.co/${ip}/json/`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      return null;
    }

    const data = await response.json();

    return {
      ip: ip || "",
      code: data?.country_code || "",
      name: data?.country_name || "",
      region: data?.region || "",
      city: data?.city || "",
      code_iso3: data?.country_code_iso3 || "",
    };
  } catch (error) {
    console.error("Error fetching country data:", error);
    return null;
  }
};

export const fetchCountryData = async (): Promise<{
  code: string;
  name: string;
} | null> => {
  const cookieCountry = getCookie("detected_country");

  if (cookieCountry) {
    try {
      const parsedCountry = JSON.parse(cookieCountry as string);
      if (parsedCountry?.code && parsedCountry?.name) {
        return parsedCountry;
      }
    } catch (error) {
      console.error("Error parsing country from cookie:", error);
    }
  }

  const country = await fetchCountryFromAPI();

  if (country) {
    const cookieObject: CountryCookieModel = {
      ip: country.ip ?? "127.0.0.1",
      country: country,
    };

    setCookie("detected_country", JSON.stringify(country), {
      maxAge: 31536000,
    });
    return country;
  }

  return null;
};
