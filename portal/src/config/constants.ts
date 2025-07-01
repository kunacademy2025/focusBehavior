// Pagination
export const DEFAULT_PAGE_SIZE = Number(process.env.DEFAULT_PAGE_SIZE) || 10;
export const DEFAULT_PAGE_LIMIT = Number(process.env.DEFAULT_PAGE_LIMIT) || 5;

// Site Name
export const SHORT_SITE_NAME_EN = process.env.SHORT_SITE_NAME_EN || "";
export const SHORT_SITE_NAME_AR = process.env.SHORT_SITE_NAME_AR || "";
export const SITE_URL = process.env.SITE_URL || "";
export const SITE_NAME_EN = process.env.SITE_NAME_EN || "";
export const SITE_NAME_AR = process.env.SITE_NAME_AR || "";

// General
export const GOOGLE_MAPS_API =
  process.env.GOOGLE_MAPS_API || "AIzaSyDORn7x5NDo2zkWVoFzere7p_Zx_IssLx0";
export const RECAPTCHA_SITE_KEY =
  process.env.RECAPTCHA_SITE_KEY || "6LdI6nUqAAAAAK8iqGlNfzAJKx4xQzuGrUFzO1P9";
export const RECAPTCHA_SECRET_KEY =
  process.env.RECAPTCHA_SECRET_KEY ||
  "6LdI6nUqAAAAAFAgppB8wAdh0rM1INLHkyoyXuoR";

// Next configuration
export const NEXT_PUBLIC_STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const API_ACCESS_TOKEN =
  process.env.API_ACCESS_TOKEN ||
  "a4dfbacd999231086e82239fc074f5f5f265f738834da095b9e3679e509ee713e1b3241a90f7e1c081bf5a13466bb5a725d60fe12b0e3886548614e90c6921b7caa6c19129446e1a940c91f671e256b366df5f9539c4d26b3db19a1df3240b91d5696f4173c44f467a7bb1193111a9cd0e914cfa39e245fccb733809e2484da7";
export const PRODUCTION = process.env.NODE_ENV === "production" || false;

// style
export const THEME_COLOR = "#00B3B5";
export const FONTAWESOME_CODE = "35a2495988";

//Authentication
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "n9UtjDjCdFuiC4QPtYIR0foak6g38bwppl4FevACf/Y=";

// Others
export const CART_KEY = "customer-cart";
export const EMAIL_SUBSCRIBE = "";
export const ENABLE_CACHE = process.env.ENABLE_CACHE;
export const CURRENCY_KEY = "focusbehavior_currency"