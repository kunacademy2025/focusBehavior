import { fallbackLng } from "@i18n/settings";

const getLang = (lang?: string) =>
  !lang || fallbackLng === lang ? "" : `/${lang}`;

export const path = {
  general: (url?: string, lang?: string) => `${getLang(lang)}/${url}`,
  courses: (url?: string, lang?: string) => `${getLang(lang)}/courses/${url}`,
  courseCatalogs: (url?: string, lang?: string) =>
    `${getLang(lang)}/course-catalog/${url}`,
  trainingCalendar: (url?: string, lang?: string) =>
    `${getLang(lang)}/trainings/${url}`,
  services: (url?: string, lang?: string) => `${getLang(lang)}/services/${url}`,
  blog: (url?: string, lang?: string) => `${getLang(lang)}/blog/${url}`,
  downloads: (url?: string, lang?: string) =>
    `${getLang(lang)}/downloads/${url}`,
  webinars: (url?: string, lang?: string) => `${getLang(lang)}/webinars/${url}`,
  about: (url?: string, lang?: string) => `${getLang(lang)}/about/${url}`,
  contact: (url?: string, lang?: string) => `${getLang(lang)}/contact/${url}`,
  termsConditions: (url?: string, lang?: string) =>
    `${getLang(lang)}/terms-conditions/${url}`,
  privacyPolicy: (url?: string, lang?: string) =>
    `${getLang(lang)}/privacy-policy/${url}`,
  associations: (url?: string, lang?: string) =>
    `${getLang(lang)}/associations/${url}`,
  checkout: (url?: string, lang?: string) => `${getLang(lang)}/checkout/${url}`,
  accountInfo: (url?: string, lang?: string) =>
    `${getLang(lang)}/account/info/${url}`,
  accountCourses: (url?: string, lang?: string) =>
    `${getLang(lang)}/account/courses/${url}`,
  tags: (url?: string, lang?: string) => `${getLang(lang)}/tag/${url}`,
};
