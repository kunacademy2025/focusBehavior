import { usePathname } from "next/navigation";

export const useSiteUrl = () => {
  const pathname = usePathname();
  const originUrl = window.location.origin;
  const fullUrl = `${originUrl}${pathname}`;

  return { originUrl, fullUrl };
};
