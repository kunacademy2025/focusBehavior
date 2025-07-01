"use client";

import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { useEffect, useRef, useReducer, useState } from "react";
import { SearchInput } from "./search-input";
import { RenderResults } from "./render-results";
import { saveSearchTerm } from "./utils";
import FadeAnimation, { Direction } from "@/components/animation/FadeAnimation";

const SEARCH_THRESHOLD = 3;

const initialState = {
  searchTerm: "",
  results: null,
  isLoading: false,
};

interface State {
  searchTerm: string;
  results: any;
  isLoading: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const SearchModal = ({
  isOpen,
  setOpen,
  showSearchHistory = true,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  showSearchHistory?: boolean;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchTerm, results, isLoading } = state;
  const inputRef = useRef<HTMLInputElement>(null);

  const [hasSearched, setHasSearched] = useState(false); // ✅ Add this here

  const onSearch = async (query: string) => {
    if (query.length < SEARCH_THRESHOLD)
      return dispatch({ type: "SET_RESULTS", payload: [] });

    setHasSearched(true);

    dispatch({ type: "SET_LOADING" });

    if (showSearchHistory) {
      saveSearchTerm(query);
    }

    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();

      dispatch({ type: "SET_RESULTS", payload: data });
    } catch (error) {
      console.error("Error fetching dynamic content:", error);
      dispatch({ type: "SET_RESULTS", payload: [] });
    }
  };

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: "RESET" });
  };

  const onSearchHistoryClick = (term: string) => {
    dispatch({ type: "SET_TERM", payload: term });
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <Transition show={isOpen} as="div">
      <Dialog
        as="div"
        className="fixed mx-4 inset-0 z-50 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md" />

        <div className="flex items-start justify-center min-h-screen pt-16 sm:pt-24">
          <FadeAnimation direction={Direction.UP} className="w-full">
            <DialogPanel className="relative mx-auto w-full max-w-7xl transform  transition-all opacity-100 scale-100 bg-transparent text-[#0f172a] rounded-lg">
              <SearchInput
                ref={inputRef}
                searchTerm={searchTerm}
                onInputChange={(e) =>
                  dispatch({ type: "SET_TERM", payload: e.target.value })
                }
                onToggleSearch={handleClose}
                onSearch={onSearch}
              />

              <div
                id="search-results"
                role="listbox"
                aria-label="Search Results"
                aria-labelledby="search-label"
                className="z-10 right-0 top-0 w-full"
              >
                <div
                  role="option"
                  aria-selected="false"
                  className="py-2 px-6 mt-2 max-h-[70vh] md:max-h-[60vh] overflow-hidden"
                >
                  <div className="space-y-4 py-2">
                    <RenderResults
                      results={results}
                      searchTerm={searchTerm}
                      isLoading={isLoading}
                      handleClose={handleClose}
                      onSearchHistoryClick={onSearchHistoryClick}
                      showSearchHistory={showSearchHistory}
                      hasSearched={hasSearched}
                    />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </FadeAnimation>
        </div>
      </Dialog>
    </Transition>
  );
};
