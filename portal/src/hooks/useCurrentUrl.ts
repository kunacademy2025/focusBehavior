"use client";
import { usePathname } from "next/navigation";

export const useCurrentUrl = () => {
  const pathname = usePathname();
  let url = "";
  // const url = `${window.location.origin}`;
  if (typeof window !== "undefined") {
    url = `${window.location.origin}`;
  }
  return url;
};
