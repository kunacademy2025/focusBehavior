import { useTranslation } from "@/i18n/client";

export const NoResult = () => {
  const { t } = useTranslation("common");

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 text-white">
      <span className="font-medium">{t("search.no_result_found")}</span>
      <p className="mt-2 text-center text-sm">
        {t("search.try_different_search_term")}
      </p>
    </div>
  );
};
