"use client";

import { fetchCountryData } from "@/services";
import { useEffect } from "react";

export const CountryDetect = () => {
  useEffect(() => {
    const initializeCountry = async () => {
      try {
        await fetchCountryData();
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    initializeCountry();
  }, []);

  return null;
};
