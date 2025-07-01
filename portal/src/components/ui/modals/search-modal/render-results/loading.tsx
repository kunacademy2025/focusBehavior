import { useTranslation } from "@/i18n/client";

export const SearchLoading = () => {
  const { t } = useTranslation("common");

  return (
    <div className="w-full flex flex-col items-center text-white justify-center py-6">
      <span className="text-sm">{t("search.searching")}</span>
    </div>
  );
};
