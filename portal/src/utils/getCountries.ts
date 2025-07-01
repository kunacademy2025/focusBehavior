import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export const getCountriesList = () => {
  const countryNames = countries.getNames("en", { select: "official" });

  return Object.entries(countryNames)
    .filter(([code]) => code !== "IL") // Exclude Israel
    .map(([code, name]) => ({
      code,
      name,
    }));
};
