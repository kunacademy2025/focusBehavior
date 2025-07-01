"use client";

import { THEME_COLOR } from "@/config";
import NextTopLoader from "nextjs-toploader";

export default function NextProgress() {
  return (
    <NextTopLoader
      color={THEME_COLOR}
      showSpinner={false}
      crawlSpeed={100}
      speed={100}
    />
  );
}
