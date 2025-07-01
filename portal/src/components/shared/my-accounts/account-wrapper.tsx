"use client";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { useUserInfo } from "@/hooks";
import { NavItemProps } from "@/interfaces";
import { t } from "i18next";

export const AccountWrapper = ({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: NavItemProps[];
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const pathname = usePathname();

  const { user, logout } = useUserInfo();

  return (
    <div className="bg-white min-h-screen w-full h-full">
      <div className="w-full h-full min-h-screen">
        {/* Mobile dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-50 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-darkGray">
                  {t("titles.my_account")}
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2  flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Menu */}
              <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                <ul className="space-y-2 font-medium">
                  {navigation.map((item: any, index: number) => {
                    const { url, title } = item;
                    const normalizedUrl = url.replace(/\/+$/, "");
                    const normalizedPathname = pathname.replace(/\/+$/, "");

                    const isActive =
                      normalizedPathname.startsWith(normalizedUrl);

                    return (
                      <li key={index} >
                        <Link
                          href={normalizedUrl}
                          onClick={() => setMobileFiltersOpen(false)}
                          className={cn(
                            "flex items-center p-2 text-mediumGray rounded-lg hover:bg-primary hover:text-white group",
                            "transition-all duration-200",
                            isActive ? "bg-primary text-white" : ""
                          )}
                        >
                          <span className="ms-3">{title}</span>
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <button
                      className={cn(
                        "mt-6 flex items-center p-2 w-full text-mediumGray rounded-lg hover:bg-primary hover:text-white group",
                        "transition-all duration-200"
                      )}
                      onClick={() => {
                        logout();
                      }}
                    >
                      <span className="ms-3">{t("buttons.logout")}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mt-10 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full h-full min-h-screen">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6 w-full h-full">
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-darkGray">
              {t("titles.my_account")}
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ltr:ml-4 rtl:mr-4 p-2 text-gray-400 hover:text-gray-500 sm:ltr:ml-6 sm:rtl:mr-6 lg:hidden"
              >
                <span className="sr-only">Menu</span>
                <FaBars aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section className="w-full h-full pb-8 pt-4 min-h-screen">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 w-full h-full">
              {/* Menu */}
              <div className="min-h-screen h-full px-3 py-2 overflow-y-auto bg-gray-50 border-r-1 border-gray-200 lg:block hidden">
                <ul className="space-y-2 font-medium">
                  {navigation.map((item: any, index: number) => {
                    const { url, title } = item;
                    const normalizedUrl = url.replace(/\/+$/, "");
                    const normalizedPathname = pathname.replace(/\/+$/, "");

                    const isActive =
                      normalizedPathname.startsWith(normalizedUrl);

                    return (
                      <li key={index}>
                        <Link
                          href={url}
                          className={cn(
                            "flex items-center p-2 text-mediumGray rounded-lg hover:bg-primary hover:text-white group",
                            "transition-all duration-200",
                            isActive ? "bg-primary text-white" : ""
                          )}
                        >
                          <span className="ms-3">{title}</span>
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <button
                      className={cn(
                        "mt-6 flex items-center p-2 w-full text-mediumGray rounded-lg hover:bg-primary hover:text-white group",
                        "transition-all duration-200"
                      )}
                      onClick={logout}
                    >
                      <span className="ms-3">{t("buttons.logout")}</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="min-h-screen w-full h-full lg:col-span-3">
                {children}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
