import { routes } from "@/config";
import { useTranslation } from "@/i18n/client";
import { useEffect, useMemo, useState } from "react";
import { ResultCard } from "./result-card";
import { SearchLoading } from "./loading";
import { NoResult } from "./no-result";
import { SearchHistory } from "./search-history";
import { MediaModel } from "@/models/media.model";

const SEARCH_TABS = [
  {
    type: "blogs",
    labelKey: "blogs",
    getPath: (slug: string) => routes.blogs(slug),
  },
  {
    type: "events",
    labelKey: "events",
    getPath: (slug: string) => routes.events(slug),
  },
] as const;

type ResultItem = { title: string; slug: string; image: MediaModel };

// Your existing props
interface RenderResultsProps {
  results: Record<string, ResultItem[]>;
  searchTerm: string;
  isLoading: boolean;
  handleClose: () => void;
  onSearchHistoryClick: (term: string) => void;
  showSearchHistory: boolean;
  hasSearched: boolean;
}

const SEARCH_THRESHOLD = 3;

export const RenderResults = ({
  results,
  searchTerm,
  isLoading,
  handleClose,
  onSearchHistoryClick,
  showSearchHistory,
  hasSearched,
}: RenderResultsProps) => {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const availableTabs = useMemo(() => {
    if (!results) return [];
    return SEARCH_TABS.filter(({ type }) => results[type]?.length > 0);
  }, [results]);

  useEffect(() => {
    if (results && !activeTab && availableTabs.length > 0) {
      setActiveTab(availableTabs[0].type);
    }
  }, [availableTabs, activeTab, results]);

  const activeTabResults: ResultItem[] = useMemo(() => {
    if (!results || !activeTab || !results[activeTab]) return [];
    return results[activeTab].map((item) => ({
      ...item,
      type: activeTab,
    }));
  }, [results, activeTab]);

  if (!hasSearched && searchTerm.length < SEARCH_THRESHOLD) return null;

  if (isLoading) {
    return <SearchLoading />;
  }

  if (hasSearched && !isLoading && !availableTabs.length) {
    return <NoResult />;
  }

  if (showSearchHistory) {
    return (
      <SearchHistory
        SEARCH_THRESHOLD={SEARCH_THRESHOLD}
        searchTerm={searchTerm}
        onSearchHistoryClick={onSearchHistoryClick}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="relative top-0 z-10">
        {/* Tab Buttons */}
        <div className="relative top-0 flex mb-4 overflow-x-auto scrollbar-hide">
          {availableTabs.map(({ type, labelKey }) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveTab(type)}
              className={`capitalize px-4 py-2 text-sm font-medium border-b-2 hover:bg-white hover:text-black transition duration-300 ${
                activeTab === type
                  ? "border-white text-white"
                  : "border-transparent text-white"
              }`}
            >
              {t(`search.tabs.${labelKey}`)} ({results[type]?.length})
            </button>
          ))}
        </div>
        {activeTabResults.length > 0 && (
          <div className="text-white text-sm sm:text-base">
            {t("search.found")} {activeTabResults.length} {t("search.results")}.
          </div>
        )}
      </div>
      <div className="mt-2 max-h-[70vh] pb-28 md:max-h-[60vh] overflow-y-auto flex-1 pr-1">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
          {activeTabResults.map((result) => (
            <ResultCard
              key={result.slug}
              result={result}
              searchTerm={searchTerm}
              handleClose={handleClose}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
