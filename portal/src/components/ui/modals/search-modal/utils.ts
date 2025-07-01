export const saveSearchTerm = (searchTerm: string) => {
  if (!searchTerm) return;

  const searchHistory: string[] = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );

  if (searchHistory.includes(searchTerm)) return;

  const updatedHistory = [searchTerm, ...searchHistory].slice(0, 10);
  localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
};

export const getSearchHistory = () => {
  const searchHistory = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );
  return searchHistory.slice(0, 10);
};

export const clearSearchHistory = () => {
  localStorage.removeItem("searchHistory");
};
