import { useState, useEffect } from "react";
import { fetchCountryData } from "@/services";

const useCountry = () => {
  const [country, setCountry] = useState<{ code: string; name: string } | null>(
    null
  );

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
