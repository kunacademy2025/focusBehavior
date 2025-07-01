import { useTranslation } from "@/i18n/client";
import { useEffect, useMemo, useState } from "react";
import { clearSearchHistory, getSearchHistory } from "../utils";

export const SearchHistory = ({
  SEARCH_THRESHOLD,
  searchTerm,
  onSearchHistoryClick,
}: {
  SEARCH_THRESHOLD: number;
  searchTerm: string;
  onSearchHistoryClick: (term: string) => void;
}) => {
  const { t } = useTranslation("common");

  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const shouldShowHistory = useMemo(() => {
    return (
      searchTerm.trim().length < SEARCH_THRESHOLD && searchHistory.length > 0
    );
  }, [searchTerm, SEARCH_THRESHOLD, searchHistory.length]);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  if (!shouldShowHistory) return;

  const handleClearSearchHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  return (
    <div className="flex flex-col justify-end w-full">
      <h2 className="w-full text-lg font-semibold text-white">
        {t("search.search_history")}
      </h2>
      <ul className="w-full space-y-2 mt-4">
        {searchHistory.map((term, idx) => (
          <li
            key={idx}
            className="cursor-pointer py-1.5 px-4 transition duration-300"
            onClick={() => onSearchHistoryClick(term)}
          >
            <h3 className="font-medium text-sm text-white hover:underline">
              {term}
            </h3>
          </li>
        ))}
      </ul>
      <button
        onClick={handleClearSearchHistory}
        className="w-fit ml-auto mt-4 text-sm text-white hover:underline"
      >
        {t("search.clear_search_history")}
      </button>
    </div>
  );
};
