import { useEffect, useState } from "react";
import useCountry from "./useCountry";

export interface MetadataProps {
  ip: string;
  pageTitle: string;
  pageLink: string;
  referrerPage: string;
}

export const useFormMetadata = () => {
  const [metadata, setMetadata] = useState<MetadataProps | null>(null);

  const { country } = useCountry();

  useEffect(() => {
    const current: MetadataProps = {
      ip: country?.ip || "",
      pageTitle: typeof document !== "undefined" ? document.title : "",
      pageLink: typeof window !== "undefined" ? window.location.href : "",
      referrerPage: typeof document !== "undefined" ? document.referrer : "",
    };

    setMetadata(current);
  }, [country?.ip]);

  return { metadata };
};
