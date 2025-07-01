"use client";
import classNames from "classnames";
import { languages, cookieName } from "@/i18n/settings";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

export function LanguageSwitch({ lang }: { lang: string }) {
  if (languages.length <= 1) return <></>;

  const { push } = useRouter();

  const handleClick = (lng: string) => {
    deleteCookie(cookieName);
    setCookie(cookieName, lng, { path: "/" });
    push(`/${lng}`);
  };

  return (
    <div className="relative">
      <div
        className={classNames(
          "fixed top-1/2 lg:top-1/4 transform -translate-y-1/2 z-40 transition-all duration-500 ease-in-out",
          { "-right-[14px] rotate-90": lang === "en" },
          { "-left-[24px] -rotate-90": lang === "ar" }
        )}
      >
        {/* <Trans t={t}></Trans> */}
        {languages
          .filter((l) => lang !== l)
          .map((l, index) => (
            <button
              key={index}
              onClick={() => handleClick(l)}
              className={classNames(
                "py-1 border-t-2 border-x-2 border-primary px-3 group overflow-hidden relative inline-block rounded-t-md rotate-180 bg-primary group text-white font-semibold",
                { "pb-2 font-din": lang === "ar" },
                { "font-ge-ss": lang === "en" }
              )}
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm  bg-primary"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5  filter group-active:opacity-0 rounded opacity-50 bg-primary"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl  filter group-active:opacity-0 group-hover:blur-sm bg-primary"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-primary"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-[220px] -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative group-hover:text-primary z-10 transition-all duration-300 ">
                {lang === "ar" ? "English" : "عربي"}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
}
