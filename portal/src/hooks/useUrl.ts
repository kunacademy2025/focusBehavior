import { usePathname } from "next/navigation";

export const useUrl = () => {
  const pathname = usePathname();
  const url = `${window.location.origin}${pathname}`;

  return url;
};
