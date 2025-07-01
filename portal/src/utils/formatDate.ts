import moment from "moment";

import { fallbackLng } from "@i18n/settings";

export const formatDate = (
  date: any,
  format = "MMMM D, YYYY",
  lang = fallbackLng
) => {
  moment.locale("en");
  const localMoment = moment(date);
  localMoment.locale(lang);
  return localMoment.format(format);
};
