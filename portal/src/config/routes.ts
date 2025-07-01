import { fallbackLng } from "@i18n/settings";

const getLang = (lang?: string) =>
  !lang || lang === fallbackLng ? "" : `/${lang}`;

const createRoute =
  (base: string) =>
  (url = "", lang?: string) =>
    `${getLang(lang)}${base}${url}`;

export const routes = {
  general: createRoute("/"),
  about: createRoute("/about/"),
  events: createRoute("/events/"),
  speakers: createRoute("/speakers/"),
  blogs: createRoute("/blogs/"),
  faq: createRoute("/faq/"),
  thank_you: createRoute("/thank-you/"),
  subscriptions: createRoute("/subscriptions/"),
  contact: createRoute("/contact/"),
  termsConditions: createRoute("/terms-conditions/"),
  privacyPolicy: createRoute("/privacy-policy/"),
  checkout: createRoute("/checkout/"),
  accountInfo: createRoute("/account/info/"),
  accountEvents: createRoute("/account/events"),
  accountWishlist: createRoute("/account/wishlist/"),
  accountPassword: createRoute("/account/change-password/"),
  signIn: createRoute("/signin/"),
  payment: createRoute("/payment/"),
};
