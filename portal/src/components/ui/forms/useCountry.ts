import { fetchCountryData } from "@/services/countries";
import { useState, useEffect } from "react";

const useCountry = () => {
  const [country, setCountry] = useState<{
    ip: string;
    code: string;
    name: string;
    region: string;
    city: string;
    code_iso3: string;
  } | null>(null);

  useEffect(() => {
    const initializeCountry = async () => {
      try {
        const fetchedCountry = await fetchCountryData();
        if (fetchedCountry) {
          setCountry(fetchedCountry);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    initializeCountry();
  }, []);

  return { country };
};

export default useCountry;
