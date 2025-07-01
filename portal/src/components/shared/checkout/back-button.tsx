"use client";

import { useTranslation } from "@/i18n/client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className="bg-primary">
      <div className="inset-0 mx-auto lg:max-w-screen-2xl px-6 sm:px-8 lg:px-10 py-4">
        <button
          type="button"
          className="flex items-center text-white hover:underline"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2 rtl:-scale-x-100" />
          <p>{t("titles.back")}</p>
        </button>
      </div>
    </div>
  );
};
