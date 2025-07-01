"use client";
import { useApp } from "@/context";
import { fetchCountryData } from "@/services";
import { CurrenciesApis } from "@/services/api/collections/currencies";
import CurrencyModel from "@/services/api/collections/currencies/model";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { getCookie, setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "rizzui";

export const CurrencySelector = ({ lang }: { lang: string }) => {
  const { state, setCurrency } = useApp();
  const [currencies, setCurrencies] = useState<CurrencyModel[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState<CurrencyModel | null>(
    null
  );

  useEffect(() => {
    const storedCurrency =
      localStorage.getItem("fcbehavior_currency") ||
      getCookie("fcbehavior_currency");

    const initializeCurrency = async () => {
      try {
        // Fetch active currencies
        const { data } = await CurrenciesApis.getAll({
          queryParams: {
            populate: "deep",
            locale: lang,
          },
        });

        if (!data || !Array.isArray(data) || data.length === 0) {
          const defaultCurrencies: CurrencyModel[] = [
            {
              code: "USD",
              symbol: "$",
              exchange_rate: 0.27,
              is_active: true,
              is_default: false,
              id: 0,
              createdAt: "",
              updatedAt: "",
              publishedAt: "",
            },
            {
              code: "AED",
              symbol: "AED",
              exchange_rate: 1,
              is_active: true,
              is_default: true,
              id: 0,
              createdAt: "",
              updatedAt: "",
              publishedAt: "",
            },
            {
              code: "EGP",
              exchange_rate: 13.74,
              symbol: "£",
              is_active: true,
              is_default: false,
              id: 0,
              createdAt: "",
              updatedAt: "",
              publishedAt: "",
            },
            {
              code: "JOD",
              exchange_rate: 0.19,
              symbol: "د.ا",
              is_active: true,
              is_default: false,
              id: 0,
              createdAt: "",
              updatedAt: "",
              publishedAt: "",
            },
          ];
          setCurrencies(defaultCurrencies);
          const defaultCurrency = defaultCurrencies.find(
            (currency) => currency.is_default
          );
          if (defaultCurrency) {
            setDefaultCurrency(defaultCurrency);
            setCurrency(defaultCurrency);
            saveCurrency(defaultCurrency);
          }
          return;
        }

        const activeCurrencies = data.filter(
          (currency: CurrencyModel) => currency.is_active
        );
        setCurrencies(activeCurrencies);

        // Fetch detected country
        const country = await fetchCountryData();
        let selectedCurrency: CurrencyModel | null = null;

        if (country) {
          selectedCurrency =
            activeCurrencies.find((c) => c.code === country?.code) ||
            activeCurrencies.find((c) => c.is_default) ||
            activeCurrencies.find((c) => c.code === "USD") ||
            null;
        }

        if (storedCurrency) {
          try {
            const parsedCurrency: CurrencyModel = JSON.parse(storedCurrency);
            if (parsedCurrency?.code) {
              setDefaultCurrency(parsedCurrency);
              setCurrency(parsedCurrency);
              return;
            }
          } catch (error) {
            console.error("Error parsing stored currency:", error);
          }
        } else if (selectedCurrency) {
          setDefaultCurrency(selectedCurrency);
          setCurrency(selectedCurrency);
          saveCurrency(selectedCurrency);
        }
      } catch (error) {
        console.error("Error initializing currency:", error);
      }
    };

    initializeCurrency();
  }, [lang]);

  const saveCurrency = (currency: CurrencyModel) => {
    localStorage.setItem("fcbehavior_currency", JSON.stringify(currency));
    setCookie("fcbehavior_currency", JSON.stringify(currency), {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  const handleCurrencyChange = (currency: CurrencyModel) => {
    setCurrency(currency);
    saveCurrency(currency);
  };

  return (
    <div>
      <Dropdown className="text-sm inline" placement="bottom">
        <Dropdown.Trigger>
          <Button
            as="span"
            variant="outline"
            className="h-[2.5rem] bg-veryLightGray"
          >
            {state.currency?.code ?? defaultCurrency?.code ?? "USD"}
            <ChevronDownIcon className="ltr:ml-2 rtl:mr-2 w-5" />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {currencies.map((currency) => (
            <Dropdown.Item
              key={currency.code}
              as="button"
              onClick={() => handleCurrencyChange(currency)}
            >
              {currency.symbol} {currency.code}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
