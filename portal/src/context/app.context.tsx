"use client";

import { CURRENCY_KEY } from "@/config";
import { fetchCountryData } from "@/services";
import { CurrenciesApis } from "@/services/api/collections/currencies";
import CurrencyModel from "@/services/api/collections/currencies/model";
import { signOut } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

interface State {
  user?: unknown;
  loggedIn: boolean;
  currency: CurrencyModel | null;
}

export interface AppContextValue {
  state: State;
  logout: () => void;
  setCurrency: (currency: CurrencyModel) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({
  children,
  user,
}: React.PropsWithChildren<{ user?: unknown }>) {
  const currentUser = user?.user;

  const [state, setState] = useState<State>({
    user: currentUser,
    loggedIn: !!currentUser?.id,
    currency: null,
  });

  const setCurrency = (currency: CurrencyModel) => {
    setState((prev) => ({ ...prev, currency }));
    localStorage.setItem(CURRENCY_KEY, JSON.stringify(currency));
  };

  useEffect(() => {
    const loadCurrency = async () => {
      const localCurrency = localStorage.getItem(CURRENCY_KEY);
      if (localCurrency) {
        try {
          setCurrency(JSON.parse(localCurrency));
          return;
        } catch (error) {
          console.error("Error parsing currency from localStorage:", error);
        }
      }

      try {
        const { data } = await CurrenciesApis.get({
          queryParams: { populate: "deep" },
        });
        const activeCurrencies: CurrencyModel[] = Array.isArray(data) ? data : [];

        if (activeCurrencies.length === 0) return;

        const country = await fetchCountryData();
        let selectedCurrency: CurrencyModel | null = null;

        if (country) {
          selectedCurrency =
            activeCurrencies.find((cur) => cur.code === country.code) || null;
        }

        if (!selectedCurrency) {
          selectedCurrency =
            activeCurrencies.find((cur) => cur.is_default) || null;
        }

        if (!selectedCurrency) {
          selectedCurrency =
            activeCurrencies.find((cur) => cur.code === "AED") || null;
        }

        if (selectedCurrency) {
          setCurrency(selectedCurrency);
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    loadCurrency();
  }, []);

  const logout = () => {
    setState((prev) => ({ ...prev, loggedIn: false, user: undefined }));
    signOut();
  };

  const contextValue: AppContextValue = {
    state,
    logout,
    setCurrency,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export const useApp = () => {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error(`useApp must be used within a AppProvider`);
  }

  return context;
};
