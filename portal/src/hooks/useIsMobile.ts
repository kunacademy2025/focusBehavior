import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const mobileScreenWidth = 375;

  useEffect(() => {
    const updateScreenSize = () =>
      setIsLargeScreen(window.innerWidth <= mobileScreenWidth);

    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return isLargeScreen;
};
