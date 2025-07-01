import { routes } from "@/config";
import { useTranslation } from "@/i18n/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHashtag } from "react-icons/fa";
import { highlightText } from "./highlightText";
import { clearSearchHistory, getSearchHistory } from "./utils";

interface RenderResultsProps {
  results: Record<string, { title: string; slug: string }[]>;
  searchTerm: string;
  isLoading: boolean;
  handleClose: () => void;
  onSearchHistoryClick: (term: string) => void;
  showSearchHistory: boolean;
  hasSearched: boolean;
  lang?: string;
}

const SEARCH_TYPES = ["blogs", "events"];
const SEARCH_THRESHOLD = 3;


export function RenderResults({
  results,
  searchTerm,
  isLoading,
  handleClose,
  onSearchHistoryClick,
  showSearchHistory,
  hasSearched,
  lang
}: RenderResultsProps): JSX.Element | null {
  const { t } = useTranslation("common", lang);

  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  const handleClearSearchHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  if (isLoading) {
    return (
      <li className="w-full flex flex-col items-center justify-center py-6">
        <span className="text-sm">{t("search.searching")}</span>
      </li>
    );
  }

  if (
    (!results || searchTerm.length < SEARCH_THRESHOLD) &&
    searchHistory.length > 0
  ) {
    return (
      <li className="w-full">
        <h2 className="text-lg font-semibold text-primary">
          {t("titles.search_history")}
        </h2>
        <ul className="space-y-2 mt-4">
          {searchHistory.map((term, idx) => (
            <li
              key={idx}
              className="bg-white border border-gray-100 cursor-pointer shadow-sm rounded-xl py-3 px-4 hover:bg-gray-50 transition duration-300"
              onClick={() => onSearchHistoryClick(term)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center rounded-full min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px]">
                  <FaHashtag className="text-primary w-5 h-5" />
                </div>
                <h3 className="font-medium text-sm">{term}</h3>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={handleClearSearchHistory}
          className="mt-4 text-sm text-red-500 hover:text-red-700"
        >
          {t("titles.clear_search_history")}
        </button>
      </li>
    );
  }

  if (!results || searchTerm.length < SEARCH_THRESHOLD) return null;

  const hasResults = SEARCH_TYPES.some((type) => results[type]?.length > 0);

  if (!hasResults) {
    return (
      <li className="w-full flex flex-col items-center justify-center py-6 text-gray-500">
        <span className="font-medium">{t("search.no_result_found")}</span>
        <p className="mt-2 text-center text-sm">
          {t("search.try_different_search_term")}
        </p>
      </li>
    );
  }

  return (
    <>
      {SEARCH_TYPES.map(
        (type) =>
          results[type]?.length > 0 && (
            <li key={type} className="w-full">
              <h2 className="text-lg font-semibold text-primary">
                {type.toUpperCase()}
              </h2>
              <ul className="space-y-2 mt-4">
                {results[type].map((result, idx) => {
                  const { title, slug } = result;
                  const path =
                    type === "blogs"
                      ? routes.blogs(slug)
                      : type === "events"
                        ? routes.events(slug)
                        : "/";

                  return (
                    <li
                      key={idx}
                      className="bg-white border border-gray-100 shadow-sm rounded-xl py-3 px-4 hover:bg-gray-50 transition duration-300"
                    >
                      <Link href={path} onClick={handleClose}>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center rounded-full min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px]">
                            <FaHashtag className="text-primary w-5 h-5" />
                          </div>
                          <h3 className="font-medium text-sm">
                            {highlightText(title, searchTerm)}
                          </h3>
                          <i className="fa-solid fa-chevron-right fa-xs rtl:-scale-x-100"></i>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          )
      )}
    </>
  );
};
