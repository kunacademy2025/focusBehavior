import { routes } from "@/config";
import { getTranslation } from "@/i18n";

export interface NavItemProps {
  id: string;
  title: string;
  url?: string;
  subLinks?: NavItemProps[];
  size?: "sm" | "md" | "lg";
  icon?: string;
}

const generateId = (() => {
  let counter = 0;
  return () => `nav-${++counter}`;
})();

const createNavItem = ({
  title,
  url,
  subLinks,
  size,
  icon,
}: Partial<Omit<NavItemProps, "id">> &
  Pick<NavItemProps, "title">): NavItemProps => ({
  id: generateId(),
  title,
  url,
  subLinks,
  size,
  icon,
});

export const getMainNav = async (lang: string): Promise<NavItemProps[]> => {
  const { t } = await getTranslation("nav", lang);

  return [
    createNavItem({ title: t("home"), url: routes.general("", lang) }),
    createNavItem({ title: t("about"), url: routes.about("", lang) }),
    createNavItem({
      title: t("events"),
      url: routes.events("", lang),
      size: "sm",
    }),
    createNavItem({ title: t("speakers"), url: routes.speakers("", lang) }),
    createNavItem({
      title: t("resources"),
      size: "sm",
      subLinks: [
        createNavItem({
          title: t("blogs"),
          url: routes.blogs("", lang),
          icon: "fa-sharp fa-regular fa-pen-nib",
        }),
        // createNavItem({
        //   title: t("subscriptions"),
        //   url: routes.subscriptions("", lang),
        //   icon: "fa-sharp fa-solid fa-tags",
        // }),
        createNavItem({
          title: t("faq"),
          url: routes.faq("", lang),
          icon: "fa-sharp fa-solid fa-seal-question",
        }),
      ],
    }),
    createNavItem({ title: t("contact"), url: routes.contact("", lang) }),
  ];
};

export const getAccountNav = async (lang: string) => {
  const { t } = await getTranslation("nav", lang);

  return [
    createNavItem({
      title: t("account_information"),
      url: routes.accountInfo("", lang),
    }),
    createNavItem({
      title: t("change_password"),
      url: routes.accountPassword("", lang),
    }),
    createNavItem({
      title: t("my_events"),
      url: routes.accountEvents("", lang),
    }),
    // createNavItem({
    //   title: t("my_wishlist"),
    //   url: routes.accountWishlist("", lang),
    // }),
  ];
};

export const getFooterNav = async (lang: string): Promise<NavItemProps[]> => {
  const { t } = await getTranslation("nav", lang);

  return [
    createNavItem({ title: t("home"), url: routes.general("", lang) }),
    createNavItem({ title: t("about"), url: routes.about("", lang) }),
    createNavItem({ title: t("events"), url: routes.events("", lang) }),
    createNavItem({ title: t("speakers"), url: routes.speakers("", lang) }),
    // createNavItem({
    //   title: t("subscriptions"),
    //   url: routes.subscriptions("", lang),
    // }),
    createNavItem({ title: t("blog_articles"), url: routes.blogs("", lang) }),
    createNavItem({ title: t("faq"), url: routes.faq() }),
    createNavItem({ title: t("get_in_touch"), url: routes.contact("", lang) }),
    createNavItem({
      title: t("terms_conditions"),
      url: routes.termsConditions("", lang),
    }),
    createNavItem({
      title: t("privacy_policy"),
      url: routes.privacyPolicy("", lang),
    }),
  ];
};
